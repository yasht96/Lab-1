const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const pool = require('../../config/sqldb');


// @route    POST api/job
// @desc     Get all job posts
// @access   Public
router.get('/', (req, res) => {
    try {
        pool.query(`SELECT * from jobs_information`, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('server error');
            }

            console.log(result);

            res.status(200).json({result})
        })

    } catch (err) {
        console.log(err);
        res.status(500).send('server error!');
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        pool.query(`SELECT * from jobs_information WHERE job_id=${id}`, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('server error');
            }

            console.log(result);

            res.status(200).json({result})
        })

    } catch (err) {
        console.log(err);
        res.status(500).send('server error!');
    }
})

router.get('/postings/:id', (req, res) => {
    const id = req.params.id;
    try {
        pool.query(`SELECT * from jobs_information WHERE company_id=${id}`, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('server error');
            }

            console.log(result);

            res.status(200).json({result})
        })

    } catch (err) {
        console.log(err);
        res.status(500).send('server error!');
    }
})

router.post('/:id', (req, res) => {
    const company_id = req.params.id;
    const {job_title, job_posting_date, application_deadline, location, job_salary, job_description, job_requirements, job_category} = req.body;
    try {
        pool.query(`INSERT into jobs_information (job_title, job_posting_date, job_application_deadline, job_location, job_salary, job_description, job_requirements, job_category, company_id) VALUES ('${job_title}', '${job_posting_date}', '${application_deadline}', '${location}', '${job_salary}', '${job_description}', '${job_requirements}', '${job_category}', ${company_id})`, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('server error');
            }

            console.log(result);

            res.status(200).json({result})
        })

    } catch (err) {
        console.log(err);
        res.status(500).send('server error!');
    }
})

module.exports = router;