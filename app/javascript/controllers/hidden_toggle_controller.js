import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["hidden", "select"];
  static values = {
    select: String
  }

  toggle() {
    this.hiddenTargets.forEach(target => {
      target.classList.toggle("hidden");
    });
  }

  select(event) {
    const selected = event.params.select;

    this.selectTargets.forEach(target => {
      if (target.getAttribute("data--select") == selected) {
        target.classList.remove("hidden");
      } else {
        target.classList.add("hidden");
      }
    })
  }
}
