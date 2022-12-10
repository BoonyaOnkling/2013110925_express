const Staff = require('../models/staff')

exports.index = async(req, res, next) => {
    const staff = await Staff.find().sort({_id: -1})
    res.status(200).json({
        data: staff,
    })
}

/*การรับid (paramiter) */
/*router.get('/:id',staffController.show);*/

exports.show = async(req, res, next) => {
    
    try{
        const { id } = req.params
        const staff = await Staff.findOne({
            _id : id
        })
        if(!staff){
            throw new Error('ไมพบผู้ใช้งาน')
        } else{
            res.status(200).json({
                data: staff,
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

exports.destory = async(req, res, next) => {
    
    try{
        const { id } = req.params
        const staff = await Staff.deleteOne({
            _id : id
        })

        if(staff.deletedCount === 0){
            throw new Error('ไม่สามารถลบได้ ไม่พบข้อมูลผู้ใช้งาน')
        } else{
            res.status(200).json({
                Message: 'ลบข้อมูลเรียบร้อยแล้ว'
            })
        }
        

        if(!staff){
            throw new Error('ไมพบผู้ใช้งาน')
        } else{
            res.status(200).json({
                data: staff,
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
        const {name,salary} = req.body

        // const staff = await Staff.findById(id)
        // staff.name = name
        // staff.salary = salary
        // await staff.save()

        const staff = await Staff.updateOne({_id : id},{
            name : name,
            salary : salary
        })

        res.status(200).json({
            Message: 'แก้ไขข้อมูลเรียบร้อยแล้ว'
        })
    } catch(error){
        
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


