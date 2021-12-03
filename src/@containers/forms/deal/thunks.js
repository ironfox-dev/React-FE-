import * as actions from './actions';
import { Auth } from '@services';
import { getCompanyDeals } from '@containers/deals/thunks';
import { sendMessage } from '@containers/messages/thunks';
import {
  createAgencyCompanyDeal,
  createCompanyDeal,
  updateAgencyCompanyDeal,
  updateCompanyDeal
} from "./api";

export const saveDeal = form => (dispatch) => {
  try {
    if (form.id) {
      dispatch(updateDeal(form));
    } else {
      dispatch(createDeal(form));
    }
  } catch (e) {
    sendMessage(e.message, true);
  }
};

export const createDeal = form => async (dispatch) => {
  try {
    if (!form.companyId && Auth.isAgency) {
      throw new Error('Missing required Company!');
    }
    await (Auth.isAgency
      ? createAgencyCompanyDeal(form)
      : createCompanyDeal(form));

    await dispatch(sendMessage('Successfully saved!'));
    await dispatch(actions.savedDeal());
    await dispatch(getCompanyDeals());
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const updateDeal = form => async (dispatch) => {
  try {
    if (!form.companyId && Auth.isAgency) {
      throw new Error('Missing required Company!');
    }

    await (Auth.isAgency
      ? updateAgencyCompanyDeal(form)
      : updateCompanyDeal(form));

    await dispatch(sendMessage('Successfully saved!'));
    await dispatch(actions.savedDeal());
    await dispatch(getCompanyDeals());
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};
