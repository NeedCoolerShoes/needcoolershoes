function createWithClasses(type, ...args) {
  const element = document.createElement(type)
  element.classList.add(args)
  return element
}

export {createWithClasses}