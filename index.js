const express = require('express') 
    , app = express()  
    , dotenv = require('dotenv') // set variable in our environment [production||development||uat].
    , cors = require('cors') // allow or restrict requested resources on a web server.
    , router = require('./routes/index') // to be able to set routes using express.

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);

dotenv.config();
const port = process.env.PORT || 7010
    , env  = process.env.NODE_ENV || 'development';
    
app.use( express.urlencoded({ extended: true }) );
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Playground API!"
    });
});

try {
    app.listen(port, () => {
        console.log(`Server is started at ${Date()} in ${env} and listening on port ${port}`);
    });
} catch(e) {
    const errorMessage = `Failed to connect to port, error: ${e.message}`;
    console.error(errorMessage);
}
