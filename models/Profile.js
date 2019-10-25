const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  destinations: {
    type: [String],
    required: true
  },
  travels: [
    {
      destination: {
        type: String,
        required: true
      },
      lodging: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// eslint-disable-next-line no-undef
module.exports = Profile = mongoose.model('profile', ProfileSchema);