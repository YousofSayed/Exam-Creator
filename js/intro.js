let information = document.querySelector(".landing .container .text p")
let typingText1 = "Create Your Exam For Your Studints With Easier Way";
var x = 0;
let interval = setInterval(() => {
    information.textContent += typingText1[x]
    x++
    if (information.textContent.length === 50) {
        clearInterval(interval)
    }
},100)
console.log(typingText1.length);
console.log(information);
