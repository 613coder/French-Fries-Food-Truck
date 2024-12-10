const express=require("express");
const nodemailer=require("nodemailer");
const cors=require("cors");
const bodyparser=require("body-parser");
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




document.addEventListener('DOMContentLoaded', () => {

    // **Loading Animation**
    const menuContainer = document.querySelector('.menu');
    const boxes = document.querySelectorAll('.menu-item');

    function checkBoxes() {
        const containerRect = menuContainer.getBoundingClientRect();
        const triggerBottom = containerRect.top + (containerRect.height / 5) * 4;

        boxes.forEach((box) => {
            const boxTop = box.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                box.classList.add('show');
            } else {
                box.classList.remove('show');
            }
        });
    }

    if (menuContainer) {
        menuContainer.addEventListener('scroll', checkBoxes);
        checkBoxes(); 
    }


    // **Order Mechanics**
    let orders = [];
    let total = 0;

    function addToOrder(name, price) {
        orders.push({ name, price });
        updateOrderSummary();
    }

    function updateOrderSummary() {
        const orderList = document.getElementById('order-list');
        const totalPrice = document.getElementById('total-price');

        orderList.innerHTML = ''; // Clear list
        total = 0; // Reset total price

        orders.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} - $${item.price}
                <button id="remove-order" onclick="removeItem(${index})">Remove</button>
            `;
            orderList.appendChild(listItem);
            total += item.price;
        });

        totalPrice.innerText = `Total: $${total}`;
    }

    function removeItem(index) {
        orders.splice(index, 1);
        updateOrderSummary();
    }

    window.addToOrder = addToOrder;
    window.removeItem = removeItem;




    // **Auto-Text Effect**
    const textEl = document.getElementById('text');
    const text = 'Thank You For Your Order!';
    let idx = 1;
    const speed = 60;

    function writeText() {
        textEl.innerText = text.slice(0, idx);
        idx++;
        setTimeout(writeText, speed);
    }

    writeText();



    // **Ripple Effect on Buttons**
    const buttons = document.querySelectorAll('.menu-item button');

    buttons.forEach((button) => {
        button.addEventListener('click', function (e) {
            const x = e.clientX;
            const y = e.clientY;

            const buttonTop = e.target.offsetTop;
            const buttonLeft = e.target.offsetLeft;

            const xInside = x - buttonLeft;
            const yInside = y - buttonTop;

            const circle = document.createElement('span');
            circle.classList.add('circle');
            circle.style.top = `${yInside}px`;
            circle.style.left = `${xInside}px`;

            this.appendChild(circle);

            circle.addEventListener('animationend', () => {
                circle.remove();
            });
        });
    });



    // **Dad Jokes**
    const jokeEl = document.getElementById('insert-joke');
    const jokeBtn = document.getElementById('joke');

    async function generateJoke() {
        const config = {
            headers: {
                Accept: 'application/json',
            },
        };

        const res = await fetch('https://icanhazdadjoke.com', config);
        const data = await res.json();

        jokeEl.innerHTML = data.joke;
    }

    jokeBtn.addEventListener('click', generateJoke);

});










