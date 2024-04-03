const { User } = require('../models');

const userController = {
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user by ID
  getUserById(req, res) {
    User.findById(req.params.id)
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json(err));
  },

  // Update a user by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id }, 
      req.body, 
      { new: true, runValidators: true }
    )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
  },

  // Delete a user
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json({ message: 'User successfully deleted!' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.id, 
      { $addToSet: { friends: req.params.friendId } }, 
      { new: true, runValidators: true }
    )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
  },

  // Remove a friend
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.id, 
      { $pull: { friends: req.params.friendId } }, 
      { new: true }
    )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
  }
};

module.exports = userController;
