const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const { validationResult } = require('express-validator');

const Staff = require('../models/staff')
const config = require('../config/index')

exports.index = async(req, res, next) => {
    const staff = await Staff.find()
    const staffWithPhotoDomain = staff.map((staff,index) => {
        return{
            name: staff.name,
            photo: config.DOMAIN + staff.photo,
        }
    })

    res.status(200).json({
        data: staffWithPhotoDomain
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
        const error = new Error("ไม่พบผู้ใช้งาน")
        error.statusCode = 404
        throw error;
            //throw new Error('ไมพบผู้ใช้งาน')
        } else{
            res.status(200).json({
                data: staff,
            })
        }
    } catch (error){
        next(error)
        // res.status(400).json({
        //     error:{
        //         message:'เกิดข้อผิดพลาด: ' + error.message
        //     }
        // })
    }
}

exports.insert = async(req, res, next) => {

    const {name,photo} = req.body
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
        error.statusCode = 422;
        error.validation = errors.array()
        throw error;
      }

    let staff = new Staff({
        name: name,
        photo: await saveImageToDisk(photo)
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
            const error = new Error("ไม่สามารถลบได้ ไม่พบข้อมูลผู้ใช้งาน")
            error.statusCode = 404
            throw error;
            //throw new Error('ไม่สามารถลบได้ ไม่พบข้อมูลผู้ใช้งาน')
        } else{
            res.status(200).json({
                Message: 'ลบข้อมูลเรียบร้อยแล้ว'
            })
        }
        

        if(!staff){
            const error = new Error("ไม่พบผู้ใช้งาน")
            error.statusCode = 404
            throw error;
            //throw new Error('ไมพบผู้ใช้งาน')
        } else{
            res.status(200).json({
                data: staff,
            })
        }
    } catch (error){
        next(error)
        // res.status(400).json({
        //     error:{
        //         message:'เกิดข้อผิดพลาด: ' + error.message
        //     }
        //})
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

async function saveImageToDisk(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./') ;
    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    //เขียนไฟล์ไปไว้ที่ path
    await writeFileAsync(uploadPath+filename, image.data, 'base64');
    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
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


