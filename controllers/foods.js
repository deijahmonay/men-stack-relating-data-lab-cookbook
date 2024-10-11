const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => { // MAIN FOOD PAGE ROUTE 
try { 
const currentUser = await User.findById(req.session.user._id) //GET CURRENT USERS DATA AND KEEP BY SESSION
res.render('foods/index.ejs', { // render food/index.ejs, dispaly users pantry data
pantry: currentUser.pantry // DISPALY PANTRY ITEMS
    })
} catch(error) { // redirect to homepage if error happens
    res.redirect('/')
}
})

router.get('/new', (req, res) => {  // route to show new form for new food items
res.render('foods/new.ejs') // render to food/new.ejs to show the new form
})

router.get('/:foodsId/edit', async (req, res) => {  //display edit form route for selevcted food item
try {
    const currentUser = await User.findById(req.session.user._id) // find the current user in the database by session id
    const editFood = currentUser.pantry.id(req.params.foodsId) //edit food item by food id 
    res.render('foods/edit.ejs', { // render foodejs page (specific food item)
        pantry: editFood // moving the food item to the edut form
    })
} catch (error) { // if an error appears redirect to homepage
    res.redirect('/')
}
})


router.post('/', async (req, res) => { // route for processing the newly created food item
try {
    const currentUser = await User.findById(req.session.user._id)  // find user in database
    currentUser.pantry.push(req.body) // add new food item to users pantry
    await currentUser.save()  // save the users to databae once process complete
    res.redirect(`/users/${currentUser._id}/foods`)  // redirect user to updated list of foods
} catch (error){
    res.redirect('/')  // if an error appears redirect to homepage
}
})

router.put('/:foodsId', async (req, res) => { // route for updating food item that already exists
try {
    const currentUser = await User.findById(req.session.user._id) //same as above, find user in database by id
    const updateFood = currentUser.pantry.id(req.params.foodsId)  // find specific food item in pantry by id
    updateFood.set(req.body)  // update food item withh new data
    await currentUser.save() // save updated info to user database
    res.redirect(`/users/${currentUser._id}/foods`) // redirect to foods lists 
} catch (error) { // if an error occures redirect to homepage
    res.redirect('/')
}
})

router.delete('/:foodsId', async (req, res) => { // route to delete food item
try {
    const currentUser = await User.findById(req.session.user._id) //same as above, find user in database by id
    currentUser.pantry.id(req.params.foodsId).deleteOne() // find item in user pantry by id and delete that specific item
    await currentUser.save() // once complete save to database
    res.redirect(`/users/${currentUser._id}/foods`) // redirect to lists of all food items
} catch (error) { // if an error occures redirect to homepage
    res.redirect('/')
}
})

module.exports = router;