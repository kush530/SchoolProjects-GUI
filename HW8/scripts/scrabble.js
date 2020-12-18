/*
 File: /~kbpatel1/HW8/scripts/scrabble.js
 COMP.4060 Assignment 8: Scrabble
 Kush Patel, UMass Lowell Computer Science, kbpatel1@cs.uml.edu
 Copyright (c) 2020 by Kush Patel. All rights reserved. May be
freely
 copied or excerpted for educational purposes with credit to the
author.
 updated by KP on December 17, 2020 at 11:59 PM

 Description: Javascript/JQuery for scrabble game
*/
var firstDropFlag = true;
var score = 0;
var totalScore = 0;
var lettersLeft = 91;
var lettersInRack = 0;
var letterData =
    [
	{"letter":"A", "value":1, "amount":9},
	{"letter":"B", "value":3, "amount":2},
	{"letter":"C", "value":3, "amount":2},
	{"letter":"D", "value":2, "amount":4},
	{"letter":"E", "value":1, "amount":12},
	{"letter":"F", "value":4, "amount":2},
	{"letter":"G", "value":2, "amount":3},
	{"letter":"H", "value":4, "amount":2},
	{"letter":"I", "value":1, "amount":9},
	{"letter":"J", "value":8, "amount":1},
	{"letter":"K", "value":5, "amount":1},
	{"letter":"L", "value":1, "amount":4},
	{"letter":"M", "value":3, "amount":2},
	{"letter":"N", "value":1, "amount":5},
	{"letter":"O", "value":1, "amount":8},
	{"letter":"P", "value":3, "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1, "amount":6},
	{"letter":"S", "value":1, "amount":4},
	{"letter":"T", "value":1, "amount":6},
	{"letter":"U", "value":1, "amount":4},
	{"letter":"V", "value":4, "amount":2},
	{"letter":"W", "value":4, "amount":2},
	{"letter":"X", "value":8, "amount":1},
	{"letter":"Y", "value":4, "amount":2},
	{"letter":"Z", "value":10, "amount":1}
];

$().ready(function()
{
   $( init );
});

/*Sets defaults for the game, prepares game board, and sets up rack with letters
Post by user113716 on Stack Overflow was helpful in replacing the numbers in the score/lettersleft headings
Source: https://stackoverflow.com/questions/3378300/replacing-a-number-in-a-string-with-jquery*/
function init()
{
    totalScore = 0;
    lettersLeft = 91;
    lettersInRack = 0;
    score = 0;
    totalScore = 0;
    firstDropFlag = true;

    $('#winMessage').hide();
    $('#score').text(function(i,txt){return txt.replace(/\d+/, score.toString())});
    $('#lettersLeft').text(function(i,txt){return txt.replace(/\d+/, lettersLeft.toString())});
    $('#totalScore').text(function(i,txt){return txt.replace(/\d+/, totalScore.toString())});
    
    setLetterData();

    $('#rack').html('');

    $('#rack').droppable(
        {
            drop:handleDropInRack,
            out:handleDropOutRack
        }
    );

    setBoard();
    generateLetters();
}

/*Locks letters when dropped, and sets enabled tiles to be 
tiles adjacent to the drop. Word Score is updated*/
function handleCardDrop(event, ui)
{
    var letterIndex = ui.draggable.attr('id');

    ui.draggable.draggable( 'disable' );
    $(this).droppable('disable');
    ui.draggable.position({ of: $(this), my: 'left top', at: 'left top'});
    ui.draggable.draggable('option', 'revert', false);

    if(firstDropFlag)
    {
        $('#dropSlots .ui-droppable').droppable('option', 'revert', true);
        $('#dropSlots .ui-droppable').droppable('disable');
        firstDropFlag = false;
    }

    $(this).prev().droppable('enable');
    $(this).prev().droppable('option', 'revert', false);
    $(this).next().droppable('enable');
    $(this).next().droppable('option', 'revert', false);

    if($(this).hasClass("doubleTile"))
    {
        score = score = score + (letterData[parseInt(letterIndex)].value * 2);
    }
    else
    {
        score = score + letterData[parseInt(letterIndex)].value;
    }

    $('#score').text(function(i,txt){return txt.replace(/\d+/, score.toString())});

    lettersInRack = lettersInRack - 1;

    if(letterData[letterIndex].amount === 0)
    {
        letterData.splice(letterIndex, 1);
    }
}

//Allows for letters to be moved in rack
function handleDropInRack(event, ui)
{
    ui.draggable.draggable('option', 'revert', false);
}

//Returns letters to rack if dropped outside of rack, and not on the board.
function handleDropOutRack(event, ui)
{
    ui.draggable.draggable('option', 'revert', true);
}

/*Submitted word is removed, total score is updated, and new letters are added to the rack
to replace the used letters*/
function submitWord()
{
    if(lettersInRack == 7)
    {
        return;
    }
    setBoard();
    totalScore = totalScore + score;
    $('#totalScore').text(function(i,txt){return txt.replace(/\d+/, totalScore.toString())});

    score = 0;
    $('#score').text(function(i,txt){return txt.replace(/\d+/, score.toString())});
    

    var lettersNeeded = 7 - lettersInRack;
    lettersLeft = lettersLeft - lettersNeeded;

    if(lettersLeft === 0)
    {
        $('#winMessage').show();
        return;
    }

    $('#lettersLeft').text(function(i,txt){return txt.replace(/\d+/, lettersLeft.toString())});

    generateLetters();
}

//Clears board of letter tiles and recreates the board
function setBoard()
{
    $('.ui-draggable-disabled').remove();
    $('#dropSlots').html('');

    for(var i = 1; i <= 7; i++)
    {
        var tileClass = "defaultTile";

        if(i == 2 || i == 6)
        {
            tileClass = "doubleTile";
        }

        $('<div></div>').addClass(tileClass).appendTo('#dropSlots').droppable(
            {
                accept: '#rack div',
                drop: handleCardDrop,
            }
        );
    }
}

//Creates the individual letter tiles
function generateLetters()
{
    for(var i = 0; i < 7; i++)
    {
        var NumOfLetters = letterData.length - 1;
        var letterIndex = getRandom(0, NumOfLetters);

        /*Generate other letters if number of this letter is 0
        Letters removed only after submitting word for indexing purposes*/
        while(letterData[letterIndex].amount === 0)
        {
            letterIndex = getRandom(0, NumOfLetters);
        }

        $('<div>'+ '<img class = letter src=images/Scrabble_Tiles/Scrabble_Tile_' + letterData[letterIndex].letter.toString() + '.jpg'+ '>' + '</div>').attr('id', letterIndex.toString()).appendTo('#rack').draggable(
            {
                containment:'#content',
                stack: '#rack div',
                cursor: 'move',
                revert: true
            }
        );

        lettersInRack = lettersInRack + 1;
        letterData[letterIndex].amount = letterData[letterIndex].amount - 1;
    }
}

/*Mozilla page was helpful in learning how to implement Random function that only outputs
integers over a given range
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random*/
function getRandom(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Resets letter data structure after reset button is hit
function setLetterData()
{
    letterData =
    [
	{"letter":"A", "value":1, "amount":9},
	{"letter":"B", "value":3, "amount":2},
	{"letter":"C", "value":3, "amount":2},
	{"letter":"D", "value":2, "amount":4},
	{"letter":"E", "value":1, "amount":12},
	{"letter":"F", "value":4, "amount":2},
	{"letter":"G", "value":2, "amount":3},
	{"letter":"H", "value":4, "amount":2},
	{"letter":"I", "value":1, "amount":9},
	{"letter":"J", "value":8, "amount":1},
	{"letter":"K", "value":5, "amount":1},
	{"letter":"L", "value":1, "amount":4},
	{"letter":"M", "value":3, "amount":2},
	{"letter":"N", "value":1, "amount":5},
	{"letter":"O", "value":1, "amount":8},
	{"letter":"P", "value":3, "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1, "amount":6},
	{"letter":"S", "value":1, "amount":4},
	{"letter":"T", "value":1, "amount":6},
	{"letter":"U", "value":1, "amount":4},
	{"letter":"V", "value":4, "amount":2},
	{"letter":"W", "value":4, "amount":2},
	{"letter":"X", "value":8, "amount":1},
	{"letter":"Y", "value":4, "amount":2},
	{"letter":"Z", "value":10, "amount":1}
];
}