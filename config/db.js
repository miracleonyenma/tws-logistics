const mongoose = require('mongoose')

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DB_PASS
);

mongoose.connect(DB).then(conn => {
    console.log('MongoDB connected!')
}).catch(err => {
    console.log('error =>', err)
})