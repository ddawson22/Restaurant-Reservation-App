import React from "react" 
import Reservations from "./Reservation";

function ReservationList({ reservations }) {
    const reservationsMap = reservations.map((reservation) => (
      <Reservations key={reservation.reservation_id} reservation={reservation} />
    ));
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
            <th scope="col"></th>
           <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{reservationsMap}</tbody>
      </table>
    );
  }

  export default ReservationList;