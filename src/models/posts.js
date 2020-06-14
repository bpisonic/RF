const mongoose = require('mongoose')
const validator = require('validator')

const Post = mongoose.model('Post',{
    postedAt:{
        type: String,
        trim: true,
        required: true

    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cijena:{
        type: Number,
        required: true,
        trim: true
    },
    zupanija:{
        type: String,
        required: true,
        trim: true
    },
    grad:{
        type: String,
        required: true,
        trim: true

    },
    naselje:{
        type: String,
        trim: true
    },
    ljubimci:{
        type: Boolean,
        default: false
    },
    dostupnoGod:{
        type: Boolean,
        default: false
    },
    odvojenaSoba:{
        type: Boolean,
        default: false
    },
    terasa:{
        type: Boolean,
        default: false
    },
    ukljuceneRezije:{
        type: Boolean,
        default: false
    },
    opis:{
        type: String,
        required: false
    }
})

module.exports = Post