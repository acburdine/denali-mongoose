import mongoose from 'mongoose';
import omit from 'lodash/omit';

export default {
  name: 'mongoose-connect',
  before: 'define-orm-models',
  async initialize(application) {
    let config = application.config.database;

    return new Promise((resolve, reject) => {
      mongoose.connect(config.url, omit(config, [ 'url' ]));
      let db = mongoose.connection;
      db.on('error', reject);
      db.once('open', resolve);
    }).catch((error) => {
      application.logger.error('Error connecting to the mongodb database.');
      application.logger.error(error.stack);
    });
  }
};
