const knex = require("../db/connection.js");

 function list() {
   return knex("tables").select("*").orderBy("table_name");
 }

 function read(table_id) {
   return knex("tables")
   .select("*")
   .where({ table_id })
   .first();
 }

 async function update(updatedTable) {
   return await knex("tables")
     .select("*")
     .where({ table_id: updatedTable.table_id })
     .update(updatedTable, "*")
     .then((updatedRecord) => updatedRecord[0]);
 }

 function create(newTable) {
   return knex("tables")
     .insert(newTable)
     .returning("*")
     .then((createRecord) => createRecord[0]);
 }

 module.exports = {
   list,
   read,
   update,
   create,
 };