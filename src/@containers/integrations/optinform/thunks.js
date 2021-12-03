import {api} from "@services";
import {sendMessage} from "../../messages/thunks";
import * as actions from './actions';
import {hideLoader, showLoader} from "../../loader/actions";

export const loadCampaignBy = uuid => async dispatch =>  {
  try {
    await dispatch(showLoader());
    const response = await api.get(`/v1/campaigns/${uuid}`);
    const { data } = response;
    await dispatch(actions.loadCampaignIntegration(data));
  } catch (e) {
    dispatch(sendMessage(e.message, true))
  }
  await dispatch(hideLoader());
};

export const createLead = (form) => async (dispatch, getState) =>  {
  try {
    await dispatch(showLoader());
    const { uuid } = getState().integrations.optinForm.campaign;

    await api.post(`/v1/campaigns/${uuid}/leads`, form);
    await dispatch(actions.resetForm({ showResend: true, show: false }))
  } catch (e) {
    dispatch(sendMessage(e.message, true))
  }
  await dispatch(hideLoader());
};
