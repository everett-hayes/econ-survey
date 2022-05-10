import { ResponseService } from './service/ResponseService.js';

let forms = {
    intro : {
        questions : [
            {
                id : 'description',
                type: 'p',
                content: 'The following study explores the IKEA effect and is expected to take at most ~5 minutes to complete. There are no expected risks to the participants, all will leave with some compensation. Participation in this study is completely voluntary and you can stop at any time. Please contact <a href = "mailto: hayeseve@grinnel.edu">hayeseve@grinnell.edu</a> with any questions.'
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
                content : 'You will have 3 minutes to answer as many math questions as you can. Feel free to use a piece of scratch paper. At the top you will see a timer and the amount of questions you have solved so far. At the end of the quiz you will be awarded some amount of candy depending on how many questions you are able to solve.',
            },
            {
                id : 'relation',
                type : 'p',
                content : '1 - 20 correct ➡️ 1 candy <br/> 21 - 30 correct ➡️ 2 candies <br/> 30+ correct ➡️ 3 candies',
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
    treatmentContent : {
        questions : [
            {
                id : 'timer-p',
                type : 'p',
                content : '02:00'
            },
            {
                id : 'question-div',
                type : 'div'
            },
            {
                id : 'answer',
                type : 'text',
                label : 'Your Answer',
                hint : ''
            },
            {
                id : 'submit-answer',
                type : 'button',
                label : 'Submit Answer'
            }
        ],
        script : () => {
            $('#submit-answer').click(function() {
                renderQuizQuestion(false);
            })

            $(document).keypress(function (e) {
                if (e.which == 13){
                    $("#submit-answer").click();
                }
            });
        }
    },
    treatmentEnd : {
        questions : [
            {
                id : 'results-p',
                type : 'p',
                content : 'l'
            }
        ],
        script : () => {
            $('#results-p').text('Congrats you finished some shit!');
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
            $('#accept-button').click(function () {
                response.candyAccepted = 0;
                response.moneyWon = response.candyWon * .25;
                outro();
            });
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
            $('#accept-button').click(function() {
                response.candyAccepted = 0;
                response.moneyWon = response.candyWon * .25 + .25;
                outro();
            });
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
            $('#accept-button').click(function() {
                response.candyAccepted = 0;
                response.moneyWon = response.candyWon * .25 + .50;
                outro();
            });
            $('#reject-button').click(function() {
                response.candyAccepted = response.candyWon;
                response.moneyWon = 0;
                outro();
            });
            $('#offer-p').text(`You can either choose to keep your current candy (${response.candyWon}) or trade the candy you have for ${response.candyWon + 2} quarters.`);
        }
    },
    outro : {
        questions : [
            {
                id : 'title',
                type : 'p',
                content : 'Expirement Closing Document:'
            },
            {
                id : 'amount',
                type : 'p',
                content : ''
            },
            {
                id : 'signature',
                type : 'text',
                label : 'Signature',
                hint : ''
            },
            {
                id : 'date',
                type : 'text',
                label : 'Date',
                hint : ''
            },
            {
                type : 'button',
                id : 'send-button',
                label : 'Send Results!',
            },
        ],
        script : () => {
            $('#send-button').click(sendResponse);
            $('#amount').text(`Thank you for participating in this study! You will be compensated with ${response.candyAccepted} piece(s) of candy and \$${response.moneyWon}. Please sign you name below to confirm your payment.`);
        }
    },
    allDone : {
        questions : [
            {
                id : 'close',
                type : 'p',
                content : 'Results have been sent!!!'
            }
        ],
        script : () => {}
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
        } else if (question.type == 'div') {
            let div = `<div id="${question.id}"></div>`;
            container.append(div);
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

    startTreatment();

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

function outro() {
    genericRender(forms.outro);
}

function sendResponse() {

    if ($('#signature-input').val() == '' || $('#date-input').val() == '') {
        window.alert('Please sign and date the closing document!');
        return;
    }

    response.signature = $('#signature-input').val();
    response.date = $('#date-input').val();
    response.dateActual = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    if (!'mathQuestionsAnswered' in response) {
        response.mathQuestionsAnswered = 'N/A';
    }

    let responseService = new ResponseService();
    responseService.sendResponse(response);

    genericRender(forms.allDone);
}

function startTreatment() {
    genericRender(forms.treatmentStart);
}

function onTimerFinish() {
    genericRender(forms.treatmentEnd);
}

let countSolved = 0;

function startTimer(duration, displayID) {
    var timer = duration, minutes, seconds;
    let id = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById(displayID).innerHTML = minutes + ":" + seconds + ' You have solved ' + countSolved + ' problem(s).' ;

        if (--timer < 0) {
            onTimerFinish();
            clearInterval(id);
        }
    }, 1000);
}

function startQuiz() {
    genericRender(forms.treatmentContent);
    startTimer(180, 'timer-p');
    renderQuizQuestion(true);
}

let a = null;
let b = null;
let c = null;
let d = null;
let e = null;
let f = null;

let questionType = 1;

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

function renderQuizQuestion(isFirst) {

    let userAnswer = parseInt($('#answer-input').val());

    if (!isFirst) {

        if (questionType === 1) {
            console.log(userAnswer);
            console.log(b);
            if (userAnswer === (e + d) / a + f) {
                countSolved++;
            }
        } else if (questionType === 2) {
            if (userAnswer === (c / b) * a + e) {
                countSolved++;
            } else {
                console.log('incorrect!');
            }
        }
    }

    // clear & render content
    $('#question-div').empty();
    $('#answer-input').val('');

    a = getRandomInt(10);
    b = getRandomInt(10);
    c = a * b;
    d = getRandomInt(10);
    e = c - d;
    f = getRandomInt(20);

    questionType = getRandomInt(2);
    console.log('questionType was generated to be ' + questionType);

    if (questionType === 1) {
        $('#question-div').append(`<p>Question: (${e} + ${d}) / ${a} + ${f} = ?</p>`);    
    } else if (questionType === 2) {
        $('#question-div').append(`<p>Question: (${c} / ${b}) * ${a} + ${e} = ?</p>`);    
    } 
}

function doShit() {
    let responseService = new ResponseService();
    response.value = response.email;
    responseService.sendResponse(response);
}

render();

