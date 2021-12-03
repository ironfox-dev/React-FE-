import {SessionStorage} from "./index";
import * as R from "ramda";

export class Auth {
  static isAuthorised() {
    return R.pathOr(false, ['token'], SessionStorage.getItem('session'));
  }

  static get isAgency() {
    return this.role === 'agency';
  }

  static get isCompany() {
    return this.role === 'company';
  }

  static get isAdmin() {
    return this.role === 'admin';
  }

  static get isAgent() {
    return this.role === 'agent';
  }

  static get hasTwilio() {
    const token = R.pathOr('', ['user', 'twilio_token'], SessionStorage.getItem('session')).toLowerCase();
    const sid = R.pathOr('', ['user', 'twilio_sid'], SessionStorage.getItem('session')).toLowerCase();
    return token && sid;
  }

  static get role() {
    return R.pathOr('', ['user', 'role'], SessionStorage.getItem('session')).toLowerCase();
  }

  static get user() {
    return R.pathOr({}, ['user'], SessionStorage.getItem('session'));
  }
}
