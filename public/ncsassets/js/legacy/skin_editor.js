import {shadeColor, getRandomInt, RGBToHex} from "./helpers.js";

class NCRSSkinEditor extends EventTarget {
  constructor(params = {}) {
    super();
    this.renderCanvas = params.canvas;
    this.skin = params.skin;
    this.initialize();
  }

  textureCanvas;
  textureContext;
  renderCanvas;
  renderContext;
  currentColor = "#ffffff";
  camo = false;
  dragging = false;
  historyMax = 100;

  #picker = false;
  #history = [];
  #redoHistory = [];

  #setupCanvas() {
    this.textureCanvas = new OffscreenCanvas(64, 32);
    this.textureContext = this.textureCanvas.getContext("2d");
    this.renderContext = this.renderCanvas.getContext("2d");
  }

  loadSkin(skin) {
    const img = new Image;
    img.onload = event => {
      this.drawTexture(event.target);
      this.resetHistory();
      this.renderTexture();
      img.remove;
    }
    img.src = skin;
  }

  resetSkin() {
    localStorage.removeItem('ncrs-legacy');
    this.loadSkin(this.skin);
  }

  drawTexture(imageSource) {
    this.textureContext.reset();
    if (imageSource instanceof ImageData) {
      this.textureContext.putImageData(imageSource, 0, 0);
    } else {
      this.textureContext.drawImage(imageSource, 0, 0);
    }
  }

  renderTexture() {
    this.renderContext.reset();
    this.renderContext.imageSmoothingEnabled = false;
    this.renderContext.drawImage(this.textureCanvas, 0, 0, 64, 32, 0, 0, 512, 256);
    this.dispatchEvent(new CustomEvent("render", {detail: {canvas: this.textureCanvas}}));
  }

  resetHistory() {
    this.#history = [];
    this.#redoHistory = [];
    this.addToHistory();
  }

  addToHistory() {
    if (this.#history.length >= this.historyMax) {
      this.#history.shift();
    }
    this.#redoHistory = [];
    this.#history.push(this.textureContext.getImageData(0, 0, 64, 32));
    this.saveToLocalStorage();
  }

  loadFromLocalStorage() {
    const storage = localStorage.getItem('ncrs-legacy');
    if (!storage) { return false; }
    const arr = JSON.parse(storage);
    if (!arr) { return false; }
    const data = new Uint8ClampedArray(arr);
    const imgData = new ImageData(data, 64)
    this.drawTexture(imgData);
    this.renderTexture();
    return true;
  }

  saveToLocalStorage() {
    const data = this.textureContext.getImageData(0, 0, 64, 32).data;
    localStorage.setItem('ncrs-legacy', JSON.stringify(Array.from(data)));
  }

  undo() {
    if (this.#history.length <= 1) { return; }
    this.#redoHistory.push(this.#history.pop());
    this.drawTexture(this.#history.at(-1));
    this.saveToLocalStorage();
    this.renderTexture();
  }

  redo() {
    if (this.#redoHistory.length < 1) { return; }
    this.#history.push(this.#redoHistory.pop());
    this.drawTexture(this.#history.at(-1));
    this.saveToLocalStorage();
    this.renderTexture();
  }

  drawPixel(color, x, y, xWidth = 1, xHeight = 1) {
    if (color == "transparent") {
      this.textureContext.clearRect(x, y, xWidth, xHeight);
    } else {
      this.textureContext.fillStyle = color;
      this.textureContext.fillRect(x, y, xWidth, xHeight);
    }
    this.dispatchEvent(new CustomEvent("draw", {detail: {color: this.currentColor, x: x, y: y, xWidth: xWidth, xHeight: xHeight}}));
    this.renderTexture();
  }

  enablePicker() {
    this.renderCanvas.style.cursor = "url('/ncsassets/img/legacy/editor/1_PixelMap_dropperIcon.png') 1 17, crosshair";
    this.#picker = true;
  }

  disablePicker() {
    this.renderCanvas.style.cursor = "";
    this.#picker = false;
  }

  getColor() {
    if (!this.camo) {return this.currentColor;}
    const percent = getRandomInt(32) - 16;
    return shadeColor(this.currentColor, percent)
  }

  export() {
    return new Promise(resolve => {
      this.textureCanvas.convertToBlob().then(blob => {
        resolve(URL.createObjectURL(blob));
      });
    });
  }

  onMouseDown(event) {
    const xPos = Math.floor(event.offsetX / 8);
    const yPos = Math.floor(event.offsetY / 8);
    if (!this.#picker) {
      this.drawPixel(this.getColor(), xPos, yPos);
      this.addToHistory();
      return;
    } 
    const data = this.textureContext.getImageData(xPos, yPos, 1, 1).data;
    if (data[3] > 0) {
      this.currentColor = RGBToHex(data[0], data[1], data[2]);
    }
    setTimeout(() => {
      this.disablePicker();
    }, 200)
  }

  onMouseMove(event) {
    const xPos = Math.floor(event.offsetX / 8);
    const yPos = Math.floor(event.offsetY / 8);
    if (event.buttons == 1) {
      this.dragging = true;
      this.drawPixel(this.getColor(), xPos, yPos);
    }
  }

  onMouseUp() {
    if (this.dragging) {
      this.addToHistory();
    }
    this.dragging = false;
  }

  initialize() {
    this.#setupCanvas();
    this.renderCanvas.addEventListener("mousedown", this.onMouseDown.bind(this))
    this.renderCanvas.addEventListener("mousemove", this.onMouseMove.bind(this))
    window.addEventListener("load", () => {      
      if (!this.loadFromLocalStorage()) {
        this.loadSkin(this.skin);
      }
    })
    document.addEventListener("mouseup", this.onMouseUp.bind(this))
    document.addEventListener("keydown", event => {
      if (this.#picker && event.key == "Escape") {
        return this.disablePicker();
      }
      if (event.key == 'z') {
        return this.undo();
      }
      if (event.key == 'y') {
        this.redo();
      }
    })
  }
};

export {NCRSSkinEditor};