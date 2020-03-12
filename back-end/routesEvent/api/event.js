const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const pool = require('../../config/sqldb');

router.get('/', (req, res) => {
  try {
    pool.query(`SELECT * from event_information`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('server error');
      }

      console.log(result);
      res.status(200).json({ result });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    pool.query(
      `SELECT * from event_information WHERE event_id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('server error');
        }

        console.log(result);
        res.status(200).json({ result });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.get('/company/:id', (req, res) => {
  const id = req.params.id;
  try {
    pool.query(
      `SELECT * from event_information WHERE company_id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('server error');
        }

        console.log(result);
        res.status(200).json({ result });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.post('/', (req, res) => {
  const {
    event_name,
    event_description,
    event_timing,
    event_from_date,
    event_to_date,
    event_location,
    event_eligibility_criteria,
    event_major,
    company_id
  } = req.body;
  try {
    pool.query(
      `INSERT into event_information (event_name, event_description, event_timing, event_from_date, event_to_date, event_location, event_eligibility_criteria, event_major, company_id) VALUES ('${event_name}', '${event_description}', '${event_timing}', '${event_from_date}', '${event_to_date}', '${event_location}', '${event_eligibility_criteria}', '${event_major}', ${company_id})`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('server error');
        }

        console.log(result);
        res.status(200).json({ result });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});


router.get('/registered/:id', (req, res) => {
  const id = req.params.id;
  try {
    pool.query(
      `SELECT * from registered_events WHERE event_id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('server error');
        }

        console.log(result);
        res.status(200).json({ result });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.get('/registered/student/:id', (req, res) => {
  const id = req.params.id;
  try {
    pool.query(
      `SELECT * from registered_events WHERE student_id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('server error');
        }

        console.log(result);
        res.status(200).json({ result });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.post('/registered/:id', (req, res) => {
  const id = req.params.id;
  const {event_id, company_id} = req.body;
  try {
    pool.query(
      `INSERT into registered_events (event_id, student_id, company_id) VALUES (${event_id}, ${id}, ${company_id})`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('server error');
        }

        console.log(result);
        res.status(200).json({ result });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});



module.exports = router;
