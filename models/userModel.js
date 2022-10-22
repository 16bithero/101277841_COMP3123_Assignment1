//Imports mongoose for database and bcrypt for encrypting password
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

//Defines user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true,
        },
        maxLength: 100
    },
    email:{
        type: String,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String,
        maxLength: 50
    }
})

//This function works as a checker, if its not a new user, or updating a user's information,
// hash function will be ignored, as it is already hashed
userSchema.pre("save", function(next) {
  if(!this.isModified("password")) {
      return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//This method compares input password to the password that has been hashed and returns a boolean response in callback
userSchema.methods.comparePassword = function(rawPassword, callback) {
  return callback(null, bcrypt.compareSync(rawPassword, this.password));
};

//Exports schema to the database with name "user"
module.exports = mongoose.model("user", userSchema)