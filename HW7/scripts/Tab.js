/*
 File: /~kbpatel1/HW7/scripts/Tab.js
 COMP.4060 Assignment 7: Multiplication Table Generator with Sliders and Tabs
 Kush Patel, UMass Lowell Computer Science, kbpatel1@cs.uml.edu
 Copyright (c) 2020 by Kush Patel. All rights reserved. May be
freely
 copied or excerpted for educational purposes with credit to the
author.
 updated by KP on November 25, 2020 at 10:00 PM

 Description: Javascript for Multiplication Table Tabs
*/

/*Used documentation on jqueryUI website to create dynamic tabs
Source: "https://jqueryui.com/tabs/#manipulation"*/

var tabcount = 0;
var latestTab = 0;

var tabName = "tab";
var tabTemplate = "<li><a href='#{href}'>input<input type='checkbox' class='closeBox' value='tab1'><span class='closeIcon ui-icon ui-icon-circle-close'></span></a></li>"

$().ready(function()
{
    $('#tabs').tabs(
      {
      }
    )

    /*Post by gaetanoM on StackOverflow helped in fixing an issue where checkboxes on tabs
    could not be checked. Post is centered around accordians but the same solution works for tabs
    Source:"https://stackoverflow.com/questions/39146671/accordion-check-box-jquery-and-html"*/
    $('#tabs').on("click", "input[type='checkbox']", function(e)
    {
      e.preventDefault();
      e.stopPropagation();

      setTimeout(function()
      {
        this.checked = !this.checked;
      }.bind(this),100)
    })

    /*Close tab on clicking close icon. Used jQuery Documentation to learn
    how to remove elements within a div. Post by "No Surpises" on StackOverflow
    helped in forcing index updates on tabs after delete operation. Post by Ken Herbert
    on StackOverflow was helpful in seeing how active tabs are changed in jQuery.
    Source:"https://api.jquery.com/empty/"
    Source:"https://stackoverflow.com/questions/1581751/removing-dynamic-jquery-ui-tabs"
    Source:"https://stackoverflow.com/questions/16157885/how-to-set-a-tab-active-in-jquery-ui-tab-on-page-load"*/
    $('#tabs').on("click", ".closeIcon", function()
    {
      var index = getSelectedTabIndex();
      var panelId = $(this).closest( "li" ).remove().attr( "aria-controls");

      $("#"+panelId).empty();
      $("#"+panelId).remove();
      $('tabs').tabs("refresh");
      
      tabcount = tabcount - 1;

      if(tabcount == 0)
      {
        $('#tableDiv').hide();
      }

      $('#tabs').tabs('destroy').tabs();
      latestTab = getLatestTabNumber();

      if(index == tabcount)
      {
        $('#tabs').tabs({active: index-1});
      }
      else if(index != 0)
      {
        $('#tabs').tabs({active: index});
      }
      else
      {
        $('#tabs').tabs({active: 0});
      }
    })

    /*Remove all tabs after hitting "Delete All" Button.
    jQuery documentation on .each() was helpful in learning how to iterate over the
    tabIDs collection using jQuery
    Source: "https://api.jquery.com/each/"*/
    $("#deleteAll").click(function()
    {
      var tabIDs = $('#tablist').find("input[type='checkbox']");
      var tablinks = $('#tablist').find("li").remove().attr( "aria-controls");

      tabIDs.each(function()
      {
        var id = $(this).val();
        $("#" + id).empty();
        $("#" + id).remove();
        $('#tabs').tabs("refresh");
        $('#tabs').tabs('destroy').tabs();

      });

      tabcount = 0;
      latestTab = 0;

      $('#tableDiv').hide();

    });

    /*Removes checked tabs. Post by maztt on StackOverflow was helpful in querying the checked elements
    Source: "https://stackoverflow.com/questions/2834350/get-checkbox-value-in-jquery"*/
    $("#deleteSelected").click(function()
    {
      var tabIDs = $('#tablist').find("input[type='checkbox']:checked");
      var tablinks2 = $('#tablist').find("input[type='checkbox']:checked").closest('li').remove().attr( "aria-controls");

      tabIDs.each(function()
      {
        var id = $(this).val();
        $("#" + id).empty();
        $("#" + id).remove();
        $('#tabs').tabs("refresh");
        $('#tabs').tabs('destroy').tabs();

      });

      tabcount = tabcount - tabIDs.length;

      if(tabcount == 0)
      {
        $('#tableDiv').hide();
      }

      latestTab = getLatestTabNumber();

      $('#tabs').tabs({active: tabcount-1});

    });
});

/*Creates and adds tabs after table generation is complete. W3Schools page on Javascript
String replace was helpful, along with eloquentjavascript page on regular expressions.
Source: "https://www.w3schools.com/jsref/jsref_replace.asp"
Source: "https://eloquentjavascript.net/09_regexp.html"*/
function addTabs(table)
{
  $('#tableDiv').show();
  
  tabcount = tabcount + 1;
  latestTab = latestTab + 1;

  var tab = "<div class=tableTab id='tab" + latestTab + "'>" + "</div>";
  var li = tabTemplate.replace(/#\{href\}/g, "#"+ tabName + latestTab);
  var li = li.replace(/(='tab)([0-9])(')/g, "=tab" + latestTab);
  var x = $(li).find('.closeBox');

  li = li.replace("input", "Table" + latestTab);

  $("#tabs").tabs().find("#tablist").append(li);
  $('#tabs').append(tab);

  document.getElementById("tab"+ latestTab).appendChild(table);

  $('#tabs').tabs("refresh");
  $('#tabs').tabs({active: latestTab-1});
}

/*Gets the number of the latest tab created. Used to keep tab numbers 
of newer tabs updated, regardless of which tabs are deleted. W3Schools page on
the String Match() function helped in learning to extract tab number from linked
checkbox value attribute.
Source: "https://www.w3schools.com/jsref/jsref_match.asp"*/
function getLatestTabNumber()
{
  var tabs = $('#tabs').find(".closeBox");

  if(tabs.length == 0)
  {
    return 0;
  }

  var latestTab = tabs.last().val();
  var indexString = latestTab.match(/\d+/);

  return parseInt(indexString, 10);

}

/*Gets index of active tab. Post by MeneerBij on StackOverflow was helpful here.
Source: "https://stackoverflow.com/questions/300078/jquery-ui-tabs-how-to-get-currently-selected-tab-index/12973370#12973370"*/
function getSelectedTabIndex()
{
  return $('#tabs').tabs('option', 'active');
}