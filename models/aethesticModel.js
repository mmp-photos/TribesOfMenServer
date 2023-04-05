const mongoose = require('mongoose');

const  subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attitude: {
        type: Array,
        required: false
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdBy: {
        type: ObjectID,
        required: true,
    },
    lastUpdatedBy: {
        type: ObjectID,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    },
    tops: {
        type: Array,
        required: false
    },
    bottoms: {
        type: Array,
        required: false
    },
    headwear: {
        type: Array,
        required: false
    },
    footwear: {
        type: Array,
        required: false
    },
    accessories: {
        type: Array,
        required: false
    },
    vibe: {
        type: String,
        required: false
    },
    culturalInfluences: {
        type: Array,
        required: false
    },
    sources: {
        type: Array,
        required: false
    },
    capsuleCloset: {
        type: Array,
        required: false
    },
    examples: {
        type: Array,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Aesthetic', aestheticSchema);