const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:rfinder@cluster0-mbr1a.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})





 
 