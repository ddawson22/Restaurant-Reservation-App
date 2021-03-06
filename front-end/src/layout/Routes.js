import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard"
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../components/reservations/NewReservation";
import Seating from "../components/reservations/Seating";
import NewTable from "../components/tables/NewTable";
import SearchForReservation from "../components/search/Search";
import EditReservation from "../components/reservations/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
 function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <Seating />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <SearchForReservation />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
