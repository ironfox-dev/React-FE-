import { combineReducers } from 'redux';

import agent from './agent/reducer';
import campaign from './campaign/reducer';
import company from './company/reducer';
import deal from './deal/reducer';
import lead from './lead/reducer';
import user from './user/reducer';
import optinFormIntegration from './integrations/optinform/reducer';
import reminder from './reminder/reducer'
import automation from './automation/reducer'
import automationReply from './automation_reply/reducer'

export default combineReducers({
  optinFormIntegration,
  agent,
  campaign,
  company,
  deal,
  lead,
  user,
  reminder,
  automation,
  automationReply,
});
