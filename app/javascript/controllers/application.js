import { Application } from "@hotwired/stimulus"
import { MarksmithController } from '@avo-hq/marksmith'

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

application.register('marksmith', MarksmithController)

export { application }
