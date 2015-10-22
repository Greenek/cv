export default class {
  constructor(url) {
    this._url = url;
    this._image = new Image();

    this.promise = new Promise(this.executor.bind(this));
  }
  executor(resolve, reject) {
    this._image.onload = resolve.bind(this);
    this._image.src = this._url;
  }
}
