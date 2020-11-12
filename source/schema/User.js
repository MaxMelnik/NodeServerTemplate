const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config.json');
const MongooseAutoIncrementID = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    gender: {
        type: String,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    level: {
        type: Number,
    },
    id_referralPromo: {
        type: Number,
        ref: 'Promo'
    },
    promos: [{
        type: Number,
        ref: 'Promo'
    }],
    personalPromos: [{
        type: Number,
        ref: 'Promo'
    }],
    trainingRoutinesForUser: [{
        type: Number,
        ref: 'TrainingRoutineForUser'
    }],
    weightList: [{
        weight: Number,
        date: Date
    }],
    targetWeight: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id}, config.secretKey)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

// Search for a user by email
userSchema.statics.findByEmail = async (email) => {
    return User.findOne({email: email});
}

// Search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error({error: 'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Invalid login credentials'})
    }

    return user
}


MongooseAutoIncrementID.initialise();

userSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'User'});
const User = mongoose.model('User', userSchema);

module.exports = User;