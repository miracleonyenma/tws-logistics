const { Shipment } = require('../models/Shipment')

module.exports.shipments_get = (req, res) => {
  console.log(req)
}

// const handleShipmentError = (error) => {
//   console.log('8', error);

//   const errors = {
//       // first_name: '',
//       customer_id: '',
//       pickup_loc: '',
//       destination: '',
//       description: ''
//   }

//   // duplicate errors
//   if (error.code === 11000) {
//       errors.email = "Sorry, that email is already registered"
//       return errors
//   }

//   // login errors
//   if (error.message === "Incorrect password") errors.password = "Sorry, that passsword was incorrect"
//   if (error.message === "Incorrect email") errors.email = "Sorry, that email is not registered"

//   //validation errors
//   if (error._message == "user validation failed") {
//       Object.values(error.errors).forEach(error => {
//           errors[error.path] = error.message
//       })
//   }

//   return errors
// }

module.exports.shipment_get = async (req, res) => {
  console.log(req.params.id)
  try {
    const { id } = req.params;
    const shipment = await Shipment.findById(id)

    console.log("shipment", shipment);
    res.status(200).json({
      shipment
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      error: err
    })
  }
}

module.exports.shipment_add = async (req, res) => {
  try {
    console.log(req.body);
    const {
      customer_id,
      pickup_loc,
      destination,
      description
    } = req.body

    const shipment = await Shipment.create({
      customer_id,
      pickup_loc,
      destination,
      description
    })

    res.status(201).json({
      shipment
    })

  } catch (err) {
    console.log(err)
    res.status(400).json({
      errors: {
        message: err
      }
    })

  }
}