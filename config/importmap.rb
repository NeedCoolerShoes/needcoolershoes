# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"

pin "ninja-keys", to: "https://ga.jspm.io/npm:ninja-keys@1.2.2/dist/ninja-keys.js"
pin "@lit/reactive-element", to: "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/reactive-element.js"
pin "@lit/reactive-element/decorators/", to: "https://ga.jspm.io/npm:@lit/reactive-element@1.6.1/decorators/"
pin "@material/mwc-icon", to: "https://ga.jspm.io/npm:@material/mwc-icon@0.25.3/mwc-icon.js"
pin "hotkeys-js", to: "https://ga.jspm.io/npm:hotkeys-js@3.8.7/dist/hotkeys.esm.js"
pin "lit", to: "https://ga.jspm.io/npm:lit@2.2.6/index.js"
pin "lit-element/lit-element.js", to: "https://ga.jspm.io/npm:lit-element@3.3.2/lit-element.js"
pin "lit-html", to: "https://ga.jspm.io/npm:lit-html@2.7.3/lit-html.js"
pin "lit-html/directives/", to: "https://ga.jspm.io/npm:lit-html@2.7.3/directives/"
pin "lit/", to: "https://ga.jspm.io/npm:lit@2.2.6/"
pin "tslib", to: "https://ga.jspm.io/npm:tslib@2.5.0/tslib.es6.js"