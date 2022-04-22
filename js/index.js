import { ResponseService } from './service/ResponseService.js';

let forms = [
    {
        questions : [
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
        }
    }

    form.script();
}

function doShit() {
    let responseService = new ResponseService();
    responseService.sendResponse({value : 'a test from the localhost'});
}

function wrapFirstPage() {

    if ($('#password-input').val() !== 'econ') {
        window.alert('That\'s not the correct password!');
        return;
    }

    response.email = $('#email-input').val();
    startSecondPage();
}

function startSecondPage() {
    genericRender(forms[1]);
}  

render();

