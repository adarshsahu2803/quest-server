require('dotenv').config();
const express = require('express')
const app = express()
const Signup = require('./models/signup');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb+srv://sahu27:sahu@registration-api.x80arum.mongodb.net/Registration-API?retryWrites=true&w=majority")
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || port, () => {
            console.log(`Node API app is running on port ${port}`)
        })
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    console.log("this is home page")
    res.send("this is home page from server");
});

app.get('/login', (req, res) => {
    console.log("this is login page")
    res.send("this is login page from server");
});

app.get('/signup', (req, res) => {
    console.log("this is signup page")
    res.send("this is signup page from server");
});

app.post('/signup', async (req, res) => {
    try {
        const password = req.body.password
        const cpassword = req.body.confirmPassword

        console.log("password " + password + ":: cpassword " + cpassword);

        if (password === cpassword) {

            const userSignupData = new Signup({
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmPassword: cpassword,
                gender: req.body.gender,
            })

            const signedup = await userSignupData.save()
            return res.status(200).json({ message: 'User registered successfully' });
            // res.status(201).json({ message: 'User registered successfully', user: signedup });

        } else {
            return res.status(500).json({ message: 'Password are not matching' });
            // res.send("Password are not matching!")
        }
    } catch (error) {
        console.error('Error occurred during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await Signup.findOne({ userName });
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = (password === user.password)? 1:0;

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
