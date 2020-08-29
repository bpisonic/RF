const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Post = require('./posts')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Unesite ispravan email')
            }
        },
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Lozinka ne moze sadrzavati "password"')
            }
        },
        validate(value){
            if(value.toLowerCase().includes('lozinka')){
                throw new Error('Lozinka ne moze sadrzavati "lozinka"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
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
    },
    location:{
        type: String,
        required: true,
        trim: true
    }

})

userSchema.virtual('posts',{
    ref: 'Post',
    localField: '_id',
    foreignField: 'postedBy'
})

userSchema.methods.toJSON = function (){
    const user = this
    const object = user.toObject()

    delete object.password
    delete object.tokens

    return object
}

userSchema.methods.getToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},'something')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

userSchema.statics.findByEmailAndPw = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Prijava nije moguća')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Prijava nije moguća')
    }
    return user
}

userSchema.pre('save', async function (next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

userSchema.pre('remove', async function (next){
    const user = this

    await Post.deleteMany({ postedBy: user._id})

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User