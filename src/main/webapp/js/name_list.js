function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function updateTable() {
    let url = "api/name_list_get";
    $.getJSON(url, null, function(json_result) {
        $('#datatable tr:last').remove()
        for (let i = 0; i < json_result.length; i++) {
            $('#datatable tr:last').after('<tr><td>'
                + json_result[i].id +
                '</td><td>' + htmlSafe(json_result[i].first) + '</td>' + '<td>'
                + htmlSafe(json_result[i].last) + '</td><td>'
                + htmlSafe(json_result[i].email)
                + '</td>' + '<td>' + htmlSafe(json_result[i].phone)
                + '</td><td>'
                + htmlSafe(json_result[i].birthday) + '</td></tr>');
        }
        console.log("Done");
    });
}

updateTable();