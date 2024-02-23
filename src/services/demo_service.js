const {User,Restaurant} = require('../models/demo_model');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const registerServices=async(req,res)=>{
    try {
        const { username, email, password } = req.body;
        let userDetails = await User.findOne({ email });
        if (userDetails) {
          return{status:400,message:'User already exsists',data:[]}
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        userDetails = new User({
            username,
            email,
            password: hashedPassword
          });
          await userDetails.save();
        return{status: 200,message:'success',data:userDetails}
    } catch (error) {
        console.log("error",error);
        throw new Error 
    }
}



const loginServices = async (req, res) => {
  const { email, password } = req.body;
  try {
      console.log("email", email);
      const user = await User.findOne({ email });
      console.log("user", user);
      if (!user) {
          console.log("ooooooo");
         return{status:401,message:'Invalid credentials',data:[]}
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.log("vhdfvhgdvv");
          return{status:401,message:'Invalid credentials',data:[]};
      }
      

      // Return the token response
      return{status:200,message:'success',data:[]}

  } catch (error) {
      console.log("error", error);
      return{status:500,message:'Internal server error',data:[]};
  }
}
const restaurantsnearbyServices=async(req,res)=>{
  try {
      const { latitude,logitude,radius } = req.query;
      let restaurantsDetails = await Restaurant.find({location:{
        $near:{
          $geometry:{
            type:'Point',
            coordinates:[parseFloat(logitude),parseFloat(latitude)]

          },
          $maxDistance:parseFloat(radius)
        }
      }});
      return{status: 200,message:'success',data:restaurantsDetails}
      
  } catch (error) {
      console.log("error",error);
      throw new Error 
  }
}


const restaurantsrangeServices=async(req,res)=>{
  try {
    const { latitude, longitude, minDistance, maxDistance } = req.query;
      let restaurantsrangeDetails = await Restaurant.find({location:{
       location:{
        $near:{
          $geometry:{
            type:'Point',
            coordinates:[parseFloat(longitude),parseFloat(latitude)]
          },
          $minDistance:parseInt(minDistance),
          $maxDistance:parseInt(maxDistance)
        }
       }
      }});

      return{status: 200,message:'success',data:restaurantsrangeDetails}
      
  } catch (error) {
      console.log("error",error);
      throw new Error 
  }
}


const addrestaurantsServices=async(req,res)=>{
  try {
    const { name, description, latitude, longitude, ratings } = req.body;
    const restaurant = new Restaurant({ 
      name, 
      description, 
      location: { type: 'Point', coordinates: [parseFloat(longitude), parseFloat(latitude)] }, 
      ratings 
  });
  await restaurant.save();

  return{status: 200,message:'success',data:restaurant}
      
  } catch (error) {
      console.log("error",error);
      throw new Error 
  }
}


const getrestaurantsServices=async(req,res)=>{
  try {
    
    const getrestaurant =await Restaurant.find()
   if(getrestaurant.length>0){
     const response=getrestaurant.map((x)=>({
      "id":x._id,
      "restaurantName":x.name,
      "description":x.description,
      "ratings":x.ratings,
      "location":x.location
     }))

    return{status: 200,message:'success',data:response}
   }
 return{status:300,message:'Data not found',data:[]}
      
  } catch (error) {
      console.log("error",error);
      throw new Error 
  }
}

const getrestaurantsbyidServices=async(req,res)=>{
  try {
    const id=req.params.id
    const getrestaurant =await Restaurant.findById(id)
    if(!getrestaurant){
      return{status:404,message:'Restaurant not found',data:[]}
    }
    console.log("getrestaurant",getrestaurant);
   

    return{status: 200,message:'success',data:getrestaurant}
   
 
      
  } catch (error) {
      console.log("error",error);
      throw new Error 
  }
}



const updaterestaurantsbyidServices=async(req,res)=>{
  try {
    const { name, description, latitude, longitude, ratings } = req.body;
    const id=req.params.id
    const getrestaurant =await Restaurant.findByIdAndUpdate(id,{
      name,description,
      location:{type:'Point',coordinates:[parseFloat(longitude),parseFloat(latitude)]},
      ratings
    },{new :true})
    if(!getrestaurant){
      return{status:404,message:'Restaurant not found',data:[]}
    }
    console.log("getrestaurant",getrestaurant);
   

    return{status: 200,message:'Updated successfully',data:getrestaurant}
   
 
      
  } catch (error) {
      console.log("error",error);
      throw new Error 
  }
}

module.exports={
    registerServices,loginServices,restaurantsnearbyServices,restaurantsrangeServices,addrestaurantsServices,
    getrestaurantsServices,getrestaurantsbyidServices,updaterestaurantsbyidServices
}