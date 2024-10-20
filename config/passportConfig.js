const passport = require("passport") ;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');


passport.use(new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
        const user = await User.findOne({ email }) // Changed from {username} to {email}
        if (!user) return done(null, false, { message: "User not found" })
               
                const isMatch = await bcrypt.compare(password , user.password)
            if (isMatch) return done(null, user)
            else return done(null, false, { message: "Incorrect password" })

        } catch (error) {
            return done(error)
        }
    }
  ));

passport.serializeUser((user, done) =>{
    console.log("We are inside serialUSer");
    done(null, user._id)
})

passport.deserializeUser(async(_id, done)=>{
    try {
        console.log("We are inside deserilizeUser");
        const user = await User.findById(_id);
        done(null, user)
    } catch (error) {
        done(error)
    }
})
