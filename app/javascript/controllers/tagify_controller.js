import { Controller } from "@hotwired/stimulus"
import Tagify from "@yaireo/tagify"

export default class extends Controller {
  connect() {
    var input = this.element,
      tagify = new Tagify(input, {
        whitelist: [],
        dropdown: {
          maxItems: 20,           // <- mixumum allowed rendered suggestions
          classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
          enabled: 0,             // <- show suggestions on focus
          closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
        }  
       }
      ),
      controller;
    tagify.on('input', onInput)
    tagify.on('focus', _e => resetWhitelist())

    function resetWhitelist() {
      onInput({detail: { value: "" }})
    }

    function onInput(e) {
      var value = e.detail.value
      tagify.whitelist = null // reset the whitelist
    
      // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
      controller && controller.abort()
      controller = new AbortController()
    
      // show loading animation and hide the suggestions dropdown
      tagify.loading(true).dropdown.hide()
    
      fetch("/api/tags?query=" + value, {signal:controller.signal})
        .then(RES => RES.json())
        .then(function(newWhitelist){
          tagify.whitelist = newWhitelist // update whitelist Array in-place
          tagify.loading(false).dropdown.show(value) // render the suggestions dropdown
        })
    }
  }
}
