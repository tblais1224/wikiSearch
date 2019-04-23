//creates a counter for the number or search results
var resultCounter = 0;
//creates empty user input string
var input = '';
//search button handler
function handleClick() {
  //sets users search as string input
  input = document.getElementById("input").value;
  //uses cors to allow access to wiki api using search term
  var url = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&limit=10&format=json`;
  //use axios to get api data
  axios.get(url).then(function(response) {
    //calls displayResults and send api data
    displayResults(response.data);
  });
}

function displayResults(myResults) {
  //map goes through each item
  //the second parameter is the index (iterate)
  var list = myResults[3].map(function(item, i) {
    //gathers title and snippet data, sets them as arrays
    var titles = myResults[1][i];
    var snippets = myResults[2][i];
    //creates a li for each search result and inserts the title with url link href and a paragraph for the snippet
    return `<li><a href=${item}>${titles}</a></li><p class="listPtags" id="${titles}Snippet">${snippets}</p><br>`;
  });
  //joins the list array into a string
  list = list.join("");
  //adds the html string to the empty ul
  document.getElementById("results").innerHTML = list;
  //sets search result count to 10
  resultCounter = 10;
  //checks if more item btn exists and if not it creates one
  if (document.getElementById("moreItemsBtn") === null) {
    var viewMore =
      '<button id="moreItemsBtn" onclick="moreItems()">View More</button>';
    document.getElementById("body").innerHTML += viewMore;
  }
}

//handler for the more items button
function moreItems() {
    //adds ten to the result counter each time moreitems is requested
  resultCounter += 10;
  //gets the api with new limit = old limit + 10
  var url = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&limit=${resultCounter}&format=json`;
  axios.get(url).then(function(response) {
    addResults(response.data);
  });
}

function addResults(myResults) {
    //empty list string for html tags
  var list = '';
  //loops through results starting at the old result counter (-10)
  //using the results the list string is concatinated with all the html list tags
  for (let i = resultCounter - 10; i < myResults[3].length; i++) {
    var titles = myResults[1][i];
    var snippets = myResults[2][i];
    var url = myResults[3][i];
    list += `<li><a href=${url}>${titles}</a></li><p class="listPtags" id="${titles}Snippet">${snippets}</p><br>`;
  }

  //this empties the results ul by setting the ul to myNode and removing all children
  var myNode = document.getElementById("results");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  //adds the list string to the ul results
  document.getElementById("results").innerHTML = list;
}

// https://en.wikipedia.org/w/api.php?action=opensearch&search=maddie&limit=10&namespace=0&format=json

//https://cors-anywhere.herokuapp.com/
