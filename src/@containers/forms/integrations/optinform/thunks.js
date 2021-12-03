import * as actions from './actions';
import {sendMessage} from "../../../messages/thunks";
import {api, Auth} from "@services";
import {fetchCampaigns} from "@containers/campaigns/thunks";

export const saveOptinForm = form => async dispatch => {

  try {
    if (!form.companyId) {
      throw new Error('Missing required company!');
    }

    if (!form.dealId) {
      throw new Error('Missing required campaign!');
    }
    await api.patch(
      `/v1/${Auth.role}/companies/${form.companyId}/deals/${form.dealId}/campaigns/${form.id}`,
      {
        integration_config: JSON.stringify(form.integrationForm)
      }
    );
    await dispatch(actions.saveOptionForm());
    await dispatch(fetchCampaigns());
    await dispatch(sendMessage('Successfully created!'));
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};
