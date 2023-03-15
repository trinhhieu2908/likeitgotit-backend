var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
async function addUser(req,res) {
    const body = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(body.password, salt);
    res.json(hashPassword)
}

async function login(req,res) {
    const token = jwt.sign({"user_email": "chuongdavid@gmail.com"}, "chuongserect")
    console.log("token", token)
    const {email, password} = req.body;
    if(email == "admin@gmail.com" && bcrypt.compareSync(password, "$2a$10$5h5bL5iGJGQau3eI7lt3XuE0bwBKN1PM3W9w1XXAc0o8g9ZS1ltaS")){
        return res.json({
            errorMsg: null, 
            data: "Đăng nhập thành công"
        })
    }
    else{
        return res.json({
            errorMsg: "Đăng nhập thất bại", 
            data: null
        })
    }
}
module.exports = {
    addUser,
    login
}