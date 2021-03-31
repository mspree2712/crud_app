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

function getJSDateFromSQLDate(date) {
    // Strip non-digits
    let cleaned = date.replace(/\D/g, '');
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
            birthdayDate = "";
            birthdayString = "";
            if("birthday" in json_result[i]) {
                birthdayDate = getJSDateFromSQLDate(json_result[i].birthday);
                birthdayString = birthdayDate.toLocaleDateString();
            }

            $('#datatable tbody').append('<tr><td>'
                + json_result[i].id
                + '</td><td>'
                + htmlSafe(json_result[i].firstName) + '</td>' + '<td>'
                + htmlSafe(json_result[i].lastName) + '</td><td>'
                + htmlSafe(json_result[i].emailAddress)
                + '</td>' + '<td>' + htmlSafe(formatPhoneNumber(json_result[i].phoneNumber))
                + '</td><td>'
                + htmlSafe(birthdayString)
                + '</td><td>'
                + '<button type=\'button\' name=\'delete\' class=\'deleteButton btn btn-danger\' value= \''+json_result[i].id +'\'>'
                + 'Delete'
                + '</button>'
                + '</td></tr>'
                );
        }
        console.log("before");
        $(".deleteButton").on("click", deleteItem);
        console.log("after");
    });
}
updateTable();

function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);

    let url = "api/name_list_delete";
    let dataToServer = {id: e.target.value};
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
    })
}

function showDialogAdd() {
    $('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#emailAddress').val("");
    $('#phoneNumber').val("");
    $('#birthday').val("")

    $('#myModal').modal('show');

    $('#myModal').on('shown.bs.modal', function(){$('#firstName').focus()})
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
    let firstField = $('#firstName');
    // Test the regular expression to see if there is a match
    if (reg.test(firstName)) {
        // Set style for outline of form field
        // This is a VALID field
        firstField.removeClass("is-invalid");
        firstField.removeClass("is-valid");
        firstField.addClass("is-valid");
    } else {
        // This is an INVALID field
        firstField.removeClass("is-valid");
        firstField.removeClass("is-invalid");
        firstField.addClass("is-invalid");
        isValid = false;
    }

    let lastName = $('#lastName').val();
    let secondField = $('#lastName');
    // Test the regular expression to see if there is a match
    if (reg.test(lastName)) {
        // Set style for outline of form field
        // This is a VALID field
        secondField.removeClass("is-invalid");
        secondField.removeClass("is-valid");
        secondField.addClass("is-valid");
    } else {
        // This is an INVALID field
        secondField.removeClass("is-valid");
        secondField.removeClass("is-invalid");
        secondField.addClass("is-invalid");
        isValid = false;
    }

    let emailAddress = $('#email').val();
    let thirdField = $('#email')
    // Test the regular expression to see if there is a match
    if (emailReg.test(emailAddress)) {
        // Set style for outline of form field
        // This is a VALID field
        thirdField.removeClass("is-invalid");
        thirdField.removeClass("is-valid");
        thirdField.addClass("is-valid");
    } else {
        // This is an INVALID field
        thirdField.removeClass("is-valid");
        thirdField.removeClass("is-invalid");
        thirdField.addClass("is-invalid");
        isValid = false;
    }

    let phoneNumber = $('#phoneNumber').val();
    let fourthField = $('#phoneNumber');
    // Test the regular expression to see if there is a match
    if (phoneReg.test(phoneNumber)) {
        // Set style for outline of form field
        // This is a VALID field
        fourthField.removeClass("is-invalid");
        fourthField.removeClass("is-valid");
        fourthField.addClass("is-valid");
    } else {
        // This is an INVALID field
        fourthField.removeClass("is-valid");
        fourthField.removeClass("is-invalid");
        fourthField.addClass("is-invalid");
        isValid = false;
    }

    let birthday = $('#birthday').val();
    let fifthField = $('#birthday');
    // Test the regular expression to see if there is a match
    if (dateReg.test(birthday)) {
        // Set style for outline of form field
        // This is a VALID field
        fifthField.removeClass("is-invalid");
        fifthField.removeClass("is-valid");
        fifthField.addClass("is-valid");
    } else {
        // This is an INVALID field
        fifthField.removeClass("is-valid");
        fifthField.removeClass("is-invalid");
        fifthField.addClass("is-invalid");
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
                $('#myModal').modal('hide');
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }
}
let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

function clearValidation() {
    let firstField = $('#firstName');
    let secondField = $('#lastName');
    let thirdField = $('#email');
    let fourthField = $('#phoneNumber');
    let fifthField = $('#birthday');
    firstField.removeClass("is-invalid");
    firstField.removeClass("is-valid");
    secondField.removeClass("is-invalid");
    secondField.removeClass("is-valid");
    thirdField.removeClass("is-invalid");
    thirdField.removeClass("is-valid");
    fourthField.removeClass("is-valid");
    fourthField.removeClass("is-invalid");
    fifthField.removeClass("is-valid");
    fifthField.removeClass("is-invalid");
}

let closeButton = $('#closeButton');
closeButton.on("click", clearValidation);

$(document).keydown(function(e) {
    console.log(e.keyCode);
    if(e.keyCode == 65 && !$('#myModal').is(':visible')){
        showDialogAdd();
    }
})

