import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

var BCRYPT_SALT_ROUNDS = 12;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required :true,
    validate: {
      validator : isEmailExists, msg: 'Email already exists'
    }
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  username: {
    type: String,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default : 'ADMIN',
  },
  dob :{
    type :String
  },
  age :{
    type:String

  },

  active: {
    type: Boolean,
    default: true
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

userSchema.pre('save', function (next) {
  const user = this;
  const now = new Date();
  user.updated_at = now;
  user.created_at = now;
  user.age =getAge(user.dob);
  bcrypt.genSalt(BCRYPT_SALT_ROUNDS,(err,salt)=>{
    if(err){
      return next(err);
    }
    bcrypt.hash(user.password,salt,(hashError,hash)=>{
      if(hashError){
        return next(hashError);
      }
      user.password = hash;
      next();
    })
  })

});

function isEmailExists(email, res) {
  User.count({ email: email })
    .then((count) => {
      if (count > 0) {
        console.log('Username exists.');
        // res.json({
        //   'success' : false,
        //   'message' : 'Email Already Exists'
        // })
      } else {
        console.log('Username does not exist.');
      }
    });
}

function getAge(dateString) {

  var dates = dateString.split("-");
  var d = new Date();

  var userday = dates[0];
  var usermonth = dates[1];
  var useryear = dates[2];

  var curday = d.getDate();
  var curmonth = d.getMonth()+1;
  var curyear = d.getFullYear();

  var age = curyear - useryear;

  if((curmonth < usermonth) || ( (curmonth == usermonth) && curday < userday   )){
      age--;
  }

  return age;
}

const User = mongoose.model('User', userSchema);

export default User;
