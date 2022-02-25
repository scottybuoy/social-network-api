const { countReset } = require('console');
const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('__v')
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a thought
    // createThought(req, res) {
    //     Thought.create(req.body)
    //         .then((thought) => res.json(thought))
    //         .catch((err) => {
    //             console.log(err);
    //             return res.status(500).json(err);
    //         });
    // },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => 
                !user
                ? res.status(404).json({ message: 'Thought created, but no user with that ID' })
                : res.json('Though created!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};