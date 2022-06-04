const knex = require('../db/connection.js');

function list(reservation_date){
    return knex("reservations")
    .select("*")
    .where({reservation_date})
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}

function create(newReservation){
    return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createNewRecord) => createNewRecord[0]);
}

function read(reservation_id){
    return knex("reservations")
    .select("*")
    .where({reservation_id})
    .first()
}

function updateStatus(reservation) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: reservation.reservation_id })
      .update({ status: reservation.status }, "*")
      .then((updated) => updated[0]);
  }

  function searchForMobile(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }
module.exports = {
    list,
    read,
    create,
    updateStatus,
    searchForMobile,
}