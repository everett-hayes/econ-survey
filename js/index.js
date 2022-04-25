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
                label : 'Next',
            }
        ],
        script : () => {
            $('#Next').click(wrapFirstPage);
        }
    },
    {
        questions : [
            {
                type : 'button',
                label : 'SendRequest',
            }
        ],
        script : () => {
            $('#SendRequest').click(doShit);
        }
    },
    {
        questions : [

        ]
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
            let button = `<button id="${question.label}" type="button" onclick="${question.onclick}">${question.label}</button>`;
            container.append(button);
            $('#' + question.label).click(question.onclick);
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

    startSecondPage();
}

function startSecondPage() {
    genericRender(forms[1]);
}  

render();

