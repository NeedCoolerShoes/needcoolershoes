import {BaseComponent} from "../lib/components.js"

class NCRSDialog extends BaseComponent {
  static {
    this.observe("visible")
  }

  constructor() {
    super(true)
    this.on("click", this._handleClick)
    document.addEventListener("keydown", (event) => this._handleKeyDown(event))
  }

  show() {
    this.setAttribute("visible", "")
  }

  hide() {
    this.removeAttribute("visible")
  }

  _handleClick(event) {
    if (event.target != this) { return }
    this.hide()
  }

  _handleKeyDown(event) {
    if (!this.hasAttribute("visible")) { return }
    if (event.key != "Escape") { return }

    this.hide()
  }
}
customElements.define("ncrs-dialog", NCRSDialog)