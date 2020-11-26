/*
 File: /~kbpatel1/HW6/scripts/MultApp.js
 COMP.4060 Assignment 6: Multiplication Table Generator Validation
 Kush Patel, UMass Lowell Computer Science, kbpatel1@cs.uml.edu
 Copyright (c) 2020 by Kush Patel. All rights reserved. May be
freely
 copied or excerpted for educational purposes with credit to the
author.
 updated by KP on November 25, 2020 at 10:00 PM

 Description: Multiplication Table Generator Javascript
*/

//Object to contain parameters from table input form
var tableParams = {minCol:1, maxCol:1, minRow:1, maxRow:1};

// Called through the Submit button to get parameters from form and move on to creating the table itself
function createTable()
{
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
    var displayTable = drawTable(table);

    addTabs(displayTable);
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
    return table;
}

//Called by reset to clear Error Messages, table, and values in form
function clearFields()
{
    document.getElementById("minColValue").value = "0";
    document.getElementById("maxColValue").value = "0";

    document.getElementById("minRowValue").value = "0";
    document.getElementById("maxRowValue").value = "0";
}