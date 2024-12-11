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
const loveMe = document.querySelector('.loveMe')
const times = document.querySelector('#times')

let clickTime = 0
let timesClicked = 0

loveMe.addEventListener('click', (e) => {
    if(clickTime === 0) {
        clickTime = new Date().getTime()
    } else {
        if((new Date().getTime() - clickTime) < 800) {
            createHeart(e)
            clickTime = 0
        } else {
            clickTime = new Date().getTime()
        }
    }
})

const createHeart = (e) => {
    const heart = document.createElement('i')
    heart.classList.add('fas')
    heart.classList.add('fa-heart')

    const x = e.clientX
    const y = e.clientY

    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop

    const xInside = x - leftOffset
    const yInside = y - topOffset

    heart.style.top = `${yInside}px`
    heart.style.left = `${xInside}px`

    loveMe.appendChild(heart)

    times.innerHTML = ++timesClicked

    setTimeout(() => heart.remove(), 1000)
}

});










