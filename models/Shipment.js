const mongoose = require('mongoose');
const { User } = require('./User')


const ShipmentSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: [true, 'Shipment must have a user'],
    lowercase: true
  },

  pickup_loc: {
    type: Object,
    required: [true, 'Please enter the location of the shipment'],
  },
  destination: {
    type: Object,
    required: [true, 'Please enter destination of your shipment']
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  }

})

// // fire a function after doc saved to db
// userSchema.post('save', (doc, next) => {
//     console.log('new user saved to db', doc);

//     next()
// })


// fire function before doc saved to schema
ShipmentSchema.pre('save', async function (next) {
  console.log(this)
  const { customer_id } = this
  const user = await User.findById(customer_id)
  const savedShipment = await user.shipments.push(this)
  const savedUser = await user.save()

  console.log("Saved Collections:", savedUser, savedShipment)
  next()
})

// userSchema.statics.login = async function (email, password) {
//     const user = await this.findOne({ email })

//     if (user) {
//         const auth = await bcrypt.compare(password, user.password)
//         if (auth) return user

//         throw Error('Incorrect password')
//     }

//     throw Error('Incorrect email')
// }

const Shipment = mongoose.model('Shipment', ShipmentSchema)

module.exports = { ShipmentSchema, Shipment };