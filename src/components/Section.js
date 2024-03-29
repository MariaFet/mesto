export class Section {
  constructor ({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems (items) {
    items.forEach((item) => {
      return this._renderer(item)
    });
  }

  addItem (element) {
    this._container.prepend(element);
  }
}