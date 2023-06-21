import { Controller } from "@hotwired/stimulus"
import "ninja-keys"

export default class extends Controller {
  static values = {
    signedIn: Boolean
  }

  connect() {
    var data = [
      {
        id: "Editor",
        title: "Skin Editor",
        hotkey: "ctrl+1",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Navigation",
        handler: () => {
          window.location = "/"
        }
      },
      {
        id: "Gallery",
        title: "Gallery",
        hotkey: "ctrl+2",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Navigation",
        handler: () => {
          window.location = "/gallery"
        }
      },
      {
        id: "Banner",
        title: "Banner Editor",
        hotkey: "ctrl+3",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Navigation",
        handler: () => {
          window.location = "/banner"
        }
      },
    ];
    if (this.signedInValue == true) {
      data = data.concat(this.signedInData());
    } else {
      data = data.concat(this.signedOutData());
    }
    if (window.location.pathname == "/") {
      data = data.concat(this.editorData());
    }
    this.element.data = data;
  }
  
  signedInData () {
    return [
      {
        id: "Profile",
        title: "My Profile",
        hotkey: "ctrl+4",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Navigation",
        handler: () => {
          window.location = "/users/current"
        }
      },
    ]
  }

  signedOutData () {
    return [
      {
        id: "Sign In",
        title: "Sign In",
        hotkey: "ctrl+4",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Navigation",
        handler: () => {
          window.location = "/users/sign_in"
        }
      },
    ]
  }

  editorData () {
    function currentMode () {return App.dep.toolbar.getModeObj().getName();} 
    return [
      {
        id: "Editor Tools",
        title: "Editor Tools",
        hotkey: "alt+e",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Commands",
        handler: () => {
          if (!["ecmPaint", "ecmSquare", "ecmFill"].includes(currentMode())) {
            App.dep.toolbar.changeMode("ecmPaint");
          }
          this.element.open({ parent: 'Editor Tools' });
          return {keepOpen: true};
        }
      },
      {
        id: "Paint",
        title: "Paint Tool",
        hotkey: "alt+p",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Skin Editor Tools",
        parent: "Editor Tools",
        handler: () => {
          App.dep.toolbar.changeMode("ecmPaint");
        }
      },
      {
        id: "Rectangle",
        title: "Rectangle Tool",
        hotkey: "alt+r",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Skin Editor Tools",
        parent: "Editor Tools",
        handler: () => {
          App.dep.toolbar.changeMode("ecmSquare");
        }
      },
      {
        id: "Fill",
        title: "Fill Tool",
        hotkey: "alt+b",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Skin Editor Tools",
        parent: "Editor Tools",
        handler: () => {
          App.dep.toolbar.changeMode("ecmFill");
        }
      },
      {
        id: "Color Picker",
        title: "Enable Color Picker",
        hotkey: "alt+o",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 11.25l1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 10-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25L12.75 9" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Skin Editor Modes",
        parent: "Editor Tools",
        handler: () => {
          if (!["ecmPaint", "ecmSquare", "ecmFill"].includes(currentMode())) {
            App.dep.toolbar.changeMode("ecmPaint");
          }
          App.dep.toolbox.refs.colorPicker.enableDropper();
        }
      },
      {
        id: "Transparent",
        title: "Toggle Transparency",
        hotkey: "alt+t",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Skin Editor Modes",
        parent: "Editor Tools",
        handler: () => {
          if (!["ecmPaint", "ecmSquare", "ecmFill"].includes(currentMode())) {
            App.dep.toolbar.changeMode("ecmPaint");
          }
          App.dep.toolbox.refs.colorPicker.toggleTransparent()
        }
      },
      {
        id: "Mirror",
        title: "Toggle Mirroring",
        hotkey: "alt+v",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Skin Editor Modes",
        parent: "Editor Tools",
        handler: () => {
          if (!["ecmPaint", "ecmSquare"].includes(currentMode())) {
            App.dep.toolbar.changeMode("ecmPaint");
          }
          App.dep.toolbox.refs.mirror.toggle();
        }
      },
      {
        id: "Camo",
        title: "Toggle Camo Effect",
        hotkey: "alt+c",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Skin Editor Modes",
        parent: "Editor Tools",
        handler: () => {
          if (!["ecmPaint", "ecmSquare", "ecmFill"].includes(currentMode())) {
            App.dep.toolbar.changeMode("ecmPaint");
          }
          App.dep.toolbox.refs.noise.toggle();
        }
      },
      {
        id: "Face Front",
        title: "Turn Character to Face Front",
        hotkey: "0",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Skin Editor Modes",
        parent: "Editor Tools",
        handler: () => {
          App.dep.model.animateExact({ x: 0, y: 0 })
        }
      },
    ]
  }
}
