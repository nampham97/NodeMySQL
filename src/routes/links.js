const express = require('express')
const router = express.Router()

const pool = require('../database');
const { isLoggedIn} = require('../lib/auth')

router.get('/add', isLoggedIn, (req, res) =>{
    res.render('links/add', {path: 'add'})
})

router.get('/', isLoggedIn, async(req, res) =>{
    const listLinks = await pool.query('SELECT * from links where user_id = ?', [req.user.id]);

    res.render('links/list', {
        links : listLinks,
        path : 'links'
    })
})


router.post('/add', isLoggedIn, async (req, res) => {
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id : req.user.id
    }

    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links')
})

//DELETE
router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    console.log(req.params.id);
    let id = req.params.id;

    await pool.query('DELETE FROM links where id = ?', [id]);
    req.flash('success', 'Link deleted successfully');
    res.redirect('/links')
})

//OPEN EDIT PAGE
router.get('/edit/:id', isLoggedIn, async (req, res) =>{
    let {id} = req.params;
    const links = await pool.query('SELECT * from links WHERE id=?', [id])

    res.render('links/edit', {links : links[0]})
})

//SAVE EDIT
router.post('/edit/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    }

    await pool.query('UPDATE links SET ? WHERE id = ?;', [newLink, id]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links')
})

module.exports = router;