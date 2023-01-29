// ********** Leaflet JS Map ***********
    // ***** Déclaration des variables *****
let map = L.map('map').setView([50.6359, 3.0712], 15);

let popUp = document.querySelector('#popup');
let closePopUp = document.querySelector('#place-icon');

    // ***** Déclaration des fonctions *****
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
).addTo(map);

        // *** Fermeture de la pop up contenant les infos du lieu ***
closePopUp.addEventListener('click', () => {
    popUp.style.visibility = "hidden";
})


//  ********** API ***********
    // ***** Déclaration des variables *****

const url = 'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone';

let saveButton = document.querySelector('#save-button');

    // ***** Déclaration des fonctions *****

fetch(url)
    .then((response) =>  {
        return response.json();
    })

    .then((response) => {
        const restaurants = response.records;

        for(let restaurant of restaurants) {
            let marker = L.marker(restaurant.fields.geolocalisation, {alt: restaurant.fields.title}).addTo(map);
            // *** Affichage de la pop up contenant les infos du lieu ***
            marker.addEventListener('click', () => {
                popUp.style.visibility = "visible";

                let title = document.getElementById('place-title');
                let adress = document.getElementById('place-adress');
                let description = document.getElementById('place-description');

                
                title.innerHTML = restaurant.fields.title;
                adress.innerHTML = "Adresse : " + restaurant.fields.contact;
                description.innerHTML = "Description : " + restaurant.fields.short_desc;    
                
            })
            
        }

        // *** Local storage : stockage des infos (titre, adresse, description) du lieu de restauration ***
        saveButton.addEventListener('click', () => {
            let storedRestaurants = JSON.parse(localStorage.getItem('storedRestaurants')) || [];

            let storedTitle = document.getElementById('place-title').innerHTML;
            let storedContact = document.getElementById('place-adress').innerHTML;
            let storedDescription = document.getElementById('place-description').innerHTML;

            let infos = {
                "title": storedTitle,
                "contact": storedContact,
                "description": storedDescription
            }
            
            storedRestaurants.push(infos);
            localStorage.setItem("storedRestaurants", JSON.stringify(storedRestaurants));
        })
    })

    .catch((error) => {
        alert("Une erreur s'est produite de type " + error + ". Veuillez contacter le responsable de votre service numérique.");
    })

    


