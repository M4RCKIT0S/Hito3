const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/',async(req,res)=>{
    User.find({}, (error, users) => {
        if (error) return res.status(500).send({ error });
    
        return res.status(200).send(users);
      });
});

router.post('/',async(req, res)=>{
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        phone : req.body.phone,
    });
    try{
    const savedUser = await user.savedUser();
    res.json(savedUser);
    }catch(err){
        res.json({message: err});
    }
});
router.post('/',(req, res)=> {
    // Create a new user
    const user = new User(req.body);
  
    // Save the new user
    user.save((error, newUser) => {
      if (error) return res.status(400).send({ message: 'Error saving user', error });
  
      return res.status(200).send({ message: 'Saved user', newUser });
    });
});
//specific user

router.get('/:userId',async(req,res)=>{
    try{
    const user=await User.findById(req.params.userId);
    res.json(user);
    }catch(err){
        res.json({message: err});
    }
});
//Delete
router.delete(':/userId',async(req,resp)=>{
    const { userId } = req.params;

    User.findByIdAndRemove(userId, (err, user) => {
      if (err) return res.status(500).send({ err });
      if (!user) return res.status(404).send({ message: 'User not found' });
  
      return res.status(200).send({ message: 'User deleted', user });
    });
});
//Replace user info
router.put(':/userId',async(req,resp)=>{
    ({_id: req.params.userId},{$set: {
    name:req.body.name,
    email:req.body.email,
    password: req.body.password,
    surname: req.body.surname,
    userId: req.params.userId,}
   });
    if (!email || !firstname || !surname || !password) {
        return res.status(400).send({ message: 'Missing params' });
    }
    
      // Create the new user
      const userReplacement = req.body;
    
      User.findById(userId, (err, user) => {
        if (err) return res.status(404).send({ message: 'No user to replace found', err });
    
        // Replaces the user
        user.replaceOne(userReplacement, (error) => {
          if (error) return res.status(500).send({ error });
    
          return res.status(200).send({ message: 'User replaced' });
        });
      });
});
// Update the user information
 router.patch(':/userId',(req, res) =>{
    const { userId } = req.params;
  
    // Update the user
    User.findByIdAndUpdate(userId, req.body, { new: true }, (error, user) => {
      if (error) return res.status(500).send({ error });
  
      return res.status(200).send({ message: 'User updated', user });
    });
  });
//login
 router.post(':/userId',async(req, resp)=> {
    const { email } = req.params;
    const { password } = req.body;
  
    // Find the user and check if the password is correct
    User.findOne({ email }, (err, user) => {
      if (err) return res.status(500).send({ err });
      if (!user) return res.status(404).send({ message: 'No user found' });
  
      if (password !== user.password) return res.status(401).send({ message: 'Incorrect password' });
  
      return res.status(200).send({ message: 'Correct password' });
    });
  });
 module.exports = router; 