const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../controllers/thoughtController');

// Route to get all thoughts and create a new thought
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

// Routes to get, update, and delete a single thought by id
router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Routes for reactions to a thought
router.route('/:thoughtId/reactions')
  .post(addReaction); // Route to add a reaction to a thought

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // Route to remove a reaction from a thought

module.exports = router;
