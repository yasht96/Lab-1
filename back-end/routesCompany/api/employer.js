const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const pool = require('../../config/sqldb');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        pool.query(`SELECT * from company_information WHERE company_id=${id}`, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('server error');
            }

            console.log(result);
            res.status(200).json({result});
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('server error!');
    }
})

router.post('/:id', (req, res) => {
    const {company_name, company_location, company_description, company_contact} = req.body;
    const id = req.params.id;
    try {
        pool.query(`UPDATE company_information set company_name='${company_name}', company_location='${company_location}', company_description='${company_description}', company_contact='${company_contact}' WHERE company_id=${id}`, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('server error');
            }

            console.log(result);
            res.status(200).json({result});
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('server error!');
    }
})





module.exports = router;