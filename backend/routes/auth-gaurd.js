const router = require('express').Router(); //using router from express
const user = require('../models/user');
const User = require('../models/user') //importing users from model folder
const bcrypt = require('bcrypt');   // used for password encryption in database;
const jwt = require('jsonwebtoken');
const check_auth = require('../middleware/check-auth');
const nodemailer = require('nodemailer');
const { findOne } = require('../models/user');
const localStorage = require('local-storage').LocalStorage;

JWT_KEY = 'resetpasswordkey123'
ClIENT_URL = 'http://localhost:4200'

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Hash Error!!!!" })
        } else {
            const user = new User({
                Name: req.body.Name,
                Email: req.body.Email,
                Password: hash,
            })//requesting data from node server

            user.save()
                .then((_) => {
                    res.json({ success: true, message: 'User Registered!' });
                })
                .catch((err) => {
                    if (err.code) {
                        return res.json({ success: false, message: 'User Already Exist!' })
                    }
                    res.json({ success: false, message: "Aunthentication Failed" });
                })
        }
    });

});

router.post('/login', (req, res) => {
    User.find({ email: req.body.Email }).exec()
        .then((result) => {
            if (result.length < 1) {
                return res.json({ success: false, message: "User not found" });
            }
            const user = result[0];
            bcrypt.compare(req.body.Password, user.Password, (err, ret) => {
                if (ret) {
                    const payload = {
                        userID: user._id
                    }
                    const token = jwt.sign(payload, 'webBatch');
                    return res.json({ success: true, token: token, message: 'login success.'})
                } else {
                    return res.json({ success: false, message: 'Password Incorrect.' })
                }
            });
        })
        .catch((err => {
            res.json({ success: false, message: 'Authentication Failed' })
        }))
});

router.get('/profile', check_auth,(req, res) => {
    const userId = req.userData.userID;
    User.findById(userId).exec().then((result) => {
        res.json({ success: true, data: result });
    })
        .catch((err => {
            res.json({ success: false, message: 'Server Error' })
        }))
});


// router.post('/forget-password', check_auth, (req, res, next) => {
//     const Email = req.body.Email;
//     User.findOne(Email).then((result) => {
//         res.json({ message: 'found' })
//         const secret = JWT_KEY + user.Password;
//         const payload = {
//             userID: user._id,
//             email: user.email
//         }
//         const token = jwt.sign(payload, secret, { expiresIn: '5m' })
//         const link = `http://localhost:4200/reset-password/${user._id}/${token}`
//         res.json({ link: link, message: 'link sent' })
//     }).catch((err => {
//         res.json({ success: false, message: 'User Not Found' })
//     }))
// });

router.get('/forget-password', check_auth, (req, res, next) => {

});


router.post('/update',check_auth, async (req, res) => {
    const userid = req.User.user;
    const nameAfter = req.body.value;
    const users =await User.findOne({_id:userid})
    if(!users){
        res.json({success:false,message:'no',data:userid})
        return
    }
    await User.updateOne({_id:UserEmail},{$set:{Name:nameAfter}})
    res.json({success:true,message:'Done'})
});

// router.put('/forget-password',check_auth,(req,res)=>{
//     const email = req.body.Email;
//     User.findOne(email).then((user)=>{
//         const transporter = nodemailer.createTransport({
//             service:'gmail',
//             auth : {
//                 user : 'nodemailerhere@gmail.com',
//                 pass : 'nodemailer'
//             } ,
//             tls:{
//                 rejectUnauthorized:false
//             }     
//         });
//         const token = jwt.sign({_id:user._id},process.JWT_KEY,{expiresIn:'20m'});
//         const data ={
//             from : 'noreplt@mean.com',
//             to : email,
//             subject : 'Password Reset Link',
//             html : `
//                     <h2>Click on the below link to reset your password</h2>
//                     <p>${ClIENT_URL}/reset-password/${token}</p>`
//         };

//         return user.updateOne({resetLink:token},(err,success)=>{
//             if(err){
//                 return res.json({success:false,message:'Reset password link error'});
//             }else{
//                 transporter.sendMail(data,function(err,success){
//                     if(err){
//                         res.json({success:false,message:'Error'});
//                     }else{
//                         res.json({success:true,message:'Email Sent Succesfully'})
//                     }
//                 })
//             }
//         });
//     })
//     .catch((err=>{
//         res.json({success:false,message:'Email not registered',email:email})
//     }))
// })

module.exports = router;