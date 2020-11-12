const mongoose = require('mongoose');
const MongooseAutoIncrementID = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;
const Schema = mongoose.Schema;

const schema = Schema({
    objectsArrayField: [{
        numberInnerField: {
            type: Number
        },
        stringInnerField: {
            type: String
        }
    }],
    stringField: {
        type: String
    },
    numberField: {
        type: Number
    },
    booleanField: {
        type: Boolean,
        default: true
    },
    stringArrayField: [{
        type: String
    }],
    numberArrayField: [{
        type: Number
    }]
});

MongooseAutoIncrementID.initialise();

schema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'TestSchema'});
const TestSchema = mongoose.model('TestSchema', schema);

module.exports = TestSchema;