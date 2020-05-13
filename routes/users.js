const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const ObjectID = require('mongoose').Types.ObjectId;
const User = require('../models/users');

//get all users
router.get('/',async (req,res)=> {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({message: err})
    }
});

//post a user
router.post('/',(req,res) => {
    const { name,email } = req.body;

    //simple validation
    if( !name || !email ) {
        return res.status(400).json({msg:'please enter all fields'});
    }


    //check for unique users
    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});

            const newUser = new User({
                name,
                email
            });

            
            newUser.save()
                .then(user => {
                    res.json('user created');
                })
                .catch(err => {
                    res.json({message: err})
                })
            })
})

//get specific user
router.get('/:userId',async (req,res) => {
    try{
        console.log(req.params.userId);
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message: err});
    }
});

//Delete User
router.delete('/:userId',async (req,res) => {
    try{
        const removeUser = await User.remove({_id : req.params.userId})
        res.json(removeUser);
    }catch(err){
        res.json({message: err});
    }
});

//Update User
router.put('/:userId',async (req,res) => {
    User.findById(req.params.userId)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.save()
            .then(user => {
                res.send({message: 'user updated',user: user})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});

module.exports = router;