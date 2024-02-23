const {registerServices, loginServices, restaurantsnearbyServices,restaurantsrangeServices,addrestaurantsServices,
    getrestaurantsServices,getrestaurantsbyidServices,updaterestaurantsbyidServices}=require('../services/demo_service')

const registerController=async(req,res)=>{
    callservices(registerServices,req,res)
}

const loginController=async(req,res)=>{
    callservices(loginServices,req,res)
}

const restaurantsnearbyController=async(req,res)=>{
    callservices(restaurantsnearbyServices,req,res)
}


const restaurantsrangeController=async(req,res)=>{
    callservices(restaurantsrangeServices,req,res)
}


const addrestaurantsController=async(req,res)=>{
    callservices(addrestaurantsServices,req,res)
}

const getrestaurantsController=async(req,res)=>{
    callservices(getrestaurantsServices,req,res)
}

const getrestaurantsbyidController=async(req,res)=>{
    callservices(getrestaurantsbyidServices,req,res)
}


const updaterestaurantsbyidController=async(req,res)=>{
    callservices(updaterestaurantsbyidServices,req,res)
}
const callservices=async(method,req,res)=>{
    try {
        var result=await method(req)
        console.log("resulr",result);
        res.status(200).json({
            status:result.status,
            message:result.message,
            data:result.data
        })
    } catch (error) {
        res.status(400).json({
            status:result.status,
            message:result.message,
            data:result.data
        })
    }
}

module.exports={
    registerController,loginController,restaurantsnearbyController,restaurantsrangeController,addrestaurantsController,
    getrestaurantsController,getrestaurantsbyidController,updaterestaurantsbyidController
}