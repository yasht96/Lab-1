const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const pool = require('../../config/sqldb');

// @route    POST api/login
// @desc     Authenticate student & get token
// @access   Public
router.post('/', async (req, res) => {

  const { email, password } = req.body;
  console.log(req.body);
  try {
    pool.query(
      `SELECT student_password, student_id from student_information WHERE student_email_id='${email}'`,
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('server error');
        }
        if (result.length == 0) {
          return res
            .status(201)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, result[0].student_password);

        if (!isMatch) {
          return res
            .status(201)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payload = {
          user: {
            id: email,
            usertype: 'student'
          }
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token, id: result[0].student_id });
          }
        );
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;