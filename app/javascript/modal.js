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
}

// Function to validate the current step
// Function to validate the current step
function validateStep() {
    const currentStep = document.querySelector('.step:not(.hidden)');
    const inputs = currentStep.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        const errorElement = input.nextElementSibling;

        // // Check for required fields
        // if (input.value.trim() === '') {
        //     errorElement.textContent = `${input.previousElementSibling.textContent} is required.`;
        //     isValid = false;
        // } else {
        //     errorElement.textContent = '';
        // }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                errorElement.textContent = 'Please enter a valid email address.';
                isValid = false;
            }
        }

        // Phone validation (American format: 10 digits, optionally with dashes, spaces, or parentheses)
        if (input.id === 'phone' && input.value) {
            const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
            if (!phonePattern.test(input.value)) {
                errorElement.textContent = 'Please enter a valid American phone number.';
                isValid = false;
            }
        }

        // Postcode validation (must be one of the specific allowed postcodes)
        if (input.id === 'postcode' && input.value) {
            const allowedPostcodes = ["30040", "30022", "30328", "30060", "30066", "30114", "30096", "30519", "30518", "30062", "30305", "30319", "30005", "30041"];
            if (!allowedPostcodes.includes(input.value)) {
                errorElement.textContent = "Sorry, we don't work in your area.";
                isValid = false;
            }
        }
    });

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

// Event listeners
document.getElementById('open_booking_modal').addEventListener('click', openModal);
document.getElementById('close_modal').addEventListener('click', closeModal);

const nextButtons = document.querySelectorAll('.next-button');
nextButtons.forEach(button => button.addEventListener('click', nextStep));

const prevButtons = document.querySelectorAll('.prev-button');
prevButtons.forEach(button => button.addEventListener('click', prevStep));
