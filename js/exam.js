
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
let inner = window.localStorage.getItem("inner");
let bigPerant = document.querySelector('.big-perant');
bigPerant.innerHTML = inner;
//#####################################################################//


//++++ Varibals-1 ++++//
let maxNum = window.localStorage.getItem("maxNum");
let answerDiv = document.querySelectorAll('.but-questions');
let buttons = document.querySelectorAll('.but-questions .buttons');
let plusBtnDiv = document.querySelectorAll('.but-questions .container .plusBtn');
let inputs = document.querySelectorAll('.but-questions .container .perant input');
let perantDiv = document.querySelectorAll('.but-questions .container .perant');
let rightAns = document.querySelectorAll('.but-questions .container .right-answer');
let timerHours = document.querySelector('.timer .container .perant span:first-child');
let timerMins = document.querySelector('.timer .container .perant span:last-child');
let finishBtnDiv = document.querySelector('.btnfinish');
let finishBtn = document.querySelector('.btnfinish button ');
let startBtn = document.querySelector('.timer .container .btn button');
let yourDegDiv = document.querySelector('.your-deg');
let degree = document.querySelector('.degree')
let percentText = document.querySelector('.your-deg .container .text');
//++++ Varibals-1 ++++//

console.log(startBtn);

//++++ Handle Timer ++++//
timerHours.textContent = window.localStorage.getItem("hours");
timerMins.textContent = window.localStorage.getItem("Mins");
//++++ Handle Timer ++++//



//+++Remove++++//
plusBtnDiv.forEach((e) => {
    e.remove();
});

buttons.forEach((e) => {
    e.remove();
});
//+++Remove++++//


//+++Creating++++//
perantDiv.forEach((e) => {
    let plusBtn = document.createElement('div');
    plusBtn.className = 'plusBtn'
    for (let i = 0; i < 4; i++) {
        let span = document.createElement('span');
        span.append('+')
        plusBtn.appendChild(span);
    };
    e.appendChild(plusBtn);
})
//+++Creating++++//



//++++ Varibals-2 ++++//
let plusBtn = document.querySelectorAll('.but-questions .container .plusBtn span');
//++++ Varibals-2 ++++//

//++++ Butting or Remove id || class || anyAttribute ++++//
count = 1;
plusBtn.forEach((e) => {
    e.id = `id${count++}`;
});

rightAns.forEach((e) => {
    e.textContent = '';
})
//++++ Butting id || class || anyAttribute ++++//


//++++ Events ++++//
var successPar = 0;
let intervalMins;
function clearIntervals(intervalMins, successPar) {
    clearInterval(intervalMins);
    document.querySelector('.big-perant').style.cssText = `transform: scale(0);display:none;`
    document.querySelector('.finish').style.cssText = ' display: flex; transform: scale(1);'
    for (let i = 0; i < answerDiv.length; i++) {
        if (answerDiv[i].getAttribute("trueOrFalse") === 'true') {
            document.querySelector('.degree').textContent++;
        }
        let tank = `${Math.trunc(Math.max((+degree.textContent / +answerDiv[i].id) * 100))}%`;
        percentText.textContent = tank;
        window.localStorage.setItem("tank", tank);
    }
    let widthinterval = setInterval(() => {
        document.querySelector('.your-deg .container .percent span').style.width = `${successPar++}%`;
        if (document.querySelector('.your-deg .container .percent span').style.width === window.localStorage.getItem('tank')) {
            clearInterval(widthinterval);
        }
    }, 10);
    finishBtnDiv.style.display = 'none';
    yourDegDiv.style.display = 'block';
}



startBtn.addEventListener('click', () =>{
    startBtn.style.cssText = 'transform: scale(0);'
    setTimeout(() => {
        startBtn.style.display = 'none';
    }, 1000)
     intervalMins = setInterval(() => {
        +timerMins.textContent--
        if (+timerMins.textContent === 0 && +timerHours.textContent > 0) {
            timerMins.textContent = 60;
            +timerHours.textContent--;
        }
        else if (+timerMins.textContent === 0 && +timerHours.textContent === 0) {
            clearIntervals(intervalMins, successPar);
        }
    }, 60000)

    answerDiv.forEach((e) => {
        e.addEventListener('click', (e) => {
            for (let i = 0; i < inputs.length; i++) {
                if (e.target.id === inputs[i].id) {
                    e.currentTarget.childNodes[1].childNodes[7].textContent = inputs[i].placeholder;
                }
            }
            if (e.currentTarget.childNodes[1].childNodes[7].textContent === e.currentTarget.getAttribute("rightAns")) {
                e.currentTarget.setAttribute("trueOrFalse", true)
            } else { e.currentTarget.setAttribute("trueOrFalse", false) }
            window.localStorage.setItem("inner2", document.body.innerHTML);
        })
    })
    // //++++ Percent ++++//
    
    finishBtn.addEventListener('click', () => {
        let confirmm = confirm("If You Send No Answers You Will Fail...!");
        if (confirmm === true) {
            clearIntervals(intervalMins, successPar);
            document.querySelector('.finish').style.cssText = ' display: none;';
        }
        window.scrollTo({
            left: 0,
            top: 1000000,
            behavior: "smooth"
        })
    });
    // //++++ Percent ++++//
})



//++++ Events ++++//





































































































