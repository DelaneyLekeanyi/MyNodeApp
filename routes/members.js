const express = require('express');
const router = express.Router();

const Member = require('../models/members'); // Assuming you have a Member model defined

//creating routes for getting all members
router.get('/', async (req, res) => {
   // res.send('Get all members');
  try {
    const members = await Member.find(); // Assuming you have a Member model defined
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//creating routes for getting 1 member
router.get('/:id', getMember, (req, res) => {
    res.json(res.member);
  /*try {
    const member = await Member.findById(req.params.id); // Assuming you have a Member model defined
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }*/
});
//creating routes creating a new member
router.post('/', async (req, res) => {
  try {
    const existing = await Member.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const member = new Member({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      date: req.body.date
    });
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//creating routes for updating a member
router.patch('/:id', getMember, async (req, res) => {
  if (req.body.name != null) {
    res.member.name = req.body.name;
  }
  if (req.body.email != null) {
    res.member.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.member.phone = req.body.phone;
  }
  try {
    const updatedMember = await res.member.save();
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//creating routes for deleting a member
router.delete('/:id', getMember, async (req, res) => {
  try {
    await res.member.deleteOne();
    res.json({ message: 'Deleted member' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

 async function getMember(req, res, next) {
  let member;
  try {
    member = await Member.findById(req.params.id); // Do NOT use .lean()
    if (member == null) {
      return res.status(404).json({ message: 'Cannot find member' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.member = member;
  next();
}


module.exports = router;