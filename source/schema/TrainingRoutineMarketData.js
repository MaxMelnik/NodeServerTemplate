const mongoose = require('mongoose');
const MongooseAutoIncrementID = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const Schema = mongoose.Schema;

const trainingRoutineMarketDataSchema = Schema({
    priceList: [{
        period: {
            type: String
        },
        value: {
            type: Number
        },
        currency: {
            type: String,
            default: 'USD'
        },
        monthsCount: {
            type: Number
        },
        androidSubscribeId: {
            type: String
        },
        iosSubscribeId: {
            type: String
        }
    }],
    inventory: {
        type: String
    },
    term: {
        type: String
    },
    trainingDuration: {
        type: String
    },
    muscleGroup: {
        type: String
    },
    onTrade: {
        type: Boolean,
        default: true
    },
    profit: [{
        type: String
    }],
    trainingType: [{
        type: {
            type: String
        },
        value: String
    }],
    kcal: {
        type: String
    },
    trainingsCount: {
        type: String
    }
});

MongooseAutoIncrementID.initialise();

trainingRoutineMarketDataSchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'TrainingRoutineMarketData'});
const TrainingRoutineMarketData = mongoose.model('TrainingRoutineMarketData', trainingRoutineMarketDataSchema);

module.exports = TrainingRoutineMarketData;