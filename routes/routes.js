const cloudinary = require('../middleware/cloudinary')
module.exports = function(app, passport, db, mongodb, chatGPT) {
//require gets replaced by this function ^^^^
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('tracker').find({userID: req.user._id}).toArray((err, result) => {
          if (err) return console.log(err)
          console.log(result)
          res.render('profile.ejs', {
            user : req.user,
            trackerLogs: result
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

    // TRACKER ==============================
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

    // MEDIA just rendering page ==============================
    app.get('/media', function(req, res) {
      res.render('media.ejs');
  });

  // Read chatGPT ==============================
  app.get('/chatty', function(req, res) {
    res.send(askGpt('give me the names of 3 yoga poses' + ' keep it brief'));
});

// Chatty ==============================
  async function askGpt(prompt) {
    const completion = await chatGPT.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    return completion.data.choices[0].message.content;
  }

// message board routes ===============================================================
    //matching route for the form action in profile.ejs
    app.post('/tracker', (req, res) => {
      db.collection('tracker').save({userID: req.user._id, log: req.body.log, date: new Date(req.body.date)}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/tracker')
      })
    })

    //.put is sent by the fetch req in the main.js 
    //find one book from the database and update its reviews
    // app.put('/tracker', (req, res) => {
    //   console.log(req.body)
    //   db.collection('tracker')
    //   .findOneAndUpdate({log: req.body.log}, {
    //     $set: {
    //       msg: req.body.msg
    //     }
    //   }, {
    //     sort: {_id: -1},
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.redirect('/tracker')
    //   })
    // })
    
    app.delete('/deleteTracker/:id', (req, res) => {
      console.log(req.params.id)
      db.collection('tracker').findOneAndDelete({_id:mongodb.ObjectId(req.params.id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.redirect('/tracker')
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
