const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const trekRoute = require('./routes/trekRoute');

const port  = process.env.PORT || 3000;

app.use(cors({
    origin: "https://trekmate-delta.vercel.app",
}));

app.use(express.json());
app.use('/api',trekRoute)

app.get('/',(req,res)=>{
    res.send('Hello from server');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})