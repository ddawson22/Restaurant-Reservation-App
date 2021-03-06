import React, {useState} from "react";
import ReservationList from "../reservations/ReservationList";
import NoReservationFound from "./NoReservationFound";
import {listReservations} from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import "./Search.css"

function SearchForReservation() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [foundReservations, setFoundReservations] = useState([]);
    const [findError, setFindError] = useState(null);
    const [showList, setShowList] = useState(false);
 
    const handleChange = (e) => {
      e.preventDefault();
      setMobileNumber(e.target.value);
    };
 
    const handleFind = (e) => {
      e.preventDefault();
      const ac = new AbortController();
      function findReservations() {
        const mobile_number = mobileNumber;
        listReservations({ mobile_number }, ac.signal)
          .then(setFoundReservations)
          .then(setShowList(true))
          .catch(setFindError);
      }
      findReservations();
      return () => ac.abort();
    };
 
    return (
      <>
        <div className="search search-title">
          <h1>Search Reservations</h1>
        </div>
        <div className="search search-error">
          <ErrorAlert error={findError} />
        </div>
 
        <div className="search input-group">
          <label htmlFor="mobile_number">
            Mobile Number:
            <input
              id="mobile_number"
              className="form-control"
              name="mobile_number"
              type="text"
              required
              onChange={handleChange}
              value={mobileNumber}
            />
          </label>
          
            <button
              className="btn btn-outline-dark"
              type="submit"
              onClick={handleFind}
            >
              Find
            </button>
          
        </div>
        {showList ? (
          <div className="search search-results">
            {foundReservations.length ? (
              <ReservationList reservations={foundReservations} />
            ) : (
              <NoReservationFound />
            )}
          </div>
        ) : null}
      </>
    );
  }

  export default SearchForReservation;

