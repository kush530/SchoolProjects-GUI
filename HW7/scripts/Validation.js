  /*
 File: /~kbpatel1/HW7/scripts/Validation.js
 COMP.4060 Assignment 6: Multiplication Table Generator with Sliders and Tabs
 Kush Patel, UMass Lowell Computer Science, kbpatel1@cs.uml.edu
 Copyright (c) 2020 by Kush Patel. All rights reserved. May be
freely
 copied or excerpted for educational purposes with credit to the
author.
 updated by KP on November 25, 2020 at 10:00 PM

 Description: Multiplication Table Generator Validation Script
*/
  
  /* Added ErrorBox Highlighting using Bootstrap. Video from Code Cast was helpful here
  Source: https://www.youtube.com/watch?v=zQUbb2ZtdIc&t=152s */
  $.validator.setDefaults({
      highlight: function(element)
      {
          $(element)
            .closest('div')
            .addClass('has-error');
      },
      unhighlight: function(element)
      {
          $(element)
          .closest('div')
          .removeClass('has-error');
      },
  });
  
  /* Validation Method for comparing Min and Max Values. Returns True if Max is
  larger than Min, otherwise false. A post on StackOverflow by Sparky was helpful
  in learning how equalTo is implemented, as I opted to create a customized version of 
  equalTo, In order to validate the Max elements based on any changes made to Min and Max fields.
  Source: https://stackoverflow.com/questions/16938812/jquery-validation-call-equalto-method-from-a-custom-validation-method

  Also used the jQuery Validation Plugin Documentation to see how custom validation methods are implemented
  Source: https://jqueryvalidation.org/jQuery.validator.addMethod/ */
  $.validator.addMethod("MaxGreaterThanMin", function(value, element, param)
 {
    var target = $(param);

    if( this.settings.onfocusout || this.settings.onchange )
    {
        target.unbind(".validate-MaxGreaterThanMin2").bind("blur.validate-MaxGreaterThanMin2", function()
        {
            $(element).valid();
        })
    }
    return parseInt(value, 10)>= parseInt(target.val(), 10);
 }), "Minimum Must Be Less than Maximum";

 /* Checks if Min and Max values cover a range of numbers less than or equal to 1000, which is the max
 range that can be generated without freezing indefinetly. Used same approach as "MaxGreaterThanMin" Function. */
 $.validator.addMethod("InRange", function(value, element, param)
 {
    var target = $(param);

    if( this.settings.onfocusout )
    {
        target.unbind(".validate-MaxGreaterThanMin2").bind("blur.validate-MaxGreaterThanMin2", function()
        {
            $(element).valid();
        })
    }
    return Math.abs(parseInt(value, 10) - parseInt(target.val(), 10)) <= 1000;
 }), "Please Enter a range of numbers 1000 or less";

 /* Used video on jQuery Validation Plugin Documentation to set up Validation Rules/messages
 Source: https://jqueryvalidation.org/ */
$().ready(function()
{
    var validator = $("#tableInput").validate
    ({
        rules: 
        {
             minColValue: 
            {
                required: true,
            },
            maxColValue: 
            {
                required: true,
                MaxGreaterThanMin: "#minColValue",
                InRange: "#minColValue"
             },
            minRowValue:
            {
                required: true,
            },
            maxRowValue:
            {
                required: true,
                MaxGreaterThanMin: "#minRowValue",
                InRange: "#minRowValue"
            }
        },

        messages:
        {
            minColValue:
            {
                required:"Please Enter a Minimum Column Value"
            },

            maxColValue:
            {
                required:"Please Enter a Maximum Column Value",
                MaxGreaterThanMin: "Maximum must be Greater than or Equal To Minimum",
                InRange: "Please Enter a range of numbers 1000 or less"
            },

            minRowValue:
            {
                required:"Please Enter a Minimum Row Value"
            },

            maxRowValue:
            {
                required:"Please Enter a Maximum Row Value",
                MaxGreaterThanMin: "Maximum must be Greater than or Equal To Minimum",
                InRange: "Please Enter a range of numbers 1000 or less"
            }
        }
    })

    /* Read post by Sparky on StackOverflow to set up the submit button.
    Source: https://stackoverflow.com/questions/19511158/jquery-validation-is-not-working-during-button-click */
    $("#submitButton").click(function() 
    {
       if ($('#tableInput').valid()) 
       {
           createTable();
       }
   });

   /* On reset, clear form and reset sliders. Read post by Parrots on StackOverflow on how
   to remove errors from form
   Source: https://stackoverflow.com/questions/2086287/how-to-clear-jquery-validation-error-messages */
   $("#resetButton").click(function()
   {
       clearFields();
       validator.resetForm();
       resetSliders();
   });
 });