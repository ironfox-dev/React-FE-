import * as R from 'ramda';

class SessionStorage {
  constructor(sessionStorage) {
    this.sessionStorage = sessionStorage;
  }

  getSessionStorage() {
    return this.sessionStorage;
  }

  getItem(key) {
    return R.pathOr(null, ['value'], JSON.parse(this.getSessionStorage().getItem(key)));
  }

  setItem(key, value) {
    return this.getSessionStorage().setItem(key, JSON.stringify({value}));
  }

  removeItem(key) {
    return this.getSessionStorage().removeItem(key);
  }
}

export default new SessionStorage(localStorage);
