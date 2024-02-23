const express=require('express');
const { registerController, loginController, restaurantsnearbyController, restaurantsrangeController,addrestaurantsController, getrestaurantsController}=require("../controllers/demo_controller");
var router=express.Router();

router.post('/api/auth/register',registerController)

router.post('/login',loginController)
// Get Restaurants within Radius
router.get('/restaurants/nearby',restaurantsnearbyController)
// Get Restaurants within Radius Range
router.get('/restaurants/range',restaurantsrangeController)

/***add restaurants details */
router.post('/addrestaurants',addrestaurantsController)

/***get all restaurants data */
router.get('/getrestaurants',getrestaurantsController)
module.exports=router