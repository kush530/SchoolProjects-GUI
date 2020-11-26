/*
 File: /~kbpatel1/HW7/scripts/Slider.js
 COMP.4060 Assignment 7: Multiplication Table Generator with Sliders and Tabs
 Kush Patel, UMass Lowell Computer Science, kbpatel1@cs.uml.edu
 Copyright (c) 2020 by Kush Patel. All rights reserved. May be
freely
 copied or excerpted for educational purposes with credit to the
author.
 updated by KP on November 25, 2020 at 10:00 PM

 Description: Javascript for Multiplication Table Sliders. Range is from
 -500 to 500, but custom values outside this range can be entered,
 as long as the range covers 1000 numbers at most.
*/

/*Video by Kudvenkat was helpful in creating jQuery sliders
Source: "https://www.youtube.com/watch?v=reNLCuaxFF8&t=350s"*/

$().ready(function ()
{
    $('.slider').slider(
    {
        min:-500,
        max:500,
        slide: function (event, ui)
        {
            var formBox = $(this).closest('.col-sm-3').prev().find('input');

            formBox.val(ui.value);

            $('#tableInput').valid();
        }

    })

    /*Post by Constantinius on StackOverflow was helpful in learning how to change slider based on
    input in form
    Source:"https://stackoverflow.com/questions/12795307/jquery-ui-slider-change-value-of-slider-when-changed-in-input-field"*/
    $("#minColValue").change(function()
    {
        var slider1 = $(this);
        updateSlider($(this));
    })
    $("#maxColValue").change(function()
    {
        updateSlider($(this));
    })
    $("#minRowValue").change(function()
    {
        updateSlider($(this));
    })
    $("#maxRowValue").change(function()
    {
        updateSlider($(this));
    })

    /*Updates slider following input object*/
    function updateSlider(thisObj)
    {
        var slider1 = thisObj.parent().next();

        slider1.slider("value", thisObj.val());
    }
})

/*Resets all sliders to value 0 when reset button is clicked*/
function resetSliders()
{
    var sliders = $('.slider');

    sliders.each(function()
    {
        $(this).slider("value", 0);
    })
}