// Function to open the modal
function openModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('hidden');
    showStep(1); // Start at step 1
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('hidden');
}

// Function to show a specific step
function showStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 === stepNumber) {
            step.classList.remove('hidden');
        } else {
            step.classList.add('hidden');
        }
    });
    updateProgress(stepNumber);
    validateStep(); // Re-validate to ensure Next button state is updated
}

// Function to validate the current step
function validateStep() {
    const currentStep = document.querySelector('.step:not(.hidden)');
    const inputs = currentStep.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        input.classList.remove('border-red-500'); // Remove red border for reset

        // Required field validation
        if (input.hasAttribute('required') && input.value.trim() === '') {
            input.classList.add('border-red-500'); // Apply red border to invalid input
            isValid = false;
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.classList.add('border-4 border-rose-500'); // Apply red border to invalid email
                isValid = false;
            }
        }

        // Phone validation (American format: 10 digits)
        if (input.id === 'phone' && input.value) {
            const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
            if (!phonePattern.test(input.value)) {
                input.classList.add('border-red-500'); // Apply red border to invalid phone
                isValid = false;
            }
        }

        // Postcode validation
        if (input.id === 'postcode' && input.value) {
            const allowedPostcodes = ["30040", "30022", "30328", "30060", "30066", "30114", "30096", "30519", "30518", "30062", "30305", "30319", "30005", "30041"];
            if (!allowedPostcodes.includes(input.value)) {
                input.classList.add('border-red-500'); // Apply red border to invalid postcode
                isValid = false;
            }
        }
    });

    const nextButton = currentStep.querySelector('.next-button');
    if (nextButton) {
        nextButton.disabled = !isValid;
    }

    return isValid;
}

// Function to go to the next step
function nextStep() {
    if (validateStep()) {
        const currentStep = document.querySelector('.step:not(.hidden)');
        const currentStepNumber = parseInt(currentStep.dataset.step);
        const totalSteps = document.querySelectorAll('.step').length;

        if (currentStepNumber < totalSteps) {
            showStep(currentStepNumber + 1);
        }
    }
}

// Function to go to the previous step
function prevStep() {
    const currentStep = document.querySelector('.step:not(.hidden)');
    const currentStepNumber = parseInt(currentStep.dataset.step);

    if (currentStepNumber > 1) {
        showStep(currentStepNumber - 1);
    }
}

// Function to update the progress indicator
function updateProgress(stepNumber) {
    const progressItems = document.querySelectorAll('.progress-item');
    progressItems.forEach((item, index) => {
        if (index < stepNumber) {
            item.classList.add('bg-orange');
        } else {
            item.classList.remove('bg-orange');
        }
    });
}

// Initialize flatpickr for the date input
document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#repair_date", {
        dateFormat: "Y-m-d",
        minDate: "today", // Disable all past dates
        allowInput: true // Allows manual date entry
    });
});

// Event listener to update available time options based on the selected date
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('open_booking_modal').addEventListener('click', openModal);
    document.getElementById('close_modal').addEventListener('click', closeModal);
    const dateInput = document.getElementById('repair_date');
    const timeSelect = document.getElementById('half_of_day');
    const today = new Date().toISOString().split('T')[0]; // Today's date

    dateInput.setAttribute('min', today);

    dateInput.addEventListener('change', updateAvailableTimes);

    function updateAvailableTimes() {
        const selectedDate = new Date(dateInput.value);
        const now = new Date();

        timeSelect.innerHTML = ''; // Clear existing options

        if (dateInput.value === today && now.getHours() >= 12) {
            addOption('afternoon', 'Afternoon');
            addOption('evening', 'Evening');
        } else {
            addOption('early_morning', 'Early Morning');
            addOption('morning', 'Morning');
            addOption('afternoon', 'Afternoon');
            addOption('evening', 'Evening');
        }
    }

    function addOption(value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        timeSelect.appendChild(option);
    }

    updateAvailableTimes(); // Initial call to set the correct options on page load
});

// Event listeners

document.querySelectorAll('.next-button').forEach(button => button.addEventListener('click', nextStep));
document.querySelectorAll('.prev-button').forEach(button => button.addEventListener('click', prevStep));
document.querySelectorAll('input, select, textarea').forEach(input => input.addEventListener('input', validateStep));
document.getElementById('repair_date').addEventListener('focus', function() {
    this.showPicker(); // Show the date picker on focus, supported in modern browsers
});

document.getElementById('postcode').addEventListener('input', function() {
    const zipCode = this.value;
    const cityInput = document.getElementById('city');

    if (zipToCityMap[zipCode]) {
        cityInput.value = zipToCityMap[zipCode];
    } else {
        cityInput.value = ''; // Clear city if ZIP code is not found
    }
});

const zipToCityMap = {
    "30040": "Cumming",
    "30022": "Alpharetta",
    "30328": "Sandy Springs",
    "30060": "Marietta",
    "30066": "Marietta",
    "30114": "Canton",
    "30096": "Duluth",
    "30519": "Buford",
    "30518": "Buford",
    "30062": "Marietta",
    "30305": "Atlanta",
    "30319": "Brookhaven",
    "30005": "Alpharetta",
    "30041": "Cumming",
    // Add more ZIP codes and cities as needed
};
