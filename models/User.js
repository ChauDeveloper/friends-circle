const { Schema, model, Thought } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const UserSchema = new Schema({
    userName: {
      type: String,
      unique: true, 
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
      // validate: {
      //   isEmail: true
      // }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
        
      }
      
    ],
    friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );

  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  


const User = model('User', UserSchema);


module.exports = User;