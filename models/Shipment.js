const mongoose = require('mongoose');
const { User } = require('./User')


const ShipmentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Shipment must have a user'],
  },

  pickup_loc: {
    type: Object,
    required: [true, 'Please enter the location of the shipment'],
  },
  current_loc: {
    type: Object,
    required: [true, 'The shipment should have a current location']
  },
  destination_loc: {
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
  const { customer } = this
  const user = await User.findById(customer)
  const savedShipment = await user.shipments.push(this)
  const savedUser = await user.save()

  console.log("Saved Collections:", savedUser, savedShipment)
  next()
})

// ShipmentSchema.post('save', async function (next) {
//   console.error()
//   next()
// })

// fire fucntion before doc deleted
ShipmentSchema.post('deleteOne', async function(doc, next) {
  console.log('post delete', doc)


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