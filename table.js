/*
Created by: Preston Luie 01971155
Github account: PLuie88
11/26/24

Sources:
https://www.w3schools.com/jquery/jquery_ref_events.asp more directly https://www.w3schools.com/jquery/event_on.asp
https://jqueryvalidation.org/jQuery.validator.addMethod/
https://jqueryvalidation.org/validate/
https://jqueryvalidation.org/documentation/
https://api.jqueryui.com/tabs/
*/

var tabCount = 1;

const maxColumn = document.getElementById("maxC");
const minColumn = document.getElementById("minC");

const maxRow = document.getElementById("maxRow");
const minRow = document.getElementById("minRow");

const inputNumForm = document.getElementById("tableBounds");

const minCError = document.getElementById("minCSpan");
const maxCError = document.getElementById("maxCSpan");
const minRError = document.getElementById("minRSpan");
const maxRError = document.getElementById("maxRSpan");

$(document).ready(function () {

    $('#tabHoldTest').tabs(); //init tab

    $.validator.addMethod("checkMaxAndMin", function (value, element, params) {
        var maxCheck = parseInt(value); //cur value in max field
        var minCheck = parseInt($(params).val()); //value of minumum field which is passed into the method
        return maxCheck >= minCheck; //returns true if max is greater than or equal to min
    }, "Invalid: Maximum must be greater than or equal to minimum");
    $('#tableBounds').validate({
        rules: { //for each of the rules it makes it so that the minumum and maximum have to be within the bounds and an input is required
            minC: {
                required: true,
                min: -50,
                max: 50,
            },
            maxC: {
                required: true,
                min: -50,
                max: 50,
                checkMaxAndMin: "#minC"
            },
            minRow: {
                required: true,
                min: -50,
                max: 50,
            },
            maxRow: {
                required: true,
                min: -50,
                max: 50,
                checkMaxAndMin: "#minRow"
            }
        },

        messages: { //for each of the bounds it tells the user a helpful message to where their input went wrong
            minC: {
                required: "Please enter a value between -50 and 50",
                min: "Invalid: Please enter a value between -50 and 50",
                max: "Invalid: Please enter a value between -50 and 50"
            },
            maxC: {
                required: "Please enter a value between -50 and 50",
                min: "Invalid: Please enter a value between -50 and 50",
                max: "Invalid: Please enter a value between -50 and 50"
            },
            minRow: {
                required: "Please enter a value between -50 and 50",
                min: "Invalid: Please enter a value between -50 and 50",
                max: "Invalid: Please enter a value between -50 and 50"
            },
            maxRow: {
                required: "Please enter a value between -50 and 50",
                min: "Invalid: Please enter a value between -50 and 50",
                max: "Invalid: Please enter a value between -50 and 50"
            }
        },

        submitHandler: function (form) {
            subButtonClicked();
        }
    });


    /*updates the forms input fields by getting the value that the user has chosen via the slider and setting the input field to be of that value
    It then updates the table if the rules in the form are valid it calls editTable to display to the screen without inputing it to a tab
    */
    $('#minCSlider').slider({
        min: -50,
        max: 50,
        step: 1,
        animate: true,
        slide: function (event, cur) {
            $('#minC').val(cur.value);
            if ($('#tableBounds').valid()) {
                editTable();
            }

        }
    });
    $('#maxCSlider').slider({
        min: -50,
        max: 50,
        step: 1,
        animate: true,
        slide: function (event, cur) {
            $('#maxC').val(cur.value);
            if ($('#tableBounds').valid()) {
                editTable();
            }
        }
    });
    $('#minRSlider').slider({
        min: -50,
        max: 50,
        step: 1,
        animate: true,
        slide: function (event, cur) {
            $('#minRow').val(cur.value);
            if ($('#tableBounds').valid()) {
                editTable();
            }
        }
    });
    $('#maxRSlider').slider({
        min: -50,
        max: 50,
        step: 1,
        animate: true,
        slide: function (event, cur) {
            $('#maxRow').val(cur.value);
            if ($('#tableBounds').valid()) {
                editTable();
            }
        }
    });


    /*
    updates the sliders location by getting the input value and setting the slider value to be equal to it calls editTable 
    to display the table to the screen if valid without updating the tabs
    */
    $('#minC').on('input', function () {
        var valToUpdate = parseInt($(this).val());
        $('#minCSlider').slider('value', valToUpdate);
        if ($('#tableBounds').valid()) {
            editTable();
        }
    });

    $('#maxC').on('input', function () {
        var valToUpdate = parseInt($(this).val());
        $('#maxCSlider').slider('value', valToUpdate);
        if ($('#tableBounds').valid()) {
            editTable();
        }
    });

    $('#minRow').on('input', function () {
        var valToUpdate = parseInt($(this).val());
        $('#minRSlider').slider('value', valToUpdate);
        if ($('#tableBounds').valid()) {
            editTable();
        }
    });

    $('#maxRow').on('input', function () {
        var valToUpdate = parseInt($(this).val());
        $('#maxRSlider').slider('value', valToUpdate);
        if ($('#tableBounds').valid()) {
            editTable();
        }
    });

});


