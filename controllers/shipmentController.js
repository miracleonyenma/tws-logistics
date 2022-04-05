const { Shipment } = require('../models/Shipment')
const { User } = require('../models/User')

module.exports.shipments_get = async (req, res) => {
  try {
    const shipments = await Shipment.find()
    res.status(200).json({
      shipments
    })
  } catch (err) {
    res.status(400).json({
      error: err
    })
  }
}

// const handleShipmentError = (error) => {
//   console.log('8', error);

//   const errors = {
//       // first_name: '',
//       customer: '',
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
    console.log(67, req.body);
    const {
      customer,
      pickup_loc,
      destination_loc,
      description
    } = req.body

    const shipment = await Shipment.create({
      customer,
      pickup_loc,
      destination_loc,
      current_loc: pickup_loc,
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

module.exports.shipment_update = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(67, req.body);
    const {
      customer,
      pickup_loc,
      destination_loc,
      current_loc,
      description
    } = req.body

    const shipment = await Shipment.findByIdAndUpdate(id, {
      customer,
      pickup_loc,
      destination_loc,
      current_loc,
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

module.exports.shipment_delete = async (req, res) => {
  try {
    const { id } = req.params
    const doc = await Shipment.findByIdAndDelete(id)
    const user = await User.findById(doc.customer)

    // const doc = await Shipment.deleteOne({ _id: id }, () => {
    //   User
    // })


    console.log('doc', doc)

    res.status(200).json({
      doc
    })
  } catch (err) {
    res.status(400).json({ error: err })
  }
}