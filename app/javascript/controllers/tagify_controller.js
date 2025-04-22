import { Controller } from "@hotwired/stimulus"
import Tagify from "@yaireo/tagify"

export default class extends Controller {
  static values = {
    for: String
  }

  static targets = [
    "parent", "input"
  ]

  tagify

  connect() {
    const input = this.inputTarget
    this.tagify = new Tagify(input, {
        appendTarget: this.parentTarget,
        whitelist: [],
        dropdown: {
          maxItems: 20,           // <- maximum allowed rendered suggestions
          classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
          enabled: 0,             // <- show suggestions on focus
          closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
        },
        validate: (tag) => {
          if (tag.jam_status != "closed") { return true; }
    
          return "Jam is closed."
        }
       }
      )

    this.tagify.on('input', event => this._handleInput(event))
    this.tagify.on('focus', () => this._resetWhitelist())
  }

  _resetWhitelist() {
    this._handleInput({detail: { value: "" }})
  }

  _handleInput(event) {
    const tagify = this.tagify;
    let value = event.detail.value, controller

    tagify.whitelist = null // reset the whitelist
  
    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
    controller && controller.abort()
    controller = new AbortController()
  
    // show loading animation and hide the suggestions dropdown
    tagify.loading(true).dropdown.hide()

    const forValue = this.forValue.length < 1 ? "skin" : this.forValue

    const query = "/api/tags?query="
      + value
      + "&for="
      + forValue
  
    fetch(query, {signal:controller.signal})
      .then(RES => RES.json())
      .then(function(newWhitelist){
        tagify.whitelist = newWhitelist // update whitelist Array in-place
        tagify.loading(false).dropdown.show(value) // render the suggestions dropdown
    })
  }
}
