
var animalData;
fetch('https://cgi-osd-kodtest-default-rtdb.europe-west1.firebasedatabase.app/animals.json')
    .then(response => response.json())
    .then(data => { animalData = data; CreateTableFromJSON(); });


function CreateTableFromJSON() {
    var col = [];
    for (var i = 0; i < animalData.length; i++) {
        for (var key in animalData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {  // BUGG1 första kolumen saknas, den för bilder
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < animalData.length; i++) {
        tr = table.insertRow(-1);
        getImage(animalData[i].name);
        var tabCell = tr.insertCell(-1);
        tabCell.appendChild(getImage(animalData[i].name));


        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = animalData[i][col[j]] ?? '';
        }
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}


function getImage(name) {
    var img = document.createElement("img");
    img.setAttribute('src', './assets/' + name + '.png');
    img.setAttribute('height', '100px');
    return img;
}