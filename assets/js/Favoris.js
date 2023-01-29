//  ********** Favoris **********

// Génération d'un bloc avec les infos du lieu de restauration pour chaque restaurant enregisté en favoris
    // ***** Déclaration des varibales ******
let main = document.querySelector('.main-div');

    // ***** Déclaration des fonctions *****
let get = JSON.parse(localStorage.getItem('storedRestaurants'));
for (let i = 0; i < get.length; i++) {
    function e(){
        main.innerHTML += `
        <div class="place" id="favoris-infos">
            <img src="https://www.liberation.fr/resizer/AFNsXyTSOdtI1VTWn1WIStwm7JA=/1200x630/cloudfront-eu-central-1.images.arcpublishing.com/liberation/D2UPC3JI6BEHVDKL4ZPUAN7FPM.jpg" alt="photo d'illsutration" class="place-photo">
            <div class="place-infos" id="favoris-infos">
                <h2 id="favoris-title">${get[i].title}</h2>
                <p id="favoris-adress">${get[i].contact}</p>
                <p id="favoris-description">${get[i].description}</p>
            </div>
            <div class="place-buttons">
                <button class="btn" id="delete-button">
                    Supprimer
                </button>
            </div>
        </div>
        `;
    }
        
    e();
}

// en cliquant sur le bouton "supprimer" , suppression des infos sauvegardées du restaurant et le bloc contenant les infos du lieu de restauration
     // ***** Déclaration des varibales ******
let deleteButton = document.querySelector('#delete-button');
let favInfos = document.querySelector('#favoris-infos');
    // ***** Déclaration des fonctions *****
deleteButton.addEventListener('click', () => {
    favInfos.style.display = 'none';
    localStorage.removeItem(get[i]);
})
