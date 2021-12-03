import { combineReducers } from 'redux';
import agents from './agents/reducer';
import auth from './auth/reducer';
import breadcrumb from './breadcrumb/reducer';
import campaigns from './campaigns/reducer';
import companies from './companies/reducer';
import deals from './deals/reducer';
import forms from './forms/reducer';
import integrations from './integrations/reducer';
import leadNotes from './lead-notes/reducer';
import leads from './leads/reducer';
import loader from './loader/reducer';
import menu from './menu/reducer';
import profile from './profile/reducer';
import users from './users/reducer';
import buttonGroup from './button-group/reducer';
import messages from './messages/reducer';
import dealActions from './deal-actions/reducer';

const reducers = combineReducers({
  dealActions,
  messages,
  agents,
  auth,
  breadcrumb,
  campaigns,
  companies,
  deals,
  forms,
  integrations,
  leadNotes,
  leads,
  loader,
  menu,
  profile,
  users,
  buttonGroup,
});

export default reducers;
