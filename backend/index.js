const express = require("express")
const app = express()
const axios = require('axios');

const env= require("dotenv")
env.config()
const cors = require('cors');
app.use(cors());
app.use(express.json())


app.get('/network-data', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send('URL is required . please enter the url !!');
    }

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});




app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to data-base")
    } catch (error) {
        console.log(error)
    }
     console.log(`Server running on port no ${process.env.port}`)
})
