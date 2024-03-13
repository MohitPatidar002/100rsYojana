const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect.js');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary.js');
require('./config/resetData.js')
require('./config/sendReminder.js')

// db connection
dbConnect()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log("App started at Port ", process.env.PORT)
    })
})
.catch((error) => {
    console.log("Error while app listening", error);
})


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}))
app.use(cors({
    origin: '*',
    credentials: true
}))

// connect to the cloudinary
cloudinaryConnect();

// data reset while month change
// resetDataForNextMonth();

// routes
const userRoute = require('./routes/user.route.js');
const profileRoute = require('./routes/profile.route.js');
const paymentRoute = require('./routes/payment.route.js');


// mounting
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/payment', paymentRoute);



app.get('/', (req, res) => {
    res.send("Your app is running....")
})