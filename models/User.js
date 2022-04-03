const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// const FriendSchema = new Schema({
//    friendId:{
//     type: Schema.Types.ObjectId,
//     default: () => new Types.ObjectId()
//    },
//    userName: {
//     type: String,
//     required: true,
//   },
// },
// {
//   toJSON: {
//     virtuals: true,
//     getters: true
//   },
//   id: false
// })

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
        ref: 'User',
      }
    ],
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