/*
This function is in response to the onclick submit method from the HTML file. In this function I gather all of the data input and clear the table from previous entry.
Since the values in the form have already been validated via Jquery validation I know that the table can be created safely. This function creates a table by first
creating a temporary table in which we will appened the multiplication results.First in the table I create the top left tile to be clear so that the table lines up
and append it to the top row which are all headers, I then apply this concept again for the rows allowing for an easier way to style the first tile in each row as well
as the top row. Next I add the appropritate values into their corresponding spot in each row which I then append to the table itself (values go into rows which then
goes into the table) after the valid bounds have been parsed through and all the rows completed and added to the temporary table. After the table is created and stored
in a holder for the temporary table I then work to create a corresponding tab. in the tab we add it to the unordered list and give it an approrpriate title. After adding
in the title for the tab we append the stored table to its place in its div from the list (div id is labeled with its corresponding tabCount (so is the title /
list item)). After the list item and div are updated accordingly I refresh the tabs to allow the user to properly interact with them.
 */

function subButtonClicked() {
    //gets values to integers (if applicable)
    const maxCValue = parseInt(maxColumn.value);
    const minCValue = parseInt(minColumn.value);
    const maxRValue = parseInt(maxRow.value);
    const minRValue = parseInt(minRow.value);

    //tablePlaceHolderFind.textContent = ""; //clears previous table (if any)


    //create temp variables
    const updateTable = document.createElement("table");
    const tempRow = document.createElement("tr");

    const topLeftFiller = document.createElement("th");
    tempRow.appendChild(topLeftFiller);

    //header for top (horizontal)
    for (var k = minCValue; k <= maxCValue; k++) {
        const tCell = document.createElement("th");
        tCell.textContent = k;
        tempRow.appendChild(tCell);
    }
    updateTable.appendChild(tempRow);


    //fill in rest of table putting values into the row and then appending the row to the table
    for (var j = minRValue; j <= maxRValue; j++) {
        const createdRows = document.createElement("tr");
        const rowHeader = document.createElement("th");
        rowHeader.textContent = j; //set first item in each row to be a header
        createdRows.appendChild(rowHeader);
        for (var i = minCValue; i <= maxCValue; i++) {
            const nCell = document.createElement("td");
            nCell.textContent = i * j;
            createdRows.appendChild(nCell);
        }
        updateTable.appendChild(createdRows); //udpate table with filled in row w/ values
    }

    //keeps track of the tab via its place in the tab count
    const tabTitle = $('<li><a href="#' + tabCount + '">' + 'Tab-' + tabCount + '</a></li>');
    $('#tabHoldTest ul').append(tabTitle);

    //adds updated table into the tab
    const tabTable = $('<div id="' + tabCount + '"></div>');
    tabTable.append(updateTable);
    $('#tabHoldTest').append(tabTable);

    tabCount++;
    //allows tab to be seen and interacted with
    $('#tabHoldTest').tabs("refresh");
};


/*
This function allows the table to be dynamically updated onto the screen without saving it into the tab. The body of this function creates a table in the same manner
as the subButtonClicked() function with the only differnce being that in this function the table is only added to the screen and not the tabs.

This function creates a table by first creating a temporary table in which we will appened the multiplication results.First in the table I create the top left tile to 
be clear so that the table lines up and append it to the top row which are all headers, I then apply this concept again for the rows allowing for an easier way to
style the first tile in each row as well as the top row. Next I add the appropritate values into their corresponding spot in each row which I then append to the table
itself (values go into rows which then goes into the table) after the valid bounds have been parsed through and all the rows completed and added to the
temporary table, I then append the temporary table to the tablePlaceHodlerFind which then applies my updated table to the html place holder
giving the final product of a correct table which is output to the screen.
*/
function editTable() {

    const tablePlaceHolderFind = document.getElementById("tableHolder");

    //gets values to integers (if applicable)
    const maxCValue = parseInt(maxColumn.value);
    const minCValue = parseInt(minColumn.value);
    const maxRValue = parseInt(maxRow.value);
    const minRValue = parseInt(minRow.value);

    tablePlaceHolderFind.textContent = ""; //clears previous table (if any)


    //create temp variables
    const updateTable = document.createElement("table");
    const tempRow = document.createElement("tr");

    const topLeftFiller = document.createElement("th");
    tempRow.appendChild(topLeftFiller);

    //header for top (horizontal)
    for (var k = minCValue; k <= maxCValue; k++) {
        const tCell = document.createElement("th");
        tCell.textContent = k;
        tempRow.appendChild(tCell);
    }
    updateTable.appendChild(tempRow);


    //fill in rest of table putting values into the row and then appending the row to the table
    for (var j = minRValue; j <= maxRValue; j++) {
        const createdRows = document.createElement("tr");
        const rowHeader = document.createElement("th");
        rowHeader.textContent = j; //set first item in each row to be a header
        createdRows.appendChild(rowHeader);
        for (var i = minCValue; i <= maxCValue; i++) {
            const nCell = document.createElement("td");
            nCell.textContent = i * j;
            createdRows.appendChild(nCell);
        }
        updateTable.appendChild(createdRows); //udpate table with filled in row w/ values
    }
    tablePlaceHolderFind.appendChild(updateTable); //updates holder with completed table
};