const { Schema, model } = require('mongoose');

// Create the User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true // Removes whitespace from both ends of a string
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Must match an email address!'] // Ensure email follows a basic pattern
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought' // Reference the Thought model
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User' // Reference the User model itself for friends
      }
    ]
  },
  {
    toJSON: {
      virtuals: true, // Ensure virtuals are included when converting document to JSON
      getters: true  // Use getters (if any)
    },
    id: false // Prevent id virtual from being created
  }
);

// Create a virtual property `friendCount` that gets the number of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
