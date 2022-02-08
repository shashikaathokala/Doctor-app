const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const path = require('path')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const Insurance = require('./api/insurance');
const doctorList = require('./api/doctors_list');
const PatientList = require('./api/patient_list')
// app.use(express.static(path.join(__dirname+"/static")));

// app.get('/login', function(req, res){
//     res.render('login');
// });
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/login.html'))

});

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI    = require('swagger-ui-express'); 
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Doctor Appointment Application',
        description: 'Doctor Appointment Application',
        servers: [{
          url: "http://localhost:5000",
        }]
      }
    },
    //File path to where the api are located eg: ['routes/*.js']
    apis: ["api/*.js"]
  };

  const SwaggerDocs = swaggerJsDoc(swaggerOptions);

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SwaggerDocs));

app.use('/api/doctor',doctorList);
app.use('/api/patient',PatientList);
app.use('/api/insurance',Insurance)
// app.use('/insurance')
app.listen(port, ()=>{
    console.log("Server is running on port : "+ port);
})