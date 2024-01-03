const express = require('express');
const signupRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const RequestController = require('./controllers/RequestCont');
const cors = require('cors');
const Emergency = require('./controllers/EmergencyCont');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure CORS
app.use(cors());

app.get('/', async (req, res) => {
    // Replace with appropriate model or database query
    const result = await places.find();
    console.log(result);
    res.json(result);
});


app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.post('/requests', RequestController.submitRequest);
app.get('/requests', RequestController.getAllRequests); 
app.delete('/requests/:id', RequestController.deleteRequest);
app.get('/pend/requests',RequestController.getOneRequest);
app.post('/emergency',Emergency.submitEmergency);
app.get('/emergency', Emergency.getAllEmergency); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});