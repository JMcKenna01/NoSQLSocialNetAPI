const { Schema, model, Types } = require('mongoose');
const { format } = require('date-fns'); // Importing the format function from date-fns

// Reaction Schema (Subdocument of Thought)
const reactionSchema = new Schema(
  {
    // Define a custom id to avoid confusion with parent thought _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280 // Reaction content is limited to 280 characters
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => format(createdAtVal, 'PPPpp') // Using date-fns to format date
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280 // Thought content is limited to 280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => format(createdAtVal, 'PPPpp') // Using date-fns to format date
    },
    username: {
      type: String,
      required: true
    },
    // Use reactionSchema to define an array of reactions
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Virtual to get the count of reactions
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
