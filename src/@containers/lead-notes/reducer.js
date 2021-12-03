import {LOAD_TIMELINE_LEAD} from "./actions";

const initState = {
  lead: {
    status: 'NEW',
    campaign: {},
    company: {},
    agent: {},
  },
  leadNotes: [],
};

const leadNotes = (state = initState, action) => {
  switch (action.type) {
    case LOAD_TIMELINE_LEAD: {
      return {
        ...state,
        lead: action.lead,
        leadNotes: action.lead.lead_notes,
        reminders: action.lead.reminders
      }
    }
    default: {
      return state;
    }
  }
};

export default leadNotes;