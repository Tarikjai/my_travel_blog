 // Récupérer la liste des pays depuis l'API
 async function fetchCountries() {
    try {
        const response = await fetch('/api/countriesList/all'); // Mettez à jour l'URL
        const countries = await response.json();
        const selectElement = document.getElementById('country-select');

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name; // Assurez-vous que "name" est la bonne clé
            option.textContent = country.name; // Assurez-vous que "name" est la bonne clé
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

// Appeler la fonction pour charger les pays
fetchCountries();

document.addEventListener('DOMContentLoaded', function () {
    const countryInput = document.querySelector('input[name="name"]');

    countryInput.addEventListener('input', function () {
        const value = countryInput.value;
        // Transforme la première lettre en majuscule
        if (value.length > 0) {
            countryInput.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const capitalInput = document.querySelector('input[name="capital"]');

    capitalInput.addEventListener('input', function () {
        const value = capitalInput.value;
        // Transforme la première lettre en majuscule
        if (value.length > 0) {
            capitalInput.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
    });
});


const menuToggle = document.getElementById('menu-toggle');
const navbarNav = document.getElementById('navbarNav');

menuToggle.addEventListener('click', () => {
    navbarNav.classList.toggle('hidden');
});



document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    console.log('Form data:', Object.fromEntries(formData));
    this.submit();
});
