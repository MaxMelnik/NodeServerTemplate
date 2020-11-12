const {TestSchema} = require('../schema');
const SchemaService = require('../services/SchemaService');

class AdminController {
    static async getTestSchemaSchemaPaths(req, res, next) {
        console.log('getTestSchemaSchemaPaths started');
        const resObject = await SchemaService.getPaths(TestSchema.schema.paths);
        console.log('getTestSchemaSchemaPaths resObject:', resObject);
        res.status(200).json(resObject);
    }

    static async createTestSchema(req, res, next) {
        const testSchema = await new TestSchema(req.body).save;
        res.status(200).json(testSchema);
    }
}

module.exports = AdminController;