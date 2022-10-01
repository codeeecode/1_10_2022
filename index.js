const express = require("express");
const app = express();
const mongoose = require("mongoose")
const url = "mongodb+srv://codecode12345:123456789m@cluster0.ik5tvr8.mongodb.net/greenwich" //sau 27017/tên database
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connect to db succeed !");
    }
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