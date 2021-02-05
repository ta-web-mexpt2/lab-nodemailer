const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = require("../models/User")
const bcrypt = require('bcrypt')

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) =>{
    try{
        const user = await User.findById(id)
        cb(null, user)
    } catch (err){
        console.log(err)
    }
});

passport.use(
    new LocalStrategy({
        usernameField: "username",
        passwordField: "password"
    },
    async (username, password, callback) => {
        try {
            const user = await User.findOne({username})
            if(!user) {
                return callback(null, false, {message: "Incorrect Username"})
            }
            if(!bcrypt.compareSync(password, user.password)) {
                return callback(null, false, {message: "Incorrect Password"})
            }
            callback(null, user)
        } catch (error) {
            console.log(error)
        }
    }
    )
)


module.exports = passport;