/*
 File: /~kbpatel1/HW5/scripts/MultApp.js
 COMP.4060 Assignment 5: Multiplication Table Generator
 Kush Patel, UMass Lowell Computer Science, kbpatel1@cs.uml.edu
 Copyright (c) 2020 by Kush Patel. All rights reserved. May be
freely
 copied or excerpted for educational purposes with credit to the
author.
 updated by KP on October 29, 2020 at 8:22 PM

 Description: Multiplication Table Generator Javascript
*/

//Object to contain parameters from table input form
var tableParams = {minCol:1, maxCol:1, minRow:1, maxRow:1};

// Called through the Submit button to get parameters from form and move on to creating the table itself
function createTable()
{
    //Remove existing table to keep tables from stacking
    removeTable();

    //Create a bootstrap table
    var table = document.createElement("table");
    table.setAttribute("id", "multTable");
    table.classList.add("table");
    table.classList.add("table-bordered");
    
    //Populate tableParams object with inputs from form
    tableParams.minCol = parseInt(document.getElementById("minColValue").value);
    tableParams.maxCol = parseInt(document.getElementById("maxColValue").value);
    tableParams.minRow = parseInt(document.getElementById("minRowValue").value);
    tableParams.maxRow = parseInt(document.getElementById("maxRowValue").value);

    //Begin table creation if inputs are valid
    if(validateInput())
    {
        drawTable(table);
    }
}

/*Medium Article by Chris Webb was helpful in creating HTML Table
using Javascript. 
Source: "https://medium.com/javascript-in-plain-english/building-html-tables-with-javascript-15c79a0055ff"*/
function drawTable(table)
{
    //Create head row for table
    const hrow = table.insertRow();
    hrow.insertCell(-1).outerHTML = `<th>  </th>`;

    //Populate head row of table
    for(var i = tableParams.minCol; i <= tableParams.maxCol; i++)
    {
        hrow.insertCell(-1).outerHTML = `<th>${i}</th>`;
    }

    //Populate remaining cells
    for(var i = tableParams.minRow; i <= tableParams.maxRow; i++)
    {
        //First element of Each row will be a head element
        var row = table.insertRow(-1);
        row.insertCell(-1).outerHTML = `<th>${i}</th>`;

        //Populate all other elements of row, with the product of the row and column indexes
        for(var j = tableParams.minCol; j<=tableParams.maxCol; j++)
        {
            row.insertCell(-1).outerHTML = `<td>${i*j}</td>`;
        }
    }

    //Place resulting table in Div created in HTML file
    document.getElementById("tableDiv").appendChild(table);
}

//Returns True if inputs are valid, false otherwise
function validateInput()
{
    var errorFlag = false;
    var error = ""
    var message = document.createElement('p');

    //Delete existing Error Message to prevent stale messages from persisting
    removeErrorMessage();

    //Set ID and Bootstrap classes for Error Message
    message.setAttribute("id","errorMessage");
    message.classList.add("text-danger");

    /*Compare Inputs only if they are valid numbers (See emptyCheck documentation for more details)
    Set errorFlag to true if range of numbers for rows and columns is greater than 1000 (such values will freeze the 
    page), and if minimum values are greater than or equal to maximum values.
    Add any errors that occur to the error message*/
    
    if(!emptyCheck())
    {
        if((tableParams.maxCol - tableParams.minCol) > 1000 || tableParams.maxRow - tableParams.minRow > 1000)
        {
            error += 'ERROR: Column and Value Ranges must be less than 1000';
            errorFlag = true;
        }
        if((tableParams.minCol >= tableParams.maxCol))
        {
            error += 'ERROR: Minimum Column Value cannot be Greater Than or Equal To Maximum Column Value <br>';
            errorFlag = true;
        }

        if((tableParams.minRow >= tableParams.maxRow))
        {
            error += 'ERROR: Minimum Row Value cannot be Greater Than or Equal to Maximum Row Value <br>';
            errorFlag = true;
        }
    }
    //If there are any invalid numbers output a general error message
    else if(emptyCheck())
    {
        error += 'ERROR: Please Enter Valid Numbers <br>';
        errorFlag = true;
    }

    /*If error flag is true add the error message to the error div in main HTML page, and return false. Otherwise
    return true*/

    if(errorFlag)
    {
        message.innerHTML = error;
        document.getElementById("errorDiv").appendChild(message);
        return false;
    }
    else
    {
        return true
    }
}

//Checks if table inputs are valid. If Inputs are empty or are NaN or e, return true. Otherwise return false.
function emptyCheck()
{
    if((tableParams.minRow == '') || (tableParams.maxRow == '') || (tableParams.minCol == '') || (tableParams.maxRow == ''))
    {
        return true;
    }
    else if(isNaN(tableParams.minRow) || isNaN(tableParams.maxRow) || isNaN(tableParams.minCol) ||  isNaN(tableParams.minCol))
    {
        return true;
    }
    else
    {
        return false;
    }
}

//Called by reset to clear Error Messages, table, and values in form
function clearFields()
{
    removeErrorMessage();
    removeTable();

    document.getElementById("minColValue").value = "";
    document.getElementById("maxColValue").value = "";

    document.getElementById("minRowValue").value = "";
    document.getElementById("maxRowValue").value = "";

}

//Deletes Error Message if it exists
function removeErrorMessage()
{
    var elem = document.getElementById("errorMessage");

    if(elem != null)
    {
        elem.remove();
    }
}

//Deletes Table if it exists
function removeTable()
{
    var elem = document.getElementById("multTable");
    
    if(elem != null)
    {
        elem.remove();
    }
}