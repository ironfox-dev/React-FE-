import {
    AGENT_LOAD_LEADS, AGENT_LOAD_LEADS_BY_STATUSES, AGENT_NEW_LEADS_COUNT, AGENT_RESET_LEADS, AGENT_SEARCH_LEADS,
    FILTER_LEADS,
    GOTO_PAGE_LEADS, LOAD_LEADS, OPEN_LEAD_MODAL, PUT_TWILIO_TOKEN, SEARCH_LEADS, SHOW_DELETE_LEADS, SORT_LEADS,
} from './actions';
import {LeadStatuses} from "@models/lead-statuses";

const initState = {
    leads: [],
    agentLeads: [],
    twilioToken: null,
    newLeadsCount: 0,
    agentLeadStatuses: [],
    pagination: {
        current_page: 1,
        per_page: 10,
        last_page: 1,
    },
    openModalStatus: false,
    statuses: LeadStatuses,
    selectBoxDates: [
        {
            key: 'today',
            value: 'today',
            text: 'Today',
        },
        {
            key: 'yesterday',
            value: 'yesterday',
            text: 'Yesterday',
        },
        {
            key: 'this-week',
            value: 'this-week',
            text: 'This Week',
        },
        {
            key: 'previous-week',
            value: 'previous-week',
            text: 'Previous Week',
        },
        {
            key: 'this-month',
            value: 'this-month',
            text: 'This Month',
        },
        {
            key: 'previous-month',
            value: 'previous-month',
            text: 'Previous Month',
        }
    ],
    query: {
        search: '',
        showDeleted: false,
        filters: {
            statusType: '',
            companyId: '',
        },
        sort: {
            status: true,
            agents: null,
            company: null,
            campaign: null,
            email: null,
        },
    },
};
const leads = (state = initState, action) => {
    switch (action.type) {
        case LOAD_LEADS: {
            return {
                ...state,
                leads: [...action.leads],
                pagination: action.pagination,
            };
        }
        case GOTO_PAGE_LEADS: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current_page: action.activePage,
                },
            };
        }
        case PUT_TWILIO_TOKEN: {
            return  {
                ...state,
                twilioToken: action.token,
            }
        }
        case SEARCH_LEADS: {
            return {
                ...state,
                query: {
                    ...state.query,
                    search: action.search,
                },
            };
        }
        case SHOW_DELETE_LEADS: {
            return {
                ...state,
                query: {
                    ...state.query,
                    showDeleted: !state.query.showDeleted,
                },
            };
        }
        case SORT_LEADS: {
            return {
                ...state,
                query: {
                    ...state.query,
                    sort: {
                        ...state.query.sort,
                        [action.field]: (state.query.sort[action.field] === false ? null : !state.query.sort[action.field]),
                    },
                },
            };
        }
        case FILTER_LEADS: {
            return {
                ...state,
                query: {
                    ...state.query,
                    filters: {
                        ...state.query.filters,
                        ...action.filters,
                    }
                }
            }
        }
        case OPEN_LEAD_MODAL: {
            return {
                ...state,
                openModalStatus: action.status,
            };
        }
        case AGENT_LOAD_LEADS: {
            return {
                ...state,
                agentLeads: [...state.agentLeads, ...action.leads],
                pagination: {
                    ...action.pagination,
                    current_page: (action.leads && action.leads.length > 0 ? action.pagination.current_page : action.pagination.current_page - 1)
                },
            };
        }
        case AGENT_LOAD_LEADS_BY_STATUSES: {
            return {
                ...state,
                agentLeadStatuses: [action.statuses],
            };
        }
        case AGENT_SEARCH_LEADS: {
            return {
                ...state,
                query: {
                    ...state.query,
                    search: action.search
                },
            };
        }
        case AGENT_RESET_LEADS: {
            return {
                ...state,
                agentLeads: [],
                pagination: {
                    current_page: 1,
                    per_page: 10,
                    last_page: 1,
                },
            }
        }
        case AGENT_NEW_LEADS_COUNT: {
            return {
                ...state,
                newLeadsCount: action.count,
            }
        }
        default: {
            return state;
        }
    }
};

export default leads;
