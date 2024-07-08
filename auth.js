
const passport =require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/person');



passport.use(new LocalStrategy(async(username,password,done)=>{
  //authentication logic
  try{
    console.log('Received credentials:',username,password);
    const user=await Person.findOne({username:username});
    if(!user){
      console.log('User not found');
      return done(null,false,{message:'Incorrect username'}) ;
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(isPasswordMatch){
      console.log('password matched');
      return done(null,user);
    }else{
      console.log('password not matched')
      return done(null,false,{message:'Incorrect password.'});
    }
  }catch(err){
    return done(err);
  }
}))

module.exports=passport;