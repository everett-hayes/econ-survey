import { ResponseService } from './service/ResponseService.js';

let forms = [
    {
        questions : [
            {
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
    {
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
    {
        questions : [
            {
                type : 'button',
                label : 'I Am Treatment',
            }
        ],
        script : () => {

        }
    }
]

let response = {};

function render() {
    genericRender(forms[0]);
}

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
            let p = `<p>${question.content}</p>`
            container.append(p);
        }
    }

    form.script();
}

function doShit() {
    let responseService = new ResponseService();
    response.value = response.email;
    responseService.sendResponse(response);
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

    if (!response.isTreament) {
        startControl();
    } else {
        startTreatment();
    }
}

let theWheel;

function spinTheWheel() {
    console.log('spinningggg!');
    theWheel.startAnimation();
}

function startControl() {
    genericRender(forms[1]);
    let canvas = '<canvas id="canvas" width="880" height="450"> Canvas not supported, use another browser. </canvas>';
    $('#form-container').append(canvas);

    theWheel = new Winwheel({
        'outerRadius'     : 212,        // Set outer radius so wheel fits inside the background.
        'innerRadius'     : 75,         // Make wheel hollow so segments dont go all way to center.
        'textFontSize'    : 24,         // Set default font size for the segments.
        'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
        'textAlignment'   : 'outer',    // Align text to outside of wheel.
        'numSegments'     : 24,         // Specify number of segments.
        'segments'        :             // Define segments including colour and text.
        [                               // font size and text colour overridden on backrupt segments.
           {'fillStyle' : '#ee1c24', 'text' : '300'},
           {'fillStyle' : '#3cb878', 'text' : '450'},
           {'fillStyle' : '#f6989d', 'text' : '600'},
           {'fillStyle' : '#00aef0', 'text' : '750'},
           {'fillStyle' : '#f26522', 'text' : '500'},
           {'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
           {'fillStyle' : '#e70697', 'text' : '3000'},
           {'fillStyle' : '#fff200', 'text' : '600'},
           {'fillStyle' : '#f6989d', 'text' : '700'},
           {'fillStyle' : '#ee1c24', 'text' : '350'},
           {'fillStyle' : '#3cb878', 'text' : '500'},
           {'fillStyle' : '#f26522', 'text' : '800'},
           {'fillStyle' : '#a186be', 'text' : '300'},
           {'fillStyle' : '#fff200', 'text' : '400'},
           {'fillStyle' : '#00aef0', 'text' : '650'},
           {'fillStyle' : '#ee1c24', 'text' : '1000'},
           {'fillStyle' : '#f6989d', 'text' : '500'},
           {'fillStyle' : '#f26522', 'text' : '400'},
           {'fillStyle' : '#3cb878', 'text' : '900'},
           {'fillStyle' : '#000000', 'text' : 'BANKRUPT', 'textFontSize' : 16, 'textFillStyle' : '#ffffff'},
           {'fillStyle' : '#a186be', 'text' : '600'},
           {'fillStyle' : '#fff200', 'text' : '700'},
           {'fillStyle' : '#00aef0', 'text' : '800'},
           {'fillStyle' : '#ffffff', 'text' : 'LOOSE TURN', 'textFontSize' : 12}
        ],
        'animation' :           // Specify the animation to use.
        {
            'type'     : 'spinToStop',
            'duration' : 10,
            'spins'    : 3,
            'callbackFinished' : alertPrize,  // Function to call whent the spinning has stopped.
            'callbackSound'    : playSound,   // Called when the tick sound is to be played.
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

function startTreatment() {
    genericRender(forms[2]);
}

// This function is called when the sound is to be played.
function playSound()
{
    // Stop and rewind the sound if it already happens to be playing.
    // audio.pause();
    // audio.currentTime = 0;

    // // Play the sound.
    // audio.play();
}

// Called when the animation has finished.
function alertPrize(indicatedSegment)
{
    // Display different message if win/lose/backrupt.
    if (indicatedSegment.text == 'LOOSE TURN') {
        alert('Sorry but you loose a turn.');
    } else if (indicatedSegment.text == 'BANKRUPT') {
        alert('Oh no, you have gone BANKRUPT!');
    } else {
        alert("You have won " + indicatedSegment.text);
    }
}


render();

