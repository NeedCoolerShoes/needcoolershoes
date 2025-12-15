// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

import LocalTime from "local-time"
LocalTime.start()

// Polyfill for tippy.js
window.process = { env: { NODE_ENV: 'development' }}