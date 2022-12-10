const Company = require('../models/company')

exports.index = async(req, res, next) => {
    const company = await Company.findOne()
    res.status(200).json({
        data: company
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


