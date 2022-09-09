const express = require('express');
const pool = require('../database');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn} = require('../lib/auth')

router.get('/signin', isNotLoggedIn, (req, res) =>{
    res.render('auth/signin', {
        path : 'signin'
    })
})

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}))

router.get('/signup', isNotLoggedIn, ( req, res) =>{
    res.render('auth/signup', {
        path : 'signup'
    })
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.get('/profile', isLoggedIn, (req, res) =>{
    res.render('auth/profile', {
        path : 'profile'
    })
})

router.get('/logout', isLoggedIn, (req, res, next) =>{
    req.logOut((err) =>{
        if(err)
            return next(err)
        res.redirect('/signin');
    })
})

module.exports = router;
