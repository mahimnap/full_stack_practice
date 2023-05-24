document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault(); //prevents defaulting to action or current url if not set
    
    const formData = new FormData(this); //associates all input names to their values in key-value pairs

    const urlencodedData = new URLSearchParams(formData).toString(); //converts these key-value pairs into url encoding

    console.log(urlencodedData); 

    fetch(this.action, {
        method: this.method, 
        headers: { //MUST SET THIS TO ENSURE DATA IS ENCODED CORRECTLY
            'Content-Type': 'application/x-www-form-urlencoded' //html only sets it for itself, not for the intercepting java code
        }, 
        body: urlencodedData
    })
    .then(response => response.json()) //parses response body as a JSON
    .then(data => {
        console.log('Response: ', data); 
        console.log('Username: ', data.username); 
        console.log('Password: ', data.password);
        console.log('Message: ', data.message);
    });
});

document.getElementById('charForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const formData = new FormData(this); 
    const jsonData = {}; //formData cannot be directly converted into json through JSON methods

    //therefore, interate over entire form data and build a basic js object 
    //a js object can then be converted to json through JSON 

    for (let [key, value] of formData.entries()) {
        jsonData[key] = value; //regular 
    }

    fetch(this.action, {
        method: this.method, 
        headers: {
            'Content-Type': this.enctype
        },
        body: JSON.stringify(jsonData) //stringify turns JS object into JSON string rep. - JSON.parse() converts back
    })
    .then(response => response.json()) 
    .then(data => {
        console.log('Response: ', data);
        console.log ('Height: ', data.heightInches); 
        console.log ('Weight: ', weightLbs); 
        console.log('Message: ', data.message); 
    });
});

document.getElementById('bookRateForm').addEventListener('submit', function(e) {
    e.defaultPrevented(); 
    const formData = new FormData(this); 
    const xmlString = formToXmlString(formData); 
    fetch('/rateBook', {
        method: this.method, 
        headers: {
            'Content-Type': this.enctype,
        },
        body: xmlString
    })
    .then (response => response.text())
    .then (data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error); 
    });
});

function formToXmlString(formData) {
    let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlString += '<book>\n';

    for (const [name, value] of formData) {
        xmlString += `  <${name}>${value}</${name}>\n`; //<name> value </name> 
    }

    xmlString += '</book>';

    return xmlString;
}
