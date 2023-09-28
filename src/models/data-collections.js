'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    try {
      if (id) {
        return this.model.findOne({ where: { id } });
      } else {
        return this.model.findAll({});
      }
    } catch (err) {
      console.log('SOMETHING IS WRONG WHEN READING ' + this.model);
      console.error(err);
    }
  }

  async create(record) {
    try {
      return this.model.create(record);
    } catch (err) {
      console.log('SOMETHING WENT WRONG WHEN CREATING', this.model);
      console.error(err);
    }
  }

  async update(id, data) {
    try {
      let record = await this.model.findOne({ where: { id } });
      await record.update(data);
      return record;
    } catch (err) {
      console.log('SOMETHING WENT WRONG WHEN UPDATING', this.model);
      console.error(err);
    }
  }

  async delete(id) {
    try {
      let results = await this.model.destroy({ where: { id } });
      console.log('RESULTS FROM COLLECTION', results);
      return 'deleted';
    } catch (err) {
      console.log('SOMETHING WENT WRONG WHEN DELETING:', this.model);
      console.error(err);
    }
  }
}

module.exports = DataCollection;
