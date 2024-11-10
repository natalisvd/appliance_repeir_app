// app/javascript/controllers/contact_form_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["name", "phone", "email", "message", "submitButton"]

  connect() {
    console.log("ContactForm controller connected")
  }

  validate(event) {
    event.preventDefault()
    let isValid = true

    // Clear previous validation messages
    this.clearErrors()

    // Name validation (required and minimum length)
    if (this.nameTarget.value.trim().length < 2) {
      this.showError(this.nameTarget, "Name must be at least 2 characters")
      isValid = false
    }

    // Phone validation (10-digit pattern)
    const phonePattern = /^[0-9]{10}$/
    if (!phonePattern.test(this.phoneTarget.value.trim())) {
      this.showError(this.phoneTarget, "Enter a valid 10-digit phone number")
      isValid = false
    }

    // Email validation
    if (!this.emailTarget.validity.valid) {
      this.showError(this.emailTarget, "Enter a valid email address")
      isValid = false
    }

    // Message validation (required and minimum length)
    if (this.messageTarget.value.trim().length < 10) {
      this.showError(this.messageTarget, "Message must be at least 10 characters")
      isValid = false
    }

    // If valid, submit the form
    if (isValid) {
      this.element.submit()
    }
  }

  clearErrors() {
    this.element.querySelectorAll(".error-message").forEach(el => el.remove())
  }

  showError(inputElement, message) {
    const error = document.createElement("div")
    error.className = "error-message text-red-500 text-sm mt-1"
    error.innerText = message
    inputElement.parentNode.appendChild(error)
    inputElement.classList.add("border-red-500")
  }
}
