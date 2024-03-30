const express = require('express');
const { Signup, signIn } = require('../controller/userController');
// const { data } = require('../data/dummydata');


const router = express.Router();

router.post('/signup',Signup)
router.post('/signin',signIn)
// router.get('/dummydata',(req,res)=>{
//     res.send(data)
// })

module.exports=router;