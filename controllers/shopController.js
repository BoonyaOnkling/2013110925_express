
const Shop = require('../models/shop')
const Menu = require('../models/menu');
const { config } = require('dotenv');


exports.index = async(req, res, next) => {
    const shops = await Shop.find();

    const shopWithPhotoDomain = shops.map((shop,index) => {
        return{
            id: shop._id,
            name: shop.name,
            photo: config.DOMAIN + shop.photo,
            location: shop.location
        }
    })

    res.status(200).json({
        data: shopWithPhotoDomain
    })
};
exports.show = async(req, res, next) => {

        const { id } = req.params
        const shop = await Shop.findOne({
            _id : id
        }).populate('menus');
        res.status(200).json({
            data: shop,
        })
            
}



exports.menu = async(req, res, next) => {
    //const menu = await Menu.find().select('+name -price');
    //const menu = await Menu.find().where('price').gt(200);
    const menu = await Menu.find().populate('Menu');
    res.status(200).json({
        data: menu,
    })
}