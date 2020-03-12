const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json({ extended: false }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   if (res.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// });

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.get('/', (req, res) => res.send('API running!'));

app.use('/api/student/login', require('./routesStudent/api/login'));
app.use('/api/student/register', require('./routesStudent/api/register'));
app.use('/api/student', require('./routesStudent/api/student'));
app.use('/api/employer/login', require('./routesCompany/api/login'));
app.use('/api/employer/register', require('./routesCompany/api/register'));
app.use('/api/employer', require('./routesCompany/api/employer'));
app.use('/api/job', require('./routesJob/api/jobs'));
app.use('/api/event', require('./routesEvent/api/event'));
app.use('/api/application', require('./routesApplication/api/application'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));