const config = require("../config/index")
const User = require("../models/user")
const passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const { connect } = require('mongoose');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.KEY;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try{
            const user = await User.findById(jwt_payload.id)
            if (!user){
                return done(new Error("ไม่พบผู้ใช้งาน"),null)
            }
            return done(null,user)
        } catch (error){
            done(error)
        }
    })
);

module.exports.isLogin = passport.authenticate("jwt",{session:false})