const otpService = require("../services/otp.service");
const hashService = require("../services/hash.service");
const userService = require("../services/user.service");
const tokenService = require("../services/token.service");

class AuthController {
  async sendOtp(req, res) {
    //Get Phone number
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
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
      await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
      });
    } catch (err) {
      //console.log(err);
      res.status(500).json({ message: "message sending failed" });
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
    
    res.cookie('refreshtoken',refreshToken,{ 
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    });

    res.json({ accessToken })
  }
}

//singleton pattern , same object is returned everytime from a export
module.exports = new AuthController();
