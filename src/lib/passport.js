const { use } = require('passport');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

//LOGIN
passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) =>{
    const row = await pool.query('SELECT * from users where username = ?', [username])
    if(row?.length > 0){
        const user = row[0];
        const validPwd = await helpers.matchPassword(password, user.password)
        console.log('Check matched password:', validPwd)
        if(validPwd){
            return done(null, user, req.flash('success', 'Welcome ' + user.fullname))
        }else{
            done(null, false, req.flash('message', 'Wrong username or password!'))
        }
    }else{
        done(null, false, req.flash('message', "User not exists!"))
    }

}))

//DANG KY ACCOUNT
passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=> {
    const {fullname} = req.body;
    const newUser = {
        fullname,
        username,
        password
    }
 
    newUser.password = await helpers.encryptPassword(password);

    const result = await pool.query('INSERT INTO users set ?', [newUser]);
    newUser.id = result.insertId;

    return done(null, newUser)
}))

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const row = await pool.query('SELECT * FROM users where id=?', [id])
    console.log('row deserilize:', row)
    done(null, row[0]);
})