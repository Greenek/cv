export default class {
  constructor() {
    this._body = document.querySelector('body');
    this._links = document.querySelectorAll('link[data-style]');
  }
  refreshBody() {
    this._body.style.display = 'none';
    this._body.style.display = 'block';
  }
  setStyle(name) {
    this._links.forEach(link => {
      let rel = 'stylesheet';

      if (link.dataset['style'] !== name) {
        rel = 'alternate ' + rel;
      }

      link.setAttribute('rel', rel);
    });

    window.setTimeout(this.refreshBody.bind(this), 100);
  }
}
