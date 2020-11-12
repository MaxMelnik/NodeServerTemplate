class SchemaService {
    static async getPaths(paths) {//TODO add isRequired field
        const keys = Object.keys(paths);
        const pathsObj = {};
        for (const key of keys) {
            if (!key.startsWith('_')) {
                paths[key].instance !== 'Array' ? (
                    pathsObj[key] = paths[key].instance ?
                        paths[key].instance : await this.getPaths(paths.objectsArrayField.schema.paths)
                ) : (
                    pathsObj[key] = paths[key].$embeddedSchemaType.instance ?
                        [paths[key].$embeddedSchemaType.instance] : [await this.getPaths(paths[key].schema.paths)]
                );
            }
        }
        return pathsObj;
    }
}

module.exports = SchemaService;