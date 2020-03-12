const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const pool = require('../../config/sqldb');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        pool.query(`SELECT * from application_information_table WHERE company_id=${id}`, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send('server error');
            }

            console.log(result);
            res.status(200).json({result});
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('server error!')
    }
})

router.get('/job/:id', (req, res) => {
    const id = req.params.id;
    try {
        pool.query(`SELECT * from application_information_table WHERE job_id=${id}`, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send('server error');
            }

            console.log(result);
            res.status(200).json({result});
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('server error!')
    }
})

router.get('/apply/:id', (req, res) => {
    const id = req.params.id;
    try {
        pool.query(`SELECT * from application_information_table WHERE student_id=${id}`, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send('server error');
            }

            console.log(result);
            res.status(200).json({result});
        })
    } catch (err) {
        console.log(err);
        res.status(500).send('server error!')
    }
})

router.post('/', (req, res) => {
    const {application_status, application_date, student_id, company_id, job_id} = req.body;
    try {
        pool.query(`INSERT into application_information_table (application_status, application_date, student_id, company_id, job_id) VALUES ('${application_status}', '${application_date}', ${student_id}, ${company_id}, ${job_id})`, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send('server error');
            }

            console.log(result);
            res.status(200).json({result});
        })
    } catch(err) {
        console.log(err);
        res.status(500).send('server error');
    }

})

router.post('/:id', (req, res) => {
    const id = req.params.id;
    const {application_status, student_id} = req.body;
    try {
        pool.query(`UPDATE application_information_table set application_status='${application_status} WHERE company_id=${id} AND student_id=${student_id}`, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send('server error');
            }

            console.log(result);
            res.status(200).json({result});
        })
    } catch(err) {
        console.log(err);
        res.status(500).send('server error');
    }
})


module.exports = router;