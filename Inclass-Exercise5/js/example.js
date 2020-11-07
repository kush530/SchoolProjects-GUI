var itemList = document.querySelector('#page ul');

// ADD NEW ITEM TO END OF LIST
var newItem1 = document.createElement('li');

newItem1.textContent = "cream";
itemList.appendChild(newItem1);

// ADD NEW ITEM START OF LIST
var newItem2 = document.createElement('li');

newItem2.textContent= "kale";
itemList.insertBefore(newItem2, itemList.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS

var listItems = itemList.querySelectorAll('li');

for (var i=0; i < listItems.length; i++) 
{
    listItems[i].classList.add('cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var heading = document.querySelector('header, h2');
var counter = document.createElement('span');

counter.textContent = listItems.length;
heading.appendChild(counter);

