
//================================#=varibals=#====================================//

let numField = document.querySelector('.number .container .num-of-qes .num');
let warnSpan1 = document.querySelector('.number .container .num-of-qes span');
let warnSpanAnimate1 = document.querySelector('.number .container .num-of-qes .for-animat');
let createBtn = document.querySelector(".number .container  .creatinBtn .crt");
let finallyNumQus = document.querySelector('.finally-number-qus');
let timerHour = document.querySelector('.dashboard .container input:first-child');
let timerMIn = document.querySelector('.dashboard .container input:last-child');
let warnning = document.querySelector('.dashboard .container .perant');
let answerDivAlone = document.querySelector('.but-questions');
let btnExam = document.querySelector('.nav-3 .container p');
let bigPerant = document.querySelector('.big-perant');
let typingText1 = "Maximum Num - 200";
let typingText2 = "Maximum Hours - 24";
let typingText3 = "Maximum Min - 60";

//================================#=varibals=#====================================//




//============Number Of question  you want============//
numField.addEventListener('input', (e) => {
    let nums = [...numField.value].filter((e) => {
        if (e === "0") {
            return e;
        }
        return +e;
    }).join('');
    numField.value = nums;
    if (+numField.value > 200) {
        numField.value = '';
        warnSpan1.textContent = typingText1;
        warnSpanAnimate1.style.cssText = `animation: type 1.3s steps(19)  forwards ;`
    };
});
//============Number Of question  you want============//


//==================Number Of Timer==================//

//###############-Timer Of Hours -###############//
timerHour.setAttribute('trueorfalse', 'false');
timerMIn.setAttribute('trueorfalse', 'false');

timerHour.addEventListener('input', () => {

    if (+timerHour.value > 24 || +timerHour.value < 0) {
        timerHour.value = '';
        warnning.textContent = 'Maximum 24 And Minimum 0';
        timerHour.setAttribute('trueorfalse', 'false');
    } else {
        timerHour.setAttribute('trueorfalse', 'true');
        window.localStorage.setItem("hours", +timerHour.value);
    };
});

//###############-Timer Of Hours -###############//



//###############-Timer Of Min -###############//
timerMIn.addEventListener('input', () => {
    if (+timerMIn.value > 60 || +timerMIn.value < 1) {
        timerMIn.value = '';
        warnning.textContent = 'Maximum 60 And Minimum 1';
        timerMIn.setAttribute('trueorfalse', 'false');

    } else {
        timerMIn.setAttribute('trueorfalse', 'true');
        window.localStorage.setItem("Mins", +timerMIn.value);
    };
});


//###############-Timer Of Min -###############//

//==================Number Of Timer==================//


function setIds(answerDiv, inputs, plusBtn) {
    answerDiv.forEach((e, i) => {
        e.id = i + 1;
        e.style.cssText = `display:block;`
        e.addEventListener('input', (e) => {
            console.log(e.target.value);
            window.localStorage.setItem("inner", bigPerant.innerHTML);
            e.target.placeholder = e.target.value;
            window.localStorage.setItem("currentInner", document.body.innerHTML);
        })
    })



    inputs.forEach((e, i) => {
        e.id = `id${i + 1}`

    })


    plusBtn.forEach((e, i) => {
        e.id = `id${i + 1}`;
        e.className = 'addAns'

    })
}

function craetElements() {
    for (let i = 0; i < +numField.value; i++) {
        let content = answerDivAlone.innerHTML;
        let div1 = document.createElement('div');
        div1.className = "but-questions";
        div1.innerHTML = content;
        bigPerant.appendChild(div1);
    }
    answerDivAlone.remove()

}
// craetElementsAndSetAttrip()

let tank,
    isCompleted;
//============Event Of Create  Button============//

