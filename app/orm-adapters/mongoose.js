import { ORMAdapter } from 'denali';
import mongoose, { Schema } from 'mongoose';
import snakeCase from 'lodash/snakeCase';
import assign from 'lodash/assign';

const schemaTypes = {
  string: String,
  number: Number,
  date: Date,
  boolean: Boolean,
  buffer: Buffer,
  objectId: Schema.Types.ObjectId,
  mixed: Schema.Types.Mixed
};

export default class MongooseAdapter extends ORMAdapter {

  async find(type, query, options) {

  }

  async createRecord(type, data, options) {

  }

  buildRecord(type, data, options) {

  }

  idFor(model) {

  }

  getAttribute(model, property) {

  }

  setAttribute(model, property, value) {

  }

  deleteAttribute(model, property) {

  }

  async getRelated(model, relationship) {

  }

  async setRelated(model, relationship, relatedRecords) {

  }

  async addRelated(model, relationship, relatedRecord) {

  }

  async removeRelated(model, relationship, relatedRecord) {

  }

  async saveRecord(model) {

  }

  async deleteRecord(model) {

  }

  async defineModels(models) {
    // Don't define abstract base classes
    models = models.filter((Model) => !(Model.hasOwnProperty('abstract') && Model.abstract));

    this.models = {};

    models.forEach((Model) => {
      let attributes = {};
      Model.eachAttribute((key, attribute) => {
        let type = attribute.type;

        if (!schemaTypes[type]) {
          throw new TypeError(`${ type } is not a valid MongoDb type. Valid types are: ${ Object.keys(schemaTypes).join(', ') }`);
        }

        key = this.keyToColumn(key);

        if (attribute.options.array) {
          // Array is a option rather than a type itself
          type = [ type ];
          delete attribute.options.array;
        }

        attributes[key] = assign({ type }, attribute.options);
      });

      this.models[Model.type] = mongoose.model(Model.type, new Schema(attributes));
    });
  }

  keyToColumn(key) {
    return snakeCase(key);
  }
}
