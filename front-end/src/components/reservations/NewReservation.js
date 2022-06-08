import React, {  useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api"
import Error from "../Error"
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleErrorClose = (event) => {
    const errorMessage = event.target.parentNode.parentNode.childNodes[0].innerHTML;
    delete errors[`${errorMessage}`];
    setErrors({ ...errors });
  };

  const errorMap = Object.keys(errors).map((error) => (
    <Error key={`error-${error}`} error={error} handleErrorClose={handleErrorClose} />
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

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    history.go(-1);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const ac = new AbortController();
    formData.people = parseInt(formData.people);
    formData.reservation_date = formData.reservation_date.split("T")[0];
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
      <ReservationForm
        mode={"Create"}
        handleChange={handleChange}
        handleCancel={handleCancel}
        submitHandler={submitHandler}
        formData={formData}
      />
    </>
  );
}

export default NewReservation