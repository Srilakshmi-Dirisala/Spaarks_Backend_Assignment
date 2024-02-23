const express=require('express');
const { registerController, loginController, restaurantsnearbyController, restaurantsrangeController,addrestaurantsController, 
    getrestaurantsController,getrestaurantsbyidController,updaterestaurantsbyidController}=require("../controllers/demo_controller");
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

// Retrieve a single restaurant by ID
router.get('/getrestaurants/:id',getrestaurantsbyidController)

/***update the data  */

router.put('/updaterestaurants/:id',updaterestaurantsbyidController)

module.exports=router