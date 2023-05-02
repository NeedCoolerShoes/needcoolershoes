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
        handler: () => {
          window.location = "/"
        }
      },
      {
        id: "Gallery",
        title: "Gallery",
        hotkey: "ctrl+2",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        handler: () => {
          window.location = "/gallery"
        }
      },
      {
        id: "Banner",
        title: "Banner Editor",
        hotkey: "ctrl+3",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        handler: () => {
          window.location = "/banner"
        }
      },
    ];
    if (this.signedInValue == true) {
      data = data.concat(this.profileData());
    }
    if (window.location.pathname == "/") {
      data = data.concat(this.editorData());
    }
    this.element.data = data;
  }
  
  profileData () {
    return [
      {
        id: "Profile",
        title: "My Profile",
        hotkey: "ctrl+4",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        handler: () => {
          window.location = "/users/current"
        }
      },
    ]
  }

  editorData () {
    function currentMode () {return App.dep.toolbar.getModeObj().getName();} 
    return [
      {
        id: "Paint",
        title: "Paint Tool",
        hotkey: "p",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Editor Commands",
        children: ["Color Picker", "Mirror", "Camo"],
        handler: () => {
          console.log(currentMode())
          if (currentMode() == "ecmPaint") {
            this.element.open({ parent: 'Paint' });
            return {keepOpen: true};
          } else {
            App.dep.toolbar.changeMode("ecmPaint");
          }
        }
      },
      {
        id: "Color Picker",
        title: "Enable Color Picker",
        hotkey: "o",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Editor Commands",
        parent: "Paint",
        handler: () => {
          App.dep.toolbar.changeMode("ecmPaint");
          App.dep.toolbox.refs.colorPicker.enableDropper();
        }
      },
      {
        id: "Transparent",
        title: "Toggle Transparency",
        hotkey: "t",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Editor Commands",
        parent: "Paint",
        handler: () => {
          App.dep.toolbar.changeMode("ecmPaint");
          App.dep.toolbox.refs.colorPicker.toggleTransparent()
        }
      },
      {
        id: "Mirror",
        title: "Toggle Mirroring",
        hotkey: "v",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Editor Commands",
        parent: "Paint",
        handler: () => {
          if (["ecmPaint", "ecmSquare"].includes(currentMode())) {
            App.dep.toolbox.refs.mirror.toggle();
          }
        }
      },
      {
        id: "Camo",
        title: "Toggle Camo Effect",
        hotkey: "c",
        icon: '<svg aria-hidden="true" fill="none" class="ninja-icon" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        section: "Editor Commands",
        parent: "Paint",
        handler: () => {
          if (["ecmPaint", "ecmSquare", "ecmFill"].includes(currentMode())) {
            App.dep.toolbox.refs.noise.toggle();
          }
        }
      },
    ]
  }
}
