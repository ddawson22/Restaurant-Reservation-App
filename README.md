### Restaurant Reservation System

This application was built for use by restaurant personnel to handle reservations when a customer calls, seat reservations when they arrive at the restaurant, and free up occupied tables when guests leave.

Project Prompt: 

  You have been hired as a full stack developer at Periodic Tables, a startup that is creating a reservation system for fine dining restaurants. The    Product Manager has already created 8 user stories for Periodic Tables, and another developer has already written the tests for each of the user stories.

## Links 
[Live Demo](https://my-app-restaurant-front.herokuapp.com/dashboard)
[API](https://my-restaurant-app-back.herokuapp.com/tables)


## Screenshots

# Dashboard: 
The Dashboard is located at /dashboard and has the following features:

Lists all reservations for one date only. The date is defaulted to today and the reservations are sorted by time.
Each reservation will display its status. The default status is booked. A "Seat" button will display for reservations that are booked.
Each reservation displays an "Edit" and "Cancel" button. Only reservations with a status of booked can be edited.
Displays next, previous, and today buttons that allow the user to see reservations on other dates.
Displays a list of all tables, sorted by name. Each table will display "Free" or "Occupied" depending on whether or not a reservation is seated at the table. Each "Occupied" table will have a "Finish" button.
Displays any error messages returned from the API.

![Dashboard](https://Users/dakotadawson/Desktop/ProjectImages/Dashboard.png)

