import { Controller } from "@hotwired/stimulus"
import Flatpickr from 'stimulus-flatpickr'



export default class extends Controller {
  static targets = ["modal", "nextButton", "prevButton", "submitButton", "zipCode", "city", "dateInput", "timeSelect"]


  connect() {
    console.log("Booking controller connected")
    this.step = 1;
    this.updateStep();
    this.initializeZipToCityAjax();
    this.initializeDatePicker()
    this.updateAvailableTimes()
  }

  initializeZipToCityAjax() {
    this.zipCodeTarget.addEventListener("input", () => {
      const zipCode = this.zipCodeTarget.value;

      fetch(`/zip_to_city?zip_code=${zipCode}`)
          .then(response => response.json())
          .then(data => {
            this.cityTarget.value = data.city || ""; // Update the city field
          })
          .catch(error => console.error("Error fetching city:", error));
    });
  }
  initializeDatePicker() {
    flatpickr(this.dateInputTarget, {
      dateFormat: "Y-m-d",
      minDate: "today", // Disable all past dates
      defaultDate: "today", // Prefill with today's date
      onChange: this.updateAvailableTimes.bind(this) // Update times when date changes
    });
  }

  updateAvailableTimes() {
    const selectedDate = new Date(this.dateInputTarget.value)
    const today = new Date()
    const isToday = selectedDate.toDateString() === today.toDateString()

    // Clear existing options in time select
    this.timeSelectTarget.innerHTML = ''

    // Define time slots
    const timeSlots = [
      { value: "early_morning", label: "Early Morning", startHour: 6, endHour: 9 },
      { value: "morning", label: "Morning", startHour: 9, endHour: 12 },
      { value: "afternoon", label: "Afternoon", startHour: 13, endHour: 16 },
      { value: "evening", label: "Evening", startHour: 17, endHour: 20 }
    ]

    // Add time slots based on the selected date
    timeSlots.forEach(slot => {
      if (!isToday || today.getHours() < slot.startHour - 1) { // Check if slot is available
        this.addOption(slot.value, slot.label)
      }
    })

    // If no options are available today, move to the next day and update again
    if (this.timeSelectTarget.options.length === 0) {
      selectedDate.setDate(selectedDate.getDate() + 1)
      this.dateInputTarget._flatpickr.setDate(selectedDate)
      this.updateAvailableTimes() // Update times for the new date
    }
  }

  addOption(value, text) {
    const option = document.createElement("option")
    option.value = value
    option.textContent = text
    this.timeSelectTarget.appendChild(option)
  }
  openModal() {
    console.log("Attempting to open modal");
    if (this.modalTarget) {
      console.log("Modal target found");
      this.modalTarget.classList.remove("hidden");
    } else {
      console.error("Modal target not found");
    }
  }

  closeModal() {
    if (this.hasModalTarget) {
      this.modalTarget.classList.add("hidden");
    }
  }

  nextStep(event) {
    event.preventDefault();
    if (this.validateStep()) {
      this.step += 1;
      this.updateStep();
    }
  }

  prevStep(event) {
    event.preventDefault();
    if (this.step > 1) {
      this.step -= 1;
      this.updateStep();
    }
  }

  updateStep() {
    console.log("Updating step")
    const steps = this.element.querySelectorAll('.step');
    steps.forEach((step, index) => {
      step.classList.toggle('hidden', index + 1 !== this.step);
    });

    // Show submit button only on the last step
    this.submitButtonTarget.classList.toggle('hidden', this.step < steps.length);
    this.nextButtonTarget.classList.toggle('hidden', this.step === steps.length);
    this.updateProgress(this.step);
  }

  validateStep() {
    const currentStep = this.element.querySelector(`.step[data-step="${this.step}"]`);
    let isValid = true;

    currentStep.querySelectorAll('input, select, textarea').forEach(input => {
      input.classList.remove("border-red-500");

      if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add("border-red-500"); // Add red border for invalid input
        isValid = false;
      }
    });

    return isValid;
  }
  showNotification(message) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notificationMessage");

    notificationMessage.textContent = message;
    notification.classList.remove("hidden");

    // Hide after 5 seconds
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 5000);
  }


  handleSubmit(event) {
    event.preventDefault();
    const form = this.element.querySelector("form");
    const formData = new FormData(form);

    // Get CSRF token from the meta tag
    const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    fetch("/bookings", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      body: formData
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.closeModal();
            this.showNotification("Booking created successfully! Our team will contact you shortly.");
          } else {
            this.showNotification("An error occurred: " + data.errors.join(", "));
          }
        })
        .catch(error => {
          this.showNotification("An error occurred. Please try again.");
          console.error("Error:", error);
        });
  }
  updateProgress(stepNumber) {
    const progressItems = this.element.querySelectorAll('.progress-item');
    const totalSteps = progressItems.length;

    // Update step indicators
    progressItems.forEach((item, index) => {
      if (index < stepNumber) {
        item.classList.add('bg-orange');
      } else {
        item.classList.remove('bg-orange');
      }
    });
  }

}
