const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Group = require('../../models/Group');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     POST api/groups
// @desc      Create a group
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newGroup = new Group({
        name: req.body.name,
        owner: req.user.id,
        image: req.body.image
      });

      const group = await newGroup.save();

      res.json(group);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/groups
// @desc      Get all groups
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find().sort({ date: -1 });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/groups/:id
// @desc      Get group by id
// @access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    res.json(group);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/groups/:id
// @desc      Delete a group
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    // Check user
    if (group.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await group.remove();

    res.json({ msg: 'Group removed' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Group not found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/groups/trips/:id
// @desc      Add a trip to a group
// @access    Private
router.post(
  '/trips/:id',
  [
    auth,
    [
      check('destination', 'Destination is required')
        .not()
        .isEmpty(),
      check('lodging', 'Lodging is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty(),
      check('to', 'To date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const group = await Group.findById(req.params.id);

      const newTrip = {
        destination: req.body.destination,
        lodging: req.body.lodging,
        from: req.body.from,
        to: req.body.to,
        description: req.body.description
      }

      group.trips.unshift(newTrip);

      await group.save();
      res.json(group.trips);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/groups/trips/:id/:trip_id
// @desc      Delete a trip from a group
// @access    Private
router.delete('/trips/:id/:trip_id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    // Pull out trip
    const trip = group.trips.find(trip => trip.id === req.params.trip_id);

    // Make sure comment exists
    if (!trip) {
      return res.status(404).json({ msg: 'Trip does not exist'})
    }

    // Get remove index
    const removeIndex = group.trips
      .map(trip => trip.id)
      .indexOf(req.params.trip_id);

    group.trips.splice(removeIndex, 1)

    await group.save();

    res.json(group.trips)
  } catch (err) {
    
  }
});

module.exports = router;
