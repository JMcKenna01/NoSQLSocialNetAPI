const { Thought, User } = require('../models');

const thoughtController = {
  // Create a new thought
  createThought: async (req, res) => {
    try {
      // Extract thought data from request body
      const { thoughtText, username, userId } = req.body;

      // Create the thought
      const thought = await Thought.create({ thoughtText, username });

      // Push the created thought's ID to the associated user's thoughts array
      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });

      res.status(201).json(thought);
    } catch (error) {
      console.error('Error creating thought:', error);
      res.status(500).json({ error: 'Failed to create thought' });
    }
  },

  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      res.json(thoughts);
    } catch (error) {
      console.error('Error getting thoughts:', error);
      res.status(500).json({ error: 'Failed to get thoughts' });
    }
  },

  // Get a single thought by ID
  getThoughtById: async (req, res) => {
    try {
      const { id } = req.params;
      const thought = await Thought.findById(id);
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error('Error getting thought by ID:', error);
      res.status(500).json({ error: 'Failed to get thought' });
    }
  },

  // Update a thought by ID
  updateThought: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedThought = await Thought.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error('Error updating thought:', error);
      res.status(500).json({ error: 'Failed to update thought' });
    }
  },

  // Delete a thought by ID
  deleteThought: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedThought = await Thought.findByIdAndDelete(id);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      // Remove the deleted thought's ID from associated users' thoughts array
      await User.updateMany({}, { $pull: { thoughts: id } });
      res.json(deletedThought);
    } catch (error) {
      console.error('Error deleting thought:', error);
      res.status(500).json({ error: 'Failed to delete thought' });
    }
  },

  // Add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error('Error adding reaction to thought:', error);
      res.status(500).json({ error: 'Failed to add reaction to thought' });
    }
  },

  // Remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error('Error removing reaction from thought:', error);
      res.status(500).json({ error: 'Failed to remove reaction from thought' });
    }
  }
};

module.exports = thoughtController;