createBtn.addEventListener('click', (e) => {
    if (numField.value === '') {
        return false;
    }

    else if (+finallyNumQus.textContent + +numField.value > 200) {
        console.log(+finallyNumQus.textContent + +numField.value);
        createBtn.style.cssText = `background-color:red;`;
        return false;
    } else {
        createBtn.style.cssText = `background-color:var(--color);`;
    }
    window.localStorage.setItem("inner", bigPerant.innerHTML);
    answerDivAlone.style.display = `flex`

    craetElements()

    let answerDiv = document.querySelectorAll('.but-questions ');
    let inputs = document.querySelectorAll('.but-questions .container .perant input');
    let plusBtn = document.querySelectorAll('.but-questions .container .plusBtn span ');


    setIds(answerDiv, inputs, plusBtn)

    answerDiv.forEach((e) => {

        e.addEventListener('click', (e) => {

            window.localStorage.setItem("currentInner", document.body.innerHTML);

            window.localStorage.setItem("inner", bigPerant.innerHTML);

            let preventError = [...e.currentTarget.childNodes[1].childNodes[3].childNodes[1].children]
            //Way One To Return  False
            // preventError.forEach((e) => {
            //     if (e.className === 'answer' && e.value === '') {
            //         isCompleted= false
            //     }
            // })
            // if (!isCompleted) return false

            //Way Two To Return  False
            for (let i = 0; i < preventError.length; i++) {
                if (preventError[i].className === "answer" && preventError[i].value === '') {
                    return false;
                };
            };
            console.log(preventError);

            if (e.target.className === 'addAns') {

                e.currentTarget.childNodes[1].childNodes[3].childNodes[3].style.cssText = `transform: scale(0);`;

                inputs.forEach((el) => {
                    if (e.target.id === el.id) {
                        window.localStorage.setItem('val', el.value);
                        tank = window.localStorage.getItem('val');
                    };
                })
                console.log(e.currentTarget.children[0].children[3]);
                e.currentTarget.children[0].children[3].innerHTML = tank;
                e.currentTarget.setAttribute("rightAns", e.currentTarget.children[0].children[3].innerHTML);
            }
            tank = window.localStorage.getItem('val');

            if (e.target.id === 'ret') {
                e.currentTarget.childNodes[1].childNodes[3].childNodes[3].style.cssText = `transform: scale(1);`
            };


            if (e.target.id === 'del') {
                finallyNumQus.textContent = finallyNumQus.textContent - 1;
                e.currentTarget.remove();
            }
        });


        finallyNumQus.textContent = 11;
        window.localStorage.setItem("inner", bigPerant.innerHTML);
        document.querySelector('.nav-3').style.display = 'block';

    });

    let array = Array.from(bigPerant.children);
    for (let i = 0; i <= array.length; i++) {
        finallyNumQus.textContent = +i;
    }

    //============Number Of qusetions  which we have created============//

    btnExam.addEventListener('click', () => {

        if (bigPerant.children.length <= 1) return false;
        for (let i = 0; i < answerDiv.length; i++) {
            if (!answerDiv[i].hasAttribute("rightans")) {
                alert('You Did Not Write Any Answers...!')
                return false
            };
        }
        if (timerHour.getAttribute('trueorfalse') === 'false' || timerMIn.getAttribute('trueorfalse') === 'false') {
            alert('You Did Not Write The Time...!')
            return false
        };


        window.localStorage.setItem("inner", bigPerant.innerHTML)
        window.location.href = "Exam.html";
    });

    //============Number Of qusetions  which we have created============//




});
//============Event Of Create  Button============//








// createBtn.addEventListener('click', (e) => {
//     window.localStorage.setItem("inner", bigPerant.innerHTML);

//     if (numField.value === '') {
//         return false;
//     }

//     else if (+finallyNumQus.textContent + +numField.value > 200) {
//         console.log(+finallyNumQus.textContent + +numField.value);
//         createBtn.style.cssText = `background-color:red;`;
//         return false;
//     } else {
//         createBtn.style.cssText = `background-color:var(--color);`;
//     }




//     for (let i = 0; i < +numField.value; i++) {
//         let content = answerDivAlone.innerHTML;
//         let div1 = document.createElement('div');
//         div1.className = "but-questions";
//         div1.innerHTML = content;
//         bigPerant.appendChild(div1);
//     }
//     answerDivAlone.remove()

//     let answerDiv = document.querySelectorAll('.but-questions ');
//     let inputs = document.querySelectorAll('.but-questions .container .perant input');
//     let plusBtn = document.querySelectorAll('.but-questions .container .plusBtn span ');


