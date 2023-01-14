const User = require("../models/user");
exports.index = (req, res, next) => {
    res.status(200).json({
      Fullname:'Boonyanutch Onkling'
    })
  }

exports.bio = (req, res, next) => {
    res.status(200).json({
      fullname: "Boonyanutch Onkling",
      nickname: "Pareploy",
      hobby: "Play Game",
      gitusername: "BoonyaOnkling"
    })
  }

  exports.register = async(req,res,next) =>{
    try{
      const {name, email, password} = req.body
      const existemail = await User.findOne({email:email})
      if (existemail){
        const error = new Error("อีเมลนี้มผู้ใช้งานในระบบแล้ว")
        error.statusCode = 400
        throw error;
      }
      let user = new User();
      user.name = name
      user.email = email
      user.password = await user.encryptPassword(password)

      await user.save()

      res.status(201).json({
        message: "ลงทะเบียนเรียบร้อยแล้ว"
      })
    } catch (error) {
      next(error)
    }
  }

  /* if(!errors.isEmpty()){
        const error = new Error("กรอกข้อมูลไม่ถูกต้อง")
        error.statusCode = 422
        error.validation = errors.array()
        throw error
      }*/