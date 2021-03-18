function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function formatPhoneNumber(phoneNumberString) {
    // Strip all non-digits
    // Use a regular expression. Match all non-digits \D
    // and replace with an empty string.
    let cleaned = phoneNumberString.replace(/\D/g, '');

    // Are we left with 10 digits? This will return them in
    // three groups. This: (\d{3}) grabs the first three digits \d
    // The 'match' variable is an array. First is the entire match
    // the next locations are each group, which are surrounded by
    // () in the parenthesis.
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    // Create a new Date object
    let resultDate = new Date(match[1], match[2], match[3]);
    return resultDate;
}

function updateTable() {
    let url = "api/name_list_get";
    $.getJSON(url, null, function(json_result) {
        $('#datatable tbody tr').remove();
        for (let i = 0; i < json_result.length; i++) {

            birthdayDate = getJSDateFromSQLDate(json_result[i].birthday);
            birthdayString = birthdayDate.toLocaleDateString();

            $('#datatable tbody').append('<tr><td>'
                + json_result[i].id +
                '</td><td>' + htmlSafe(json_result[i].firstName) + '</td>' + '<td>'
                + htmlSafe(json_result[i].lastName) + '</td><td>'
                + htmlSafe(json_result[i].emailAddress)
                + '</td>' + '<td>' + htmlSafe(formatPhoneNumber(json_result[i].phoneNumber))
                + '</td><td>'
                + htmlSafe(birthdayString) + '</td></tr>');
        }
        console.log("Done");
    });
}

updateTable();

function showDialogAdd() {
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#emailAddress').val("");
    $('#phoneNumber').val("");
    $('#birthday').val("")

    $('#myModal').modal('show');
}
// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);


function saveChanges() {
    // Create the regular expression
    let reg = /^[A-Za-z]{1,10}$/;
    let emailReg = /^\S+@\S+$/;
    let phoneReg = /^[0-9()-]+$/;
    let dateReg = /^\d{4}-\d{2}-\d{2}$/;
    let isValid = true;

    let firstName = $('#firstName').val();
    // Test the regular expression to see if there is a match
    if (reg.test(firstName)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#firstName').removeClass("is-invalid");
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#firstName').removeClass("is-valid");
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-invalid");
        isValid = false;
    }

    let lastName = $('#lastName').val();
    // Test the regular expression to see if there is a match
    if (reg.test(lastName)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#lastName').removeClass("is-invalid");
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#lastName').removeClass("is-valid");
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-invalid");
        isValid = false;
    }

    let emailAddress = $('#email').val();
    // Test the regular expression to see if there is a match
    if (emailReg.test(emailAddress)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#email').removeClass("is-invalid");
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#email').removeClass("is-valid");
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-invalid");
        isValid = false;
    }

    let phoneNumber = $('#phoneNumber').val();
    // Test the regular expression to see if there is a match
    if (phoneReg.test(phoneNumber)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#phoneNumber').removeClass("is-invalid");
        $('#phoneNumber').removeClass("is-valid");
        $('#phoneNumber').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#phoneNumber').removeClass("is-valid");
        $('#phoneNumber').removeClass("is-invalid");
        $('#phoneNumber').addClass("is-invalid");
        isValid = false;
    }

    let birthday = $('#birthday').val();
    // Test the regular expression to see if there is a match
    if (dateReg.test(birthday)) {
        // Set style for outline of form field
        // This is a VALID field
        $('#birthday').removeClass("is-invalid");
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-valid");
    } else {
        // This is an INVALID field
        $('#birthday').removeClass("is-valid");
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-invalid");
        isValid = false;
    }

    if (isValid) {
        let url = "api/name_list_edit";
        let dataToServer = {firstName: firstName,
                            lastName: lastName,
                            emailAddress: emailAddress,
                            phoneNumber: phoneNumber,
                            birthday: birthday};

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function (dataFromServer) {
                console.log(dataFromServer);
                updateTable();
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }
}
let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

function clearValidation() {
    $('#firstName').removeClass("is-invalid");
    $('#firstName').removeClass("is-valid");
    $('#lastName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");
    $('#emailAddress').removeClass("is-invalid");
    $('#emailAddress').removeClass("is-valid");
    $('#phoneNumber').removeClass("is-valid");
    $('#phoneNumber').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");
    $('#birthday').removeClass("is-invalid");
}

let closeButton = $('#closeButton');
closeButton.on("click", clearValidation);
