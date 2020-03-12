const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const pool = require('../../config/sqldb');

// @route    POST api/register
// @desc     Register student & get token
// @access   Public
router.post('/', async (req, res) => {

  const { name, email, password, college_name } = req.body;
  //console.log(req.body);
  try {
    pool.query(
      `SELECT student_email_id FROM student_information WHERE student_email_id='${email}'`,
      async (err, result) => {
        if (err) {
            console.log(err);
          return res.status(500).send('server error');
        }
        if (result.length > 0) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Student already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);

        const encryptpassword = await bcrypt.hash(password, salt);
        
        pool.query(
          `INSERT into student_information (student_name, student_email_id, student_password, student_college_name) VALUES ('${name}', '${email}', '${encryptpassword}', '${college_name}')`,
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send('server error');
            }

            console.log(result.insertId);

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
                res.json({ token, id: result.insertId });
              }
            );
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