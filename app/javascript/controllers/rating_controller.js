// app/javascript/controllers/rating_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["star", "ratingInput"]

  connect() {
    console.log("Rating controller connected")
  }

  setRating(event) {
    const rating = parseInt(event.currentTarget.dataset.value)
    this.ratingInputTarget.value = rating
    console.log("Rating set to:", rating) // Debugging line

    this.updateStars(rating)
  }

  updateStars(rating) {
    this.starTargets.forEach((star, index) => {
      star.textContent = index < rating ? "★" : "☆"
    })
  }
}
