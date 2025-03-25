// Onboarding Screen va Invitation o'tish
const introSection = document.querySelector('.intro1');
const invitationSection = document.querySelector('.invitation');
const blurButton = document.getElementById('blurButton');
const audio = document.getElementById('myAudio');

blurButton.addEventListener('click', () => {
    introSection.classList.add('hidden');
    invitationSection.classList.add('visible');
    audio.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
});

// Countdown Timer
const weddingDate = new Date("April 11, 2025 18:00:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(countdown);
        document.querySelector(".countdown").innerHTML = "<h3>Bizning katta kunimiz keldi!</h3>";
    }
}, 1000);

// Canvas Animation (yulduzlar)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const starsArray = [];
const numberOfStars = 100;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random();
        this.speed = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.opacity += this.speed;
        if (this.opacity >= 1 || this.opacity <= 0) {
            this.speed *= -1;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfStars; i++) {
        starsArray.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update();
        starsArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});