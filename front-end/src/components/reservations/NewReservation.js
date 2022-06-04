import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {createReservation} from "../../utils/api";
import ReservationForm from "./ReservationForm";
import Error from "../Error";

function NewReservation(){
    const [errors, setErrors] = useState({});
    const history = useHistory();
  


    const handleClose = (event) => {
      const errorMessage = event.target.parentNode.parentNode.childNodes[0].innerHTML;
      delete errors[`${errorMessage}`];
      setErrors({...errors});
    }

    const errorMap = Object.keys(errors).map((error, index) => (
      <Error key={index} error={error} handleClose={handleClose} />
    ));


    const initialFormData = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: 1,
    };
  
    const [formData, setFormData] = useState({ ...initialFormData });
  
    const handleChange = (event) => {
      event.preventDefault();
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleCancel = (event) => {
      event.preventDefault();
      history.go(-1);
    };
  
    const submitHandler = async (event) => {
      event.preventDefault();
      const ac = new AbortController();
      formData.people = parseInt(formData.people);
      try {
        await createReservation(formData, ac.signal);
         setErrors({});
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        if (!errors[error.message]) {
          setErrors({ ...errors, [error.message]: 1 });
        }
      }
      return () => ac.abort();
    };
  
    return (
      <>
        <div className="createErrors">{errorMap ? errorMap : null}</div>
        <h1 className="my-3">Create Reservation</h1>
        <ReservationForm
          handleChange={handleChange}
          handleCancel={handleCancel}
          submitHandler={submitHandler}
          formData={formData}
        />
      </>
    );
  }

export default NewReservation