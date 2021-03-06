const cryto = require('crypto');

class HashService {
    hashOtp(data){
        return cryto.createHmac('sha256',process.env.HASH_SECRET).update(data).digest('hex');
    }
}

module.exports = new HashService();