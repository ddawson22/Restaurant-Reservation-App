const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")

const hasRequiredProperties = 
hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
)

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "created_at",
  "updated_at",
]


function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}


function isValidReservation(req, res, next){
  const {data = {} } = req.body;
  console.log(Date.now(), "Date Now");
  console.log(Date.parse(data["reservation_date"]), "Today");
  let temp_reservation_time = data["reservation_time"] && data["reservation_time"].replace(":","");
  if(new Date(data["reservation_date"]).getDay()+1 === 2){
    next({
      status: 400,
      message: `We are closed on Tuesdays, please choose a different date for your reservation.`
    })
  } else if(Date.parse(data["reservation_date"]) < Date.now()){
    console.log('Please check for errors.');
    next({
      status:400,
      message: `Reservations must be reserved for future dates.`
    })
  } else if(temp_reservation_time < 1030){
    next({ status: 400, message: "Our restaurant is not open at this time. Please choose a time when we are open!"});
  }
  else if(temp_reservation_time > 2130){
    next({ status: 400, message: "Reservation cannot be less than one hour before business closing!"});
  }
  next();
}

function isValidDate(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/)) {
    return next({
      status: 400,
      message: `reservation_date is invalid.`,
    });
  }
  next();
}

function isValidTime(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_time"].match(/[0-9]{2}:[0-9]{2}/)) {
    return next({
      status: 400,
      message: `reservation_time is invalid`,
    });
  }
  next();
}

function isValidPeople(req, res, next) {
  const { data = {} } = req.body;
  if (typeof data["people"] !== "number") {
    return next({
      status: 400,
      message: `people is invalid`,
    });
  }
  next();
}

async function list(req, res) {
  const data = await service.list(req.query.date)
  res.json({ data });
}

async function create(req, res){
  const data = await service.create(req.body.data);
  res.status(201).json({ data })
}

module.exports = {
  create: 
  [hasOnlyValidProperties, 
    hasRequiredProperties, 
    isValidDate, 
    isValidTime, 
    isValidPeople, 
    isValidReservation,
    asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};