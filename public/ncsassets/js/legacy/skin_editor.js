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
  #picker = false;
  dragging = false;

  #setupCanvas() {
    this.textureCanvas = new OffscreenCanvas(64, 32);
    this.textureContext = this.textureCanvas.getContext("2d");
    this.renderContext = this.renderCanvas.getContext("2d");
  }

  loadSkin(skin) {
    const img = new Image;
    img.onload = event => {
      this.textureContext.reset();
      this.textureContext.drawImage(event.target, 0, 0);
      this.renderTexture();
      img.remove;
    }
    img.src = skin;
  }

  renderTexture() {
    this.renderContext.reset();
    this.renderContext.imageSmoothingEnabled = false;
    this.renderContext.drawImage(this.textureCanvas, 0, 0, 64, 32, 0, 0, 512, 256);
    this.dispatchEvent(new CustomEvent("render", {detail: {canvas: this.textureCanvas}}));
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

  onMouseClick(event) {
    const xPos = Math.floor(event.offsetX / 8);
    const yPos = Math.floor(event.offsetY / 8);
    if (!this.#picker) {
      this.drawPixel(this.getColor(), xPos, yPos);
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

  onMouseDown(event) {
    this.dragging = true;
    this.onMouseClick(event);
  }

  onMouseMove(event) {
    if (this.dragging) {
      this.onMouseClick(event);
    }
  }

  onMouseUp() {
    this.dragging = false;
  }

  initialize() {
    this.#setupCanvas();
    this.loadSkin(this.skin);
    this.renderCanvas.addEventListener("click", this.onMouseClick.bind(this))
    this.renderCanvas.addEventListener("mousedown", this.onMouseDown.bind(this))
    this.renderCanvas.addEventListener("mousemove", this.onMouseMove.bind(this))
    document.addEventListener("mouseup", this.onMouseUp.bind(this))
    document.addEventListener("keydown", event => {
      if (this.#picker && event.key == "Escape") {
        this.disablePicker();
      }
    })
  }
};

export {NCRSSkinEditor};