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