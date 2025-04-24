import { Optional, toTitleCase } from "src/banner/lib/utils"

class BaseComponent extends HTMLElement {
  static observe(...attr) {
    this._attrSet = (this._attrSet || new Set)
    attr.forEach(e => {this._attrSet.add(e)})
    this.observedAttributes = Array.from(this._attrSet)
  }

  constructor() {
    super()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const callback = `on${toTitleCase(name)}Changed`
    if (typeof this[callback] == "function") {
      this[callback](oldValue, newValue)
    }
  }

  emit(name, data) {
    this.dispatchEvent(new CustomEvent(name, {detail: data}))
  }

  on(name, callback) {
    this.addEventListener(name, callback)
  }
}

class BaseShadowComponent extends BaseComponent {
  constructor() {
    super()
    this.shadow = this.attachShadow({mode: "open"})
  }
}

class SelectComponent extends BaseComponent {
  constructor() {
    super()
  }

  _children = new Set
  selected = new Set

  select(child) {
    child.setAttribute("selected", true)
  }

  deselect(child) {
    child.removeAttribute("selected")
  }

  _select(child) {
    this.selected.add(child)
    this.emit("child-selected", child)
  }

  _deselect(child) {
    this.selected.delete(child)
    this.emit("child-deselected", child)
  }

  _registerChild(child) {
    this._children.add(child)
  }
  _removeChild(child) {
    this._children.delete(child)
  }
}

class SingleSelectComponent extends SelectComponent {
  constructor() {
    super()
  }

  selected = Optional.empty()

  _select(selected) {
    this.selected = Optional.of(selected)
    this._children.forEach(child => {
      if (child == selected) { return }
      this.deselect(child)
    })
    this.emit("child-selected", selected)
  }

  _deselect(child) {
    if (child == this.selected.get()) {
      this.selected = Optional.empty()
    }
    this.emit("child-deselected", child)
  }
}

class OptionComponent extends BaseComponent {
  static {
    this.observe("selected")
  }
  constructor(parentType) {
    super()
    const parent = this.closest(parentType)
    this.parent = Optional.try(parent instanceof SelectComponent, parent)
    this.parent.ifPresent(p => { p._registerChild(this) })
  }
  selected = false

  onSelectedChanged(_, value) {
    this.selected = (value == null ? false : true)
    if (value) {
      this.parent.ifPresent(p => { p._select(this) })
      this.emit("selected", {})
    } else {
      this.parent.ifPresent(p => { p._deselect(this) })
      this.emit("deselected", {})
    }
  }

  select() {
    this.setAttribute("selected", true)
  }

  deselect() {
    this.removeAttribute("selected")
  }
}

export { BaseComponent, BaseShadowComponent, SelectComponent, SingleSelectComponent, OptionComponent }