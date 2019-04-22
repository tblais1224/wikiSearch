function handleClick() {
    var input = document.getElementById('input').value;
    console.log(input);
    var url = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&limit=10&format=json`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            displayResults(response);
        });
};

function displayResults(myResults) {
    //map goes through each item
    //the second parameter is the index (iterate)
    var list = myResults[3].map(function (item, i) {
        //li is list item
        var titles = myResults[1][i];
        var snippets = myResults[2][i];
        return `<li><a href=${item}>${titles}</a></li><p class="listPtags" id="${titles}Snippet">${snippets}</p><br>`
    });
    list = list.join("");
    document.getElementById("results").innerHTML = list;
};



// https://en.wikipedia.org/w/api.php?action=opensearch&search=maddie&limit=10&namespace=0&format=json

//https://cors-anywhere.herokuapp.com/