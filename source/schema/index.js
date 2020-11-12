const mongoose = require('mongoose');

const User = require('./User');
const TrainingRoutineMarketData = require('./TrainingRoutineMarketData');
const TestSchema = require('./TestSchema');
mongoose.Promise = global.Promise;

const connectDb = () => {
    return mongoose.connect('mongodb://streamportaltest:qawsedrf131@127.0.0.1/streamportaltest', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
};

const db = {
    connectDb,
    User,
    TrainingRoutineMarketData,
    TestSchema
};

module.exports = db;
