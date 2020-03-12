const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const pool = require('../../config/sqldb');

// @route    POST api/register
// @desc     Register Company & get token
// @access   Public
router.post('/', async (req, res) => {

  const { company_name, email, password, location } = req.body;
  console.log(req.body);
  try {
    pool.query(
      `SELECT company_email_id FROM company_information WHERE company_email_id='${email}'`,
      async (err, result) => {
        if (err) {
            console.log(err);
          return res.status(500).send('server error');
        }
        if (result.length > 0) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Company already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);

        const encryptpassword = await bcrypt.hash(password, salt);
        
        pool.query(
          `INSERT into company_information (company_name, company_email_id, company_password, company_location) VALUES ('${company_name}', '${email}', '${encryptpassword}', '${location}')`,
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send('server error');
            }

            console.log(result);

            const payload = {
              user: {
                id: email,
                usertype: 'employer'
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