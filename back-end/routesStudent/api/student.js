const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const pool = require('../../config/sqldb');


aws.config.update({
  secretAccessKey: config.get('secretAccessKey'),
  accessKeyId: config.get('accessKeyId'),
  region: 'us-east-1'
});

const s3 = new aws.S3();


const upload = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'test-handshake',
      key: function (req, file, cb) {
        console.log(req.params.id);
          //console.log(file);
          cb(null, 'profile_' + req.params.id);
      }
  })
});

const upload2 = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: 'test-handshake',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      contentDisposition: 'inline',
      key: function (req, file, cb) {
        console.log(req.params.id);
          //console.log(file);
          cb(null, 'resume_' + req.params.id);
      }
  })
});


router.get('/', (req, res) => {
  try {
    pool.query(`SELECT * from student_information`, async (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('server error');
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
      `SELECT * from student_information WHERE student_id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('server error');
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

router.get('/education/:id', (req, res) => {
  const id = req.params.id;
  try {
    pool.query(
      `SELECT * from student_educational_details WHERE student_id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('server error');
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

router.get('/experience/:id', (req, res) => {
  console.log('get experience');
  const id = req.params.id;
  try {
    pool.query(
      `SELECT * from student_experience_details WHERE student_id=${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('server error');
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

router.post('/basic/:id', (req, res) => {
  const id = req.params.id;
  const {
    student_name,
    date_of_birth,
    city_name,
    state_name,
    country_name,
    career_objective,
    phone_number,
    student_email_id
  } = req.body;

  try {
    var query = `UPDATE student_information set student_name = '${student_name}', date_of_birth = '${date_of_birth}', city_name = '${city_name}', state_name = '${state_name}', country_name = '${country_name}', career_objective = '${career_objective}', phone_number = '${phone_number}', student_email_id = '${student_email_id}' WHERE 
    student_id = ${id}`;
    console.log(query);
    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('server error');
      }
      console.log(result);

      res.status(200).json({ result });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.post('/skill/:id', (req, res) => {
  const id = req.params.id;
  const {
    skillSet
  } = req.body;
  try {
    var query = `UPDATE student_information set skillSet = '${skillSet}'  WHERE student_id = ${id}`;
    console.log(query);
    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('server error');
      }
      console.log(result);

      res.status(200).json({ result });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});


router.post('/education/:id', (req, res) => {
  const id = req.params.id;
  const {
    institution_name,
    degree,
    major,
    passing_year,
    cgpa
  } = req.body;

  try {
    pool.query(`INSERT into student_educational_details (degree, institution_name, cgpa, major, passing_year, student_id) VALUES ('${degree}', '${institution_name}', '${cgpa}', '${major}', '${passing_year}', ${id})`, (err, result) => {
      if (err) {
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

router.put('/education/:id', (req, res) => {
  const id = req.params.id;
  const {
    institution_name,
    degree,
    major,
    passing_year,
    cgpa
  } = req.body;

  try {
    pool.query(`UPDATE student_educational_details set institution_name = '${institution_name}',  degree = '${degree}', major = '${major}', passing_year = '${passing_year}', cgpa = '${cgpa}' WHERE (education_id = ${id})`, (err, result) => {
      if (err) {
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

router.post('/experience/:id', (req, res) => {
  console.log('hi');
  const id = req.params.id;
  const {
    company_name,
    title,
    company_location,
    start_date,
    end_date,
    work_summary
  } = req.body;
  try {
    pool.query(`SELECT * from student_experience_details WHERE student_id=${id}`, (err, result) => {
      if(err) {
        console.log(err); 
        res.status(500).send('server error!');
      }

      if(result.length === 0) {
        pool.query(`INSERT into student_experience_details (company_name, designation, work_summary, company_location, starting_date, ending_date, student_id) VALUES ('${company_name}', '${title}', '${work_summary}', '${company_location}', '${start_date}', '${end_date}', ${id})`, (err, result) => {
          if(err) {
            console.log(err);
            res.status(500).send('server error!');
          }

          console.log(result);
          res.status(200).json({result});
        })
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.put('/experience/:id', (req, res) => {
  const id = req.params.id;
  const {
    company_name,
    title,
    company_location,
    start_date,
    end_date,
    work_summary,
    experience_id,
  } = req.body;
  try {
    pool.query(`SELECT * from student_experience_details WHERE student_id=${id}`, (err, result) => {
      if(err) {
        console.log(err);
        res.status(500).send('server error!');
      }

      if(result.length !== 0) {
        pool.query(`UPDATE student_experience_details set company_name = '${company_name}', designation = '${title}', work_summary = '${work_summary}', company_location ='${company_location}', starting_date = '${start_date}', ending_date = '${end_date}' WHERE (student_id = ${id} AND experience_id = ${experience_id})`, (err, result) => {
          if(err) {
            console.log(err);
            res.status(500).send('server error!');
          }

          console.log(result);
          res.status(200).json({result});
        })
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.post('/upload/:id', upload.array('upl',1), (req, res, next) => {
  const id = req.params.id;
  const profile_path = 'https://test-handshake.s3.amazonaws.com/profile_' + id;
  try {
    pool.query(`UPDATE student_information set student_profile_photo = '${profile_path}'   WHERE student_id=${id}`, (err, result) => {
      if(err) {
        console.log(err);
        res.status(500).send('server error');
      }
      res.status(200).json({msg: 'uploaded!'})
    })
    
  } catch (err) {
    console.log(err);
    res.status(500).send('server error!');
  }
});

router.post('/upload/resume/:id', upload2.array('upl',1), (req, res, next) => {
  res.status(200).json({msg: 'uploaded'});
  
});

module.exports = router;


// router.post('/education/:id', (req, res) => {
//   const id = req.params.id;
//   const {
//     college_name,
//     degree,
//     major,
//     year_of_passing,
//     current_cgpa
//   } = req.body;

//   try {
//     pool.query(
//       `SELECT * from student_educational_details WHERE (student_id=${id} AND degree='BE')`,
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send('server error!');
//         }
//         console.log(result);
//         if (result.length === 0) {
//           pool.query(
//             `INSERT into student_educational_details (degree, institution_name, cgpa, major, passing_year, student_id) VALUES ('${degree}', '${college_name}', '${current_cgpa}', '${major}', '${year_of_passing}', ${id})`,
//             (err, result) => {
//               if (err) {
//                 console.log(err);
//                 res.status(500).send('server error!');
//               }

//               res.status(200).json({ result });
//             }
//           );
//         } else {
//           pool.query(
//             `UPDATE student_educational_details set institution_name = '${college_name}',  degree = '${degree}', major = '${major}', passing_year = '${year_of_passing}', cgpa = '${current_cgpa}' WHERE 
//           (degree = '${degree}' AND student_id = ${id})`,
//             (err, result) => {
//               if (err) {
//                 console.log(err);
//                 return res.status(500).send('server error');
//               }
//               console.log(result);

//               res.status(200).json({ result });
//             }
//           );
//         }
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('server error!');
//   }
// });
