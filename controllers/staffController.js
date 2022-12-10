const Staff = require('../models/staff')

exports.index = async(req, res, next) => {
    const staff = await Staff.find();
    res.status(200).json({
        data: staff,
    })
}

exports.insert = async(req, res, next) => {

    const {name,salary} = req.body

    let staff = new Staff({
        name: name,
        salary: salary,
    });
    await staff.save()

    res.status(200).json({
        Message: 'เพิ่มข้อมูลเรียบร้อยแล้ว'
    })
}

// exports.index = (req, res, next) => {
//   res.status(200).json({
//     data: [
//       {
//         id: "1",
//         name: "Inter vision",
//         address: {
//           province: "Bangkok",
//           postcode: "10260",
//         },
//       },
//       {
//         id: "2",
//         name: "CYW",
//         address: {
//           province: "nakornpatom",
//           postcode: "73110",
//         },
//       },
//     ],
//   });
// };


