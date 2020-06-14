const mongoose = require('mongoose')
const Post = require('./posts')

const Gradovi = mongoose.model('Gradovi',{
    postedAt:{
        type: String,
        required: true,
        trim: true

    }
})

module.exports = Gradovi