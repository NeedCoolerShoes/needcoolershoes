function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

class Optional {
  static empty() {
    return new this(null)
  }

  static of(value) {
    return new this(value)
  }

  static try(condition, value) {
    if (condition) {
      return this.of(value)
    } else {
      return this.empty()
    }
  }

  constructor(value) {
    if (value != undefined) {
      this.#value = value
    }
  }
  #value = null

  isPresent() {
    return !(this.#value === null)
  }

  get() {
    return this.#value
  }

  ifPresent(callback) {
    if (!this.isPresent()) { return }
    callback(this.#value)
  }

  unlessPresent(callback) {
    if (this.isPresent()) { return }
    callback()
  }

  orElse(value) {
    if (this.isPresent()) {
      return this.#value
    } else {
      return value
    }
  }

  orElseGet(callback) {
    if (this.isPresent()) {
      return this.#value
    } else {
      return callback()
    }
  }
}

export { Optional, toTitleCase }