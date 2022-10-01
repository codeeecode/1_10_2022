const express = require("express");
const app = express();
const mongoose = require("mongoose")
    //url connection String(local db)
    // const url = "mongodb://localhost:27017/greenwich"
    //url connection String(cloud db)
const url = "mongodb+srv://codecode12345:123456789m@cluster0.ik5tvr8.mongodb.net/greenwich" //sau 27017/tên database


mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connect to db succeed !");
    }
});

// //body-parser : lấy dữ liệu từ Form

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }))
//     //render ra form add
// app.get("/add", (req, res) => {
//         res.render("add");
//     })
//     // Nhận và xử lý dữ liệu từ form add
// app.post("/add", (req, res) => {
//     res.render("add", (req, res) => {
//         console.log(req.body)
//     });
// })
//body-parser: get form input
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//render ra form add
app.get("/add", (req, res) => {
    res.render("add");
});

//nhận và xử lý dữ liệu từ form add
app.post("/add", (req, res) => {
    // console.log(req.body);
    // res.send(req.body)
    // res.render("output", { student: req.body })
    //tạo object student chứa dữ liệu nhập từ form
    var student = new studentModel({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        image: req.body.image,
    })
    student.save((err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/student")
        }
    })
});


const port = process.env.PORT || 3000

const path = require("path");
const studentModel = require("./models/StudentSchema");
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var check = "login failed ! ";
    if (username == "admin" && password == "12345") {
        check = "login success"
    }
    res.render("check", { result: check })
})

app.get('/student', (req, res) => {
    studentModel.find((err, data) => {
        if (err) {
            console.log(err)
        } else {
            //c1:show du lieu ra console.log
            // console.log(data)
            //c2:show du lieu ra API
            // res.send(data)
            //C3 show ra du lieu ra view ""
            res.render("student", { student: data })
        }
    })
})

app.listen(port)