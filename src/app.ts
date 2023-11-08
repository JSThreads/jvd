enum StorageType { AppObject, References };

class App {
  mountPoint: null | HTMLElement;
  store: null | Object;
  children: Array<DomElement>;

  constructor(mountElement: HTMLElement, children: Array<DomElement>, storage: StorageType = StorageType.References, defaultStorage: object | null) {
    this.mountPoint = mountElement;
    this.children = children;

    if (storage == StorageType.AppObject) this.store = defaultStorage ?? {};
    else this.store = null;
  }
  mount(mountElement: HTMLElement) {
    this.mountPoint = mountElement;
  } 
  unmount() {
    this.mountPoint = null;
  }
  clearMountChildren() {
    if (this.mountPoint == null) return;
    this.mountPoint.replaceChildren();
  }
  renderHTML() {
    if (this.mountPoint == null) return;
  }
}