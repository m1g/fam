const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route     GET api/profile/me
// @desc      Get current users profile
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/profile
// @desc      Create or update user profile
// @access    Private
router.post(
  '/', [ auth, [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('destinations', 'Destinations are required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      bio,
      location,
      status,
      destinations,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(bio) profileFields.bio = bio;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(destinations) {
      profileFields.destinations = destinations.split(',').map(destination => destination.trim());
    }
    
    // Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, 
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/profile
// @desc      Get all profiles
// @access    Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route     GET api/profile/user/:user_id
// @desc      Get profile by user ID
// @access    Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ 
      user: req.params.user_id 
    }).populate('user', ['name', 'avatar']);

    if(!profile)
      return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.status(500).send('Server Error');
  }
})

// @route     DELETE api/profile
// @desc      Delete profile, user & groups
// @access    Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove users groups
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route     PUT api/profile/travels
// @desc      Add profile travels
// @access    Private
router.put('/travels', [auth, [
  check('destination', 'Destination is required').not().isEmpty(),
  check('lodging', 'Lodging is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty(),
  check('to', 'To date is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const {
    destination,
    lodging,
    from,
    to,
    description
  } = req.body

  const newTrav = {
    destination,
    lodging,
    from,
    to,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id })

    profile.travels.unshift(newTrav);

    await profile.save();
    res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

// @route     DELETE api/profile/travels/:dest_id
// @desc      Delete travel destination from profile
// @access    Private
router.delete('/travels/:dest_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    
    const removeIndex = profile.travels
      .map(item => item.id)
      .indexOf(req.params.dest_id);

    profile.travels.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


module.exports = router;
