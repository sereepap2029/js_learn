const { Person : per } = require("./model/person.js");
const Knex = require("knex");

//person.doCreate();
var runMain = async () => {
  var jennifer = await per.query().where("firstName", 'like', "%e%");
  jennifer.forEach((res) => {
    console.log(res.fullName());
  });
  per.knex().destroy();
};
runMain();
console.log("done");
