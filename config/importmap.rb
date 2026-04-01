# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true

pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/src", under: "src"

# pin "local-time" # @3.0.2
pin "@avo-hq/marksmith", to: "@avo-hq--marksmith.js" # @0.1.3

pin "@yaireo/tagify", to: "yaireo-tagify.js"
pin "ncrs-editor", to: "ncrs-editor.js"
pin "ncrs-banner", to: "ncrs-banner.js"
pin "skinview3d", to: "skinview3d.js"
pin "three", to: "three.js"
pin "local-time", to: "local-time.js"