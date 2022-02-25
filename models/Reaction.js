const { Schema, model } = require('mongoose');

// Schema for Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => { new Types.ObjectId() }
        },
        reactionBody: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,

        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;