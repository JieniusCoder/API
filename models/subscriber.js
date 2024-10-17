const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        match: [/^\d{10,15}$/, 'Please enter a valid phone number with country code'],
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street is required'],
            trim: true,
            maxlength: 255
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
            maxlength: 100
        },
        state: {
            type: String,
            trim: true,
            maxlength: 100
        },
        zipCode: {
            type: String,
            required: true,
            trim: true,
            match: [/^\d{5}(?:[-\s]\d{4})?$/, 'Please enter a valid zip code'],
        },
        country: {
            type: String,
            required: true,
            default: 'USA'
        }
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'pending', 'cancelled'],
        default: 'pending'
    },
    preferences: {
        emailSubscription: { type: Boolean, default: true },
        smsSubscription: { type: Boolean, default: false },
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    notes: {
        type: String,
        trim: true,
        maxlength: 500
    }
});

// improve query common field performance
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ phone: 1 });
subscriberSchema.index({ subscriptionStatus: 1 });

// Middleware for pre-save
subscriberSchema.pre('save', function (next) {
    this.updatedDate = Date.now();
    next();
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
