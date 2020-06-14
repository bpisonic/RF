const {MongoClient, ObjectID} = require('mongodb') //brzi nacin - dekonstruktor

const connectionURL = 'mongodb+srv://admin:rfinder@cluster0-mbr1a.mongodb.net/test?retryWrites=true&w=majority'

const databaseName= 'r-finder'


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {//poziva se kad je povezano
    if (error) {
        return console.log('Nemoguce povezati sa bazom')
    }

    const db = client.db(databaseName)

})