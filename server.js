const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const pass = process.env.EMAIL_PASSWORD;
const api = process.env.API_URL
console.log(api);


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (if you're saving messages)
mongoose.connect(process.env.CONNECTION_STRING,{
  dbName: 'emailtest',
})
.then(() => {
  console.log('Connected to emailtest');
})
.catch((err) => {
  console.log(err);
})

// Routes
const emailRoutes = require("./routes/emailroute");

// API UTILIZATION
app.use(`${api}/emails`, emailRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});