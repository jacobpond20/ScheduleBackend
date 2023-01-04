const express = require('express');
const role = require('../models/role');

const router = express.Router();


router.get('/', async (req,res) => {
    let roles = await role.find();
    res.status(200).json(roles);
});

router.post('/', async (req, res) => {
    let foundRole = await role.findOne({role: req.body.role});
    if(foundRole == null){
        const newRole = new role({
            role: req.body.role,
            admin: req.body.admin
        });
        newRole.save();
        res.status(201).json(newRole);
    }else{
        res.status(400).send("Role already exists");
    }
});

module.exports = router;