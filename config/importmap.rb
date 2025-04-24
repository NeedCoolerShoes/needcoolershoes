# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true

pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/src", under: "src"

pin "tslib", to: "https://ga.jspm.io/npm:tslib@2.5.0/tslib.es6.js"
pin "@yaireo/tagify", to: "https://ga.jspm.io/npm:@yaireo/tagify@4.17.8/dist/tagify.min.js"
pin "local-time" # @3.0.2
pin "@avo-hq/marksmith", to: "@avo-hq--marksmith.js" # @0.1.3

pin "ncrs-editor", to: "ncrs-editor.js"
pin "skinview3d", to: "skinview3d.js"