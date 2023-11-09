document.getElementById("suchicon").addEventListener("click", function() {
    Produktsuche();
});

document.getElementById("suchinhalt").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      Produktsuche();
    }
  });


// Event-Handler für das Absenden des Suchformulars
document.addEventListener('DOMContentLoaded', function () {
    // Das Suchformular wird erst gesucht, nachdem das DOM vollständig geladen ist
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
            searchForData(); // Ruft die Funktion zur Datensuche auf
        });
    }
});


function Produktsuche() {
    const suchwort = document.getElementById('suchinhalt').value;    
    const API = `https://dummyjson.com/products/search?q=${suchwort}`;    
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const suchergebnis = document.getElementById('resultate');
            suchergebnis.innerHTML = '';                         
            if (data.products.length > 0) {
                data.products.forEach(product => {
                    const produktElement = document.createElement('div');
                    produktElement.innerHTML = `
                        <h1>${product.title}</h1>
                        <h3><b>Preis</b>: ${product.price}€</h3>
                        <img class="thumbnail" src="${product.thumbnail}">         
                        <button id="detailButton" type="button" data-product-id="${product.id}" >Mehr Infos</button> 
                    `;
                    suchergebnis.appendChild(produktElement);
                });

                /////Hier ist der Event-Listener-Abschnitt für die Buttons/////
                const detailButtons = document.querySelectorAll("detailButton");
                detailButtons.forEach(button => {
                    button.addEventListener("click", function() {
                        const productId = button.getAttribute("data-product-id");
                        ProduktDetails(productId);
                    });
                });


            } else {                
                suchergebnis.innerHTML = 'Entschuldigung, das Produkt nach dem Sie suchen ist nicht vorhanden.';
            }
            const detailButtons = document.querySelectorAll("detailButton");
                detailButtons.forEach(button => {
                    button.addEventListener("click", function() {
                        const productId = button.getAttribute("data-product-id");
                        ProduktDetails(productId);
                    });
                });
        })
        .catch(error => {
            console.error('Es tut uns Leid, ein Fehler ist aufgetreten.', error);
        });
}


function ProduktDetails(productId){
    console.log(productId);
    const API = `https://dummyjson.com/products/${productId}`; 
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const hauptinhalt = document.getElementsByClassName("details");
            const produktInfos = document.createElement('div');
            produktInfos.innerHTML = `
                <h1>${product.title}</h1>
                <p><b>Beschreibung</b>: ${data.description}</p>
            `;
            hauptinhalt.appendChild(produktInfos);
        })
        .catch(error => {
            console.error('Es tut uns Leid, ein Fehler ist aufgetreten.', error);
        });
}




const BurgerMenue = document.querySelector('.burgermenue')
const MenueIcon = document.querySelector('.burgermenue i')
const MenueDropdown = document.querySelector('.dropdownmenue')

BurgerMenue.onclick = function () {
    MenueDropdown.classList.toggle('open')
    const offen = MenueDropdown.classList.contains('open')

    MenueIcon.classList = offen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}

