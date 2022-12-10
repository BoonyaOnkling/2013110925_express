const Company = require('../models/company')

exports.index = async(req, res, next) => {
    const company = await Company.find()
    res.status(200).json({
        data: company,
    })
}

exports.insert = async(req, res, next) => {

    const {name,address:{province}} = req.body

    let company = new Company({
        name: name,
        address:{
            province :province,
        }
    });
    await company.save()

    res.status(200).json({
        Message: 'เพิ่มข้อมูลเรียบร้อยแล้ว'
    })
}

exports.destory = async(req, res, next) => {
    
    try{
        const { id } = req.params
        const company = await Company.deleteOne({
            _id : id
        })

        if(company.deletedCount === 0){
            throw new Error('ไม่สามารถลบได้ ไม่พบข้อมูลบริษัท')
        } else{
            res.status(200).json({
                Message: 'ลบข้อมูลเรียบร้อยแล้ว'
            })
        }
        

        if(!company){
            throw new Error('ไมพบผู้ใช้งาน')
        } else{
            res.status(200).json({
                data: company,
            })
        }
    } catch (error){
        res.status(400).json({
            error:{
                message:'เกิดข้อผิดพลาด: ' + error.message
            }
        })
    }
}

exports.update = async(req, res, next) => {

    try{
        const { id } = req.params
        const {name,address:{province}} = req.body

        const company = await Company.updateOne({_id : id},{
            name: name,
            address:{
                province :province,
            }
        })

        res.status(200).json({
            Message: 'แก้ไขข้อมูลเรียบร้อยแล้ว'
        })

    } catch(error){
        res.status(400).json({
            error:{
                message:'เกิดข้อผิดพลาด: ' + error.message
            }
        })
    }
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


