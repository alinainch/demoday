module.exports = function(app, passport, db) {
//require gets replaced by this function ^^^^
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          console.log(result)
          res.render('profile.ejs', {
            user : req.user,
            messages: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

    app.get('/tracker', isLoggedIn, function(req, res) {
        db.collection('tracker').find().toArray((err, result) => {
          if (err) return console.log(err)
          console.log(result)
          res.render('tracker.ejs', {
            user : req.user,
            tracker: result
          })
        })
    });

// message board routes ===============================================================
    //matching route for the form action in profile.ejs
    app.post('/tracker', (req, res) => {
      db.collection('tracker').save({log: req.body.log, date: req.body.date}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/tracker')
      })
    })

    //.put is sent by the fetch req in the main.js 
    //find one book from the database and update its reviews
    app.put('/tracker', (req, res) => {
      console.log(req.body)
      db.collection('tracker')
      .findOneAndUpdate({log: req.body.log}, {
        $set: {
          msg: req.body.msg
        }
      }, {
        sort: {_id: -1},
      }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/tracker')
      })
    })
    
    app.delete('/tracker', (req, res) => {
      db.collection('tracker').findOneAndDelete({log: req.body.log, date: req.body.date}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
