const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  trips: [
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
  ]
});

// eslint-disable-next-line no-undef
module.exports = Group = mongoose.model('group', GroupSchema)
