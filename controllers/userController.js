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