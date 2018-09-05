'use strict'

const Router = require('express').Router
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy
const config = require('../../../config')
const {setReturnToFromReferer, passportGeneralCallback} = require('../utils')

let googleAuth = module.exports = Router()

passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.serverURL + '/auth/google/callback'
}, passportGeneralCallback))

googleAuth.get('/auth/google', function (req, res, next) {
  setReturnToFromReferer(req)
  passport.authenticate('google', { scope: ['profile'] })(req, res, next)
})
  // google auth callback
googleAuth.get('/auth/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: config.serverURL + '/',
    failureRedirect: config.serverURL + '/'
  })
)
