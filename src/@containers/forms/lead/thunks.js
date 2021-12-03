import * as actions from './actions';
import * as leadStateAction from '../../lead-notes/actions'
import { Auth } from '@services';
import { loadLeads } from '@containers/leads/thunks';
import { sendMessage } from '@containers/messages/thunks';
import {
  createAgencyCompanyLead,
  createCompanyLead,
  updateAgencyCompanyLead,
  updateCompanyLead } from "./api";

export const saveLead = form => (disptach) => {
  try {
    if (form.id) {
      disptach(updateLead(form));
    } else {
      disptach(createLead(form));
    }
  } catch (e) {
    sendMessage(e.message, true);
  }
};

export const updateLead = form => async (dispatch) => {
  try {
    if (Auth.isAgency) {
      let response = await updateAgencyCompanyLead(form);
      const { data } = response;
      await dispatch(leadStateAction.loadLead(data));
    } else {
      await updateCompanyLead(form);
    }

    await dispatch(actions.savedLead());
    if (!Auth.isAgent) {
      await dispatch(loadLeads());
    }
    dispatch(sendMessage('Successfully saved!'));
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};

export const createLead = form => async (dispatch) => {
  try {
    if (Auth.isAgency) {
      await createAgencyCompanyLead(form);
    } else {
      await createCompanyLead(form);
    }

    await dispatch(actions.savedLead());
    if (!Auth.isAgent) {
      await dispatch(loadLeads());
    } else {
      window.location = '/companies/leads/all'
    }
  } catch (e) {
    dispatch(sendMessage(e.message, true));
  }
};
