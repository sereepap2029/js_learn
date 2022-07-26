const { Model } = require("objection");
const Knex = require("knex");
const dbConfig = require("./config.js");
// Initialize knex.
const knex = Knex(dbConfig);

// Give the knex instance to objection.
Model.knex(knex);

// Person model.
class Person extends Model {
  static get tableName() {
    return "persons";
  }
  static get idColumn() {
    return "id";
  }

  fullName() {
    return this.firstName + " " + this.lastname;
  }
}

async function createSchema() {
  if (await knex.schema.hasTable("persons")) {
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await knex.schema.createTable("persons", (table) => {
    table.increments("id").primary();
    table.string("firstName");
    table.string("lastname");
  });
}

async function main() {
  // Create some people.
  var sylvester = await Person.query().insertGraph({
    firstName: "Sylvester",
    lastname: "Sage",
  });

  console.log("created:", sylvester);
  var sylvester = await Person.query().insertGraph({
    firstName: "Sage",
    lastname: "Sylvester",
  });

  console.log("created:", sylvester);
  var sylvester = await Person.query().insertGraph({
    firstName: "Sophia",
    lastname: "Sylvester",
  });

  console.log("created:", sylvester);

  // Fetch all people named Sylvester and sort them by id.
  // Load `children` relation eagerly.
  const sylvesters = await Person.query()
    .where("firstName", "Sylvester")
    .orderBy("id");

  console.log("sylvesters:", sylvesters.fullName);
}

function doCreate() {
  createSchema()
    .then(() => main())
    .then(() => knex.destroy())
    .catch((err) => {
      console.error(err);
      return knex.destroy();
    });
}
module.exports = { doCreate, Person };
