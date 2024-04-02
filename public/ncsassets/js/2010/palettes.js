import {hexToRGB, RGBToHex} from "./helpers.js";
import {NCRSEditor} from "./editor.js";
import {changeColor} from "./color_picker.js";

const defaultColors = [
  "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
  "#ffffff", "#ffffff", "#ffffff", "#ffffff"
]
const maxLength = 12

class NCRSRecentPalette extends HTMLElement {
  constructor() {
    super();
  }

  recentColors = [];

  connectedCallback() {
    window.addEventListener('load', () => {
      defaultColors.forEach(color => {
        this.addColor(color, true);
      })
      const firstColor = this.querySelector("ncrs-palette-color:first-of-type");
      firstColor.select();
      const eraser = document.createElement('ncrs-palette-color');
      eraser.setColor("transparent");
      eraser.style.backgroundImage = "url('/ncsassets/img/2010/editor/5_Pixel_patch.png')";
      this.append(eraser);
    })

    NCRSEditor.addEventListener('draw', event => {
      const color = event.detail.color;
      this.addColor(color, false, true);
    })
  }

  deselectAll() {
    this.querySelectorAll("ncrs-palette-color").forEach(element => {
      element.deselect();
    })
  }

  addColor(color, force = false, select = false) {
    if (color == "transparent") { return; }
    if (this.recentColors.includes(color) && !force) { return; }
    this.recentColors.push(color);
    if (this.recentColors.length > maxLength) {
      this.removeColor(this.recentColors[0]);
    }
    const newColor = document.createElement('ncrs-palette-color');
    newColor.setColor(color);
    const firstColor = this.querySelector("ncrs-palette-color:first-of-type");
    if (firstColor) {
      firstColor.insertAdjacentElement("beforebegin", newColor)
    } else {
      this.append(newColor);
    }
    if (select) {
      newColor.select();
    }
    newColor.addEventListener('click', event => {
      changeColor(event.target.getAttribute('color'));
    })
  }

  removeColor(color) {
    const index = this.recentColors.findIndex(element => { return color == element; });
    if (index < 0) { return; }
    this.recentColors.splice(index, 1)
    this.querySelector(`[color="${color}"]`).remove()
  }
}

class NCRSPaletteColor extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('block', 'w-[32px]', 'h-[32px]', 'box-border', 'cursor-pointer', 'border-4', 'border-black');
    this.addEventListener('click', event => {
      event.target.select();
    })
  }

  setColor(color) {
    this.setAttribute('color', color);
    this.style.backgroundColor = color;
  }

  select() {
    const parentPalette = this.closest("ncrs-recent-palette");
    if (parentPalette) {
      parentPalette.deselectAll();
    }
    this.setAttribute('selected', true);
    this.classList.add('border-dashed');
    NCRSEditor.currentColor = this.getAttribute('color');
  }

  deselect() {
    this.setAttribute('selected', '');
    this.classList.remove('border-dashed');
  }
}

class NCRSPaletteEraser extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('block', 'w-[32px]', 'h-[32px]', 'box-border', 'cursor-pointer', 'border-4', 'border-black');
    this.style.backgroundImage = "url('/ncsassets/img/2010/editor/5_Pixel_patch.png')";
  }

  select() {
    const parentPalette = this.closest("ncrs-recent-palette");
    if (parentPalette) {
      parentPalette.deselectAll();
    }
    this.setAttribute('selected', true);
    this.classList.add('border-dashed');
    NCRSEditor.currentColor = 'transparent';
  }

  deselect() {
    this.setAttribute('selected', '');
    this.classList.remove('border-dashed');
  }
}

window.customElements.define("ncrs-recent-palette", NCRSRecentPalette);
window.customElements.define("ncrs-palette-color", NCRSPaletteColor);