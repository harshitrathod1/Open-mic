const otpService = require("../services/otp.service");
const hashService = require("../services/hash.service");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service");
const UserDto = require("../dtos/user.dto");

class AuthController {
  async sendOtp(req, res) {
    //Get Phone number
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
      return;
    }

    //Generate a four digit random OTP
    const otp = await otpService.generateOtp();

    //Hash OTP
    const ttl = 1000 * 60 * 2; // 2 mins
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;

    const hash = hashService.hashOtp(data);

    //Send OTP
    try {
      // await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp
      });
    } catch (err) {
      //console.log(err);
      res.status(500).json({ message: "message sending failed" });
      return;
    }
  }

  async verifyOtp(req, res) {
    //Logic
    const { otp, hash, phone } = req.body;

    //1. If any field is missing
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    //2. Extract hash code and check for expiry
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP expired" });
      return;
    }

    //3. Verify the hash recieved with stored hash
    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }

    //4. If valid create or update user Details and tokens
    let user;
    
    try{
      user = await userService.findUser({ phone });
      if(!user){
        user = await userService.createUser({ phone });
      }
    }catch(error){
      console.log(error);
      res.status(500).json({ message: 'Db error'});
      return;
    }

    // Token 
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false
    });
    
    await tokenService.storeRefreshTokenInDb(refreshToken, user._id);

    res.cookie('refreshToken',refreshToken,{ 
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    });

    res.cookie('accessToken',accessToken,{
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    })

    const userDto = new UserDto(user);

    res.json({ user: userDto, auth : true });
  }

  async refresh(req,res){
    //get refresh token from cookie
    const { refreshToken : refreshTokenFromCookie } = req.cookies;

    //check if token is valid
    let userData;
    try{
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    }catch(error){
      console.log("Verify step 1",error);
      return res.status(401).json({ message : "Couldn't verify the refresh token, Check first"});
    }

    //check if token in DB
    try{
      console.log(userData);
      const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
      if(!token){
        return res.status(401).json({ message : "Couldn't find token in DB"});
      }
    }catch(error){
      console.log("Verify step 2 of DB",error);
      return res.status(500).json({ message : "Couldn't verify token in DB"});
    }

    //Check if user present respect to refresh token
    const user = await userService.findUser({_id : userData._id});
    if(!user){
      console.log("NO USER FOUND IN DB FOR TOKEN");
      return res.status(400).json({message : "Could not find any user for the token"});
    }

    //Generate new pairs of token
    const {refreshToken,accessToken} = tokenService.generateTokens({ _id : userData._id});

    //Update refreshToken
    try{
      await tokenService.updateRefreshToken(userData._id,refreshToken);
    }catch(error){
      console.log("ERROR UPDATING TOKENS IN DB",error);
    }
    //send new response while putting new token in cookie
    res.cookie('refreshToken',refreshToken,{ 
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    });

    res.cookie('accessToken',accessToken,{
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    })

    const userDto = new UserDto(user);

    res.json({ user: userDto, auth : true });
  }

  async logout(req,res){
    const { refreshToken } = req.cookies;
    // delete refresh token from db
    try{
      await tokenService.removeTokenFromDB(refreshToken);
    }catch(error){
      console.log("Error while removing token from DB, logout process ",error);
      return res.status(500).json({ message : "Internal Error" });
    }
    // delete token from cookie
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    
    res.json({ user : null, auth : false })
  }
}

//singleton pattern , same object is returned everytime from a export
module.exports = new AuthController();
