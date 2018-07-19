const db = require('../data-base/index');
const helper = require('../helper/uitilty');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    db.userSchema.find({
        username: username
    }, (err, data) =>{
        if (err) {
            res.sendStatus(404);
        } else {
            if (data.length > 0) {
                res.sendStatus(404);
            } else {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    if (err) {
                        throw err;
                    }
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            throw err;
                        }
                        let user = new db.userSchema({
                            username: username,
                            email: email,
                            password: hash
                        });
                        user.save(function (err, data) {
                            if (err) {
                                throw err;
                            }
                            helper.createSession(req, res, data.username);
                        });
                    });
                });
            }
        }
    });

	}

exports.login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.userSchema.findOne({
    username: username
  }, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (!data) { // if the user does not exist
        res.sendStatus(404);
      } else {
        bcrypt.compare(password, data.password, function (err, found) {
          if (found) {
            helper.createSession(req, res, data.username);
          } else {
            res.sendStatus(404);
          }
        })
      }
    }
  })
}
