import { ResponseService } from './service/ResponseService.js';

let forms = {
    intro : {
        questions : [
            {
                id : 'description',
                type: 'p',
                content: 'The following study explores the IKEA effect and is expected to take at most 15 - 20 minutes to complete. There are no expected risks to the participants, all will leave with some compensation. Participation in this study is completely voluntary and you can stop at any time. Please contact hayeseve@grinnell.edu with any questions.'
            },
            {
                id : 'password',
                type : 'text',
                label : 'Password',
                hint : ''
            },
            {
                id : 'email',
                type : 'text',
                label : 'Grinnell Email',
                hint : 'hayeseve'
            },
            {
                type : 'button',
                id : 'next-button',
                label : 'Next',
            }
        ],
        script : () => {
            $('#next-button').click(wrapFirstPage);
        }
    },
    controlStart : {
        questions : [
            {
                type : 'button',
                id : 'spin-button',
                label : 'Spin the Wheel',
            }
        ],
        script : () => {
            $('#spin-button').click(spinTheWheel);
        }
    },
    treatmentStart : {
        questions : [
            {
                id : 'instructions',
                type : 'p',
                content : 'I am instructions on how to complete the experiment!',
            },
            {
                type : 'button',
                id : 'start-button',
                label : 'Start the Quiz',
            }
        ],
        script : () => {
            $('#start-button').click(startQuiz);
        }
    },
    firstOffer : {
        questions : [
            {
                id : 'offer-p',
                type : 'p',
                content : 'l'
            },
            {
                type : 'button',
                id : 'accept-button',
                label : 'Accept Trade',
            },
            {
                type : 'button',
                id : 'reject-button',
                label : 'Reject Trade',
            }
        ],
        script : () => {
            // $('accept-button').click();
            $('#reject-button').click(secondOffer);
            $('#offer-p').text(`You can either choose to keep your current candy (${response.candyWon}) or trade the candy you have for ${response.candyWon} quarters.`);
        }
    },
    secondOffer : {
        questions : [
            {
                id : 'offer-p',
                type : 'p',
                content : 'l'
            },
            {
                type : 'button',
                id : 'accept-button',
                label : 'Accept Trade',
            },
            {
                type : 'button',
                id : 'reject-button',
                label : 'Reject Trade',
            }
        ],
        script : () => {
            $('#reject-button').click(thirdOffer);
            $('#offer-p').text(`You can either choose to keep your current candy (${response.candyWon}) or trade the candy you have for ${response.candyWon + 1} quarters.`);
        }
    },
    thirdOffer : {
        questions : [
            {
                id : 'offer-p',
                type : 'p',
                content : 'l'
            },
            {
                type : 'button',
                id : 'accept-button',
                label : 'Accept Trade',
            },
            {
                type : 'button',
                id : 'reject-button',
                label : 'Reject Trade',
            }
        ],
        script : () => {
            $('#offer-p').text(`You can either choose to keep your current candy (${response.candyWon}) or trade the candy you have for ${response.candyWon + 2} quarters.`);
        }
    },
    outro : {
        questions : [],
        script : () => {
            
        }
    }
}

let response = {};

function genericRender(form) {

    let container = $('#form-container');
    
    container.empty();

    for (let question of form.questions) {

        if (question.type == 'text') {
            let label = `<label for="${question.label}">${question.label}: </label>`;
            let input = `<input placeholder="${question.hint}" type="${question.type}" id="${question.id}-input">`;
            container.append(label);
            container.append(input);
        } else if (question.type == 'button') {
            let button = `<button id="${question.id}" type="button" onclick="${question.onclick}">${question.label}</button>`;
            container.append(button);
        } else if (question.type == 'p') {
            let p = `<p id="${question.id}">${question.content}</p>`
            container.append(p);
        }
    }

    form.script();
}

function render() {
    genericRender(forms.intro);
}

function wrapFirstPage() {

    if ($('#password-input').val() !== 'econ') {
        window.alert('That\'s not the correct password!');
        return;
    }

    if ($('#email-input').val() == '') {
        window.alert('I need an email to tie the response to!');
        return;
    }

    response.email = $('#email-input').val();
    response.isTreament = Math.floor(Math.random() * 2) === 1;

    startControl();

    // if (!response.isTreament) {
    //     startControl();
    // } else {
    //     startTreatment();
    // }
}

let theWheel;

function spinTheWheel() {
    $('#spin-button').prop("disabled", true);
    theWheel.startAnimation();
}

function startControl() {
    genericRender(forms.controlStart);
    let canvas = '<canvas id="canvas" width="880" height="450"> Canvas not supported, use another browser. </canvas>';
    $('#form-container').append(canvas);

    theWheel = new Winwheel({
        'outerRadius'     : 212,        // Set outer radius so wheel fits inside the background.
        'innerRadius'     : 55,         // Make wheel hollow so segments dont go all way to center.
        'textFontSize'    : 24,         // Set default font size for the segments.
        'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
        'textAlignment'   : 'outer',    // Align text to outside of wheel.
        'numSegments'     : 10,         // Specify number of segments.
        'segments'        :             // Define segments including colour and text.
        [                               // font size and text colour overridden on backrupt segments.
            {'fillStyle' : '#6B2737', 'text' : '1 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#84DCC6', 'text' : '2 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#007EA7', 'text' : '3 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#EA7317', 'text' : '4 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#FEC601', 'text' : '1 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#D90368', 'text' : '2 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#6B2737', 'text' : '3 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#84DCC6', 'text' : '4 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#007EA7', 'text' : '1 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
            {'fillStyle' : '#EA7317', 'text' : '2 Candy', 'textFontSize' : 18, 'textFillStyle' : '#ffffff'},
        ],
        'animation' :           // Specify the animation to use.
        {
            'type'     : 'spinToStop',
            'duration' : 10,
            'spins'    : 3,
            'callbackFinished' : alertPrize,  // Function to call whent the spinning has stopped.
            'callbackSound'    : null,   // Called when the tick sound is to be played.
            'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound.
        },
        'pins' :                // Turn pins on.
        {
            'number'     : 24,
            'fillStyle'  : 'silver',
            'outerRadius': 4,
        }
    });
}

// Called when the animation has finished.
function alertPrize(indicatedSegment) {
    alert("You have won " + indicatedSegment.text);
    response.candyWon = parseInt(indicatedSegment.text[0]);
    genericRender(forms.firstOffer);
}

function secondOffer() {
    genericRender(forms.secondOffer);
}

function thirdOffer() {
    genericRender(forms.thirdOffer);
}

function wrapLogic() {

    // get response ready

    // show closing
}

// function startTreatment() {
//     genericRender(forms[2]);
// }

// let countSolved = 0;

// function onTimerFinish() {
//     alert('You finished ' + countSolved);
// }

// function startTimer(duration, displayID) {
//     var timer = duration, minutes, seconds;
//     let id = setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         document.getElementById(displayID).innerHTML = minutes + ":" + seconds;

//         if (--timer < 0) {
//             console.log('DONEEEEEEEEEEEE');
//             onTimerFinish();
//             clearInterval(id);
//         }
//     }, 1000);
// }

// function startQuiz() {
//     genericRender(forms[4]);
//     startTimer(60, 'timer-p');
//     renderQuizQuestion();
// }

// function renderQuizQuestion(isFirst) {

//     if (!isFirst) {
//         // check existing answer
//     }

//     // clear & render content

//     // set button onclick to recurse renderQuizQuestion(false);
// }

// function doShit() {
//     let responseService = new ResponseService();
//     response.value = response.email;
//     responseService.sendResponse(response);
// }

render();

