const Knex = require("knex");
const connection = require("../knexfile");
const { Model } = require("objection");

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class School extends Model {
  static get tableName() {
    return "schools";
  }
}

module.exports = { School };