//     let count = 1;
//     answerDiv.forEach((e) => {
//         e.id = count++;
//         e.style.cssText = `display:block;`
//         e.addEventListener('input', (e) => {
//             console.log(e.target.value);
//             window.localStorage.setItem("inner", bigPerant.innerHTML);
//             e.target.placeholder = e.target.value;
//             window.localStorage.setItem("currentInner", document.body.innerHTML);
//         })
//     })


//     let inp = 1;
//     inputs.forEach((e) => {
//         e.id = `id${inp++}`

//     })


//     let btn = 1;
//     plusBtn.forEach((e) => {
//         e.id = `id${btn++}`;
//         e.className = 'addAns'

//     })

//     answerDiv.forEach((e) => {

//         e.addEventListener('click', (e) => {
//             window.localStorage.setItem("currentInner", document.body.innerHTML);

//             window.localStorage.setItem("inner", bigPerant.innerHTML);


//             for (let local = 0; local < inputs.length; local++) {
//                 if (e.target.id === inputs[local].id) {
//                     window.localStorage.setItem('val', inputs[local].value);
//                     inputs[local] = document.createElement('div')
//                 };
//             };


//             let tank = window.localStorage.getItem('val');


//             if (e.target.className === "right-answer" || e.target.type === "text") {
//                 return false
//             };
//             if (e.target.className === "but-questions" || e.target.className === "plusBtn") {
//                 return false
//             };
//             if (e.target.className === "text" || e.target.className === "container") {
//                 return false
//             };
//             if (e.target.className === "buttons" || e.target.className === "input-qus") {
//                 return false
//             };


//             if (e.target.id === 'ret') {
//                 e.currentTarget.childNodes[1].childNodes[3].childNodes[3].style.cssText = `transform: scale(1);`
//             };


//             let preventError = e.currentTarget.childNodes[1].childNodes[3].childNodes[1].childNodes;


//             for (let i = 0; i < preventError.length; i++) {
//                 if (preventError[i].className === "answer" && preventError[i].value === '' && e.target.id === "del") {
//                     finallyNumQus.textContent = finallyNumQus.textContent - 1;
//                     e.currentTarget.remove();
//                     return true
//                 };
//             };


//             for (let i = 0; i < preventError.length; i++) {
//                 if (preventError[i].className === "answer" && preventError[i].value === '') {
//                     return false;
//                 };
//             };


//             if (e.currentTarget.childNodes[1].childNodes[1].childNodes[1].value === '') {
//                 return false
//             } else {
//                 for (let i = 0; i < e.currentTarget.childNodes[1].childNodes.length; i++) {
//                     if (e.currentTarget.childNodes[1].childNodes[i].className === "right-answer") {
//                         e.currentTarget.childNodes[1].childNodes[i].innerHTML = tank;
//                         e.currentTarget.setAttribute("rightAns", e.currentTarget.childNodes[1].childNodes[i].innerHTML)

//                     };
//                 };



//                 if (e.target.id === 'del') {

//                     finallyNumQus.textContent = finallyNumQus.textContent - 1;
//                     e.currentTarget.remove();
//                 }

//             };


//             if (e.target.className === 'addAns') {
//                 e.currentTarget.childNodes[1].childNodes[3].childNodes[3].style.cssText = `transform: scale(0);`;
//             };


//         });



//         finallyNumQus.textContent = 11;

//         window.localStorage.setItem("inner", bigPerant.innerHTML);
//         document.querySelector('.nav-3').style.display = 'block';

//     });

//     let array = Array.from(bigPerant.children);
//     for (let i = 0; i <= array.length; i++) {
//         finallyNumQus.textContent = +i;
//     }

//     //============Number Of qusetions  which we have created============//

//     btnExam.addEventListener('click', () => {

//         if (bigPerant.children.length <= 1) {
//             return false;
//         }
//         for (let i = 0; i < answerDiv.length; i++) {
//             if (answerDiv[i].hasAttribute("rightans") === false) {
//                 return false;
//             }
//         }
//         window.localStorage.setItem("inner", bigPerant.innerHTML)
//         window.location.href = "Exam.html";
//     });

//     //============Number Of qusetions  which we have created============//




// });
// //============Event Of Create  Button============//



