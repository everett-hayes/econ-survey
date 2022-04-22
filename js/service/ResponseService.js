export class ResponseService {

    constructor() {
        this.baseURL = 'https://tester-e4e0.restdb.io/rest/tester';
        this.apiKey = '62604f4afcf9897eb1119da9'; // security :P
    }

    getResponses() {
        return fetch(this.baseURL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'x-apikey': this.apiKey,
            },
        }).then(response => response.json())
        .then(data => {
            // console.log(JSON.stringify(data, null, 2));
            return data;
        })
        .catch(error => console.warn(error));
    }

    sendResponse(response) {
        console.log('sending');
        console.log(JSON.stringify(response));
        return fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-apikey': this.apiKey
            },
            body: JSON.stringify(response),
        }).then(response => response.json())
        .then( data => {
            console.log(JSON.stringify(data, null, 2));
        })
        .catch(error => console.warn(error));
    }
}
