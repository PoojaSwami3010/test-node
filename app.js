const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const cors = require('cors');


app.use(express.json());
app.use(cors());



mongoose.connect("mongodb+srv://root:root@cluster0.9ymkue2.mongodb.net/mernstack?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("db connected")
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchems = new mongoose.Schema({
    name: String,
    email: String,
    city: String
})

const userModel = mongoose.model("users", userSchems)

// app.get('/getUser', async (req, res) => {
//     // const users = await userModel.find();
//     // console.log("user ", users)
//     res.status(202).send({ "users": "teting", "tests": "tesrs" })
// });


var corsOptions = {
    origin: 'http://localhost:4201',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const dashbord1 = {
    data: [
        { title: "Test1", subTitle: "test1", count: 80 },
        { title: "Test2", subTitle: "test2", count: 60 },
        { title: "Test3", subTitle: "test3", count: 30 },
        { title: "Test4", subTitle: "test4", count: 80 },
        { title: "Test5", subTitle: "test5", count: 80 },
        { title: "Test6", subTitle: "test6", count: 20 },
        { title: "Test7", subTitle: "test7", count: 30 },
        { title: "Test8", subTitle: "test8", count: 40 },
        { title: "Test9", subTitle: "test9", count: 90 },
        { title: "Test10", subTitle: "test10", count: 80 },
        { title: "Test11", subTitle: "test11", count: 70 },
        { title: "Test12", subTitle: "test12", count: 80 },
        { title: "Test13", subTitle: "test13", count: 50 },
    ]
}


app.get('/dashboard1', cors(corsOptions), async (req, res, next) => {
    // const users = await userModel.find();
    res.status(202).send(dashbord1)
})



const dashbord2 = {
    data: [
        { title: "Test1", subTitle: "test1", count: 80, descritpion: "Testing 1" },
        { title: "Test2", subTitle: "test2", count: 90, descritpion: "Testing 2" },
        { title: "Test3", subTitle: "test3", count: 100, descritpion: "Testing 3" },
        { title: "Test4", subTitle: "test4", count: 80, descritpion: "Testing 4" },
        { title: "Test5", subTitle: "test5", count: 1100, descritpion: "Testing 5" },

    ]
}
app.get('/dashboard2', cors(corsOptions), async (req, res, next) => {
    // const users = await userModel.find();
    res.status(202).send(dashbord2)
})

const allUsers = {
    data: [
        { name: "Rohan", email: "rohan@gmailcon", city: "Pune", phoneNo: 1234567890 },
        { name: "gauri", email: "gauri@gmailcon", city: "Bengaluru", phoneNo: 1234567890 },
        { name: "Kalidass", email: "kalidass@gmailcon", city: "Chennai", phoneNo: 1234567890 },
        { name: "Gayathri", email: "gaythri@gmailcon", city: "Bengaluru", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan@gmailcon", city: "Chennai", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan@gmailcon", city: "Bengaluru", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan@gmailcon", city: "Pune", phoneNo: 1234567890 },
        { name: "Rohan", email: "gauri@gmailcon", city: "Pune", phoneNo: 1234567890 },
        { name: "Rajesh", email: "Rajesh@gmailcon", city: "Pune", phoneNo: 1234567890 },
        { name: "Siva", email: "siva@gmailcon", city: "Bengaluru", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan@gmailcon", city: "Chennai", phoneNo: 1234567890 },
        { name: "Hema", email: "hema@gmailcon", city: "Bengaluru", phoneNo: 1234567890 },
        { name: "Pooja", email: "pooja@gmailcon", city: "Chennai", phoneNo: 1234567890 },
        { name: "Rohit", email: "rohit@gmailcon", city: "Pune", phoneNo: 1234567890 },
        { name: "vandana", email: "vandana@gmailcon", city: "Chennai", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan2@gmailcon", city: "Pune", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan@gmailcon", city: "Pune", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan56@gmailcon", city: "Pune", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan@gmailcon", city: "Chennai", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan@gmailcon", city: "Chennai", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan89@gmailcon", city: "Chennai", phoneNo: 1234567890 },
        { name: "Rohan", email: "rohan6789@gmailcon", city: "Pune", phoneNo: 1234567890 },
    ]
}

app.get('/getAllUsers', cors(corsOptions), async (req, res, next) => {
    const users = await userModel.find();
    res.status(202).send(users);
})

app.post('/save', cors(corsOptions), async (req, res, next) => {
    console.log("request", req)
    const user = new userModel(req.body)
    try {
        await user.save()
        res.status(201).send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(4000, function () {
    console.log('CORS-enabled web server listening on port 4000')
})