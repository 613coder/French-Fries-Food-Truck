const express=require("express");
const cors=require("cors");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'orderStyle.css')));
app.use(express.static(path.join(__dirname, 'FrenchFriesStyle.css')));

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});
app.get("/order", (req, res) => {
    res.sendFile(path.join(__dirname, 'Order.html'));
});
app.get("/aboutus", (req, res) => {
    res.sendFile(path.join(__dirname, 'AboutUs.html'));
});