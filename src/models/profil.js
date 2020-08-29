const mongoose = require('mongoose')
const User = require('./users')

const Profil = mongoose.model('Profil',{
    interesi:{
        type: String,
        required: false,
        trim: true
    },
    about:{
        type: String,
        required: false,
        trim: true
    },
    username:{
        type: String,
        required: true
    },
    kontakt:{
        type: Number,
        required: true,
        trim: true
    }
})

module.exports = Profil