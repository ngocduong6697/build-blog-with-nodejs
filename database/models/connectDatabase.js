
const mongoose = require('mongoose')

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
const connectDatabase = mongoose.connect(process.env.DB_URL, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
})

module.exports = connectDatabase