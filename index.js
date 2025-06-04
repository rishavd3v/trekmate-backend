const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const trekRoute = require('./routes/trekRoute');
const verifyOrigin = require('./middleware/origin');

const port  = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api',verifyOrigin, trekRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})