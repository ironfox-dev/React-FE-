import {
  FETCH_AGENT_CAMPAIGNS,
  FETCH_CAMPAIGNS,
  FETCH_COMPANY_CAMPAIGNS,
  GOTO_PAGE_CAMPAIGN,
  LOAD_DEAL_CAMPAIGNS,
  SHOW_DELETED_CAMPAIGNS,
  SORT_CAMPAIGNS,
} from "./actions";

const initState = {
  campaigns: [],
  companyId: null,
  dealId: null,
  agentId: null,
  query: {
    showDeleted: false,
    sort: {
    }
  },
  pagination: {
    current_page: 1,
    per_page: 10,
    last_page: 1,
  }
};

const campaigns = (state = initState, action) => {
  switch (action.type) {
    case LOAD_DEAL_CAMPAIGNS: {
      return {
        ...state,
        campaigns: [...action.campaigns],
        pagination: action.pagination
      };
    }
    case GOTO_PAGE_CAMPAIGN: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current_page: action.page,
        }
      };
    }
    case SORT_CAMPAIGNS: {
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
    case FETCH_CAMPAIGNS: {
      return {
        ...state,
        companyId: action.companyId,
        dealId: action.dealId,
      };
    }
    case FETCH_AGENT_CAMPAIGNS: {
      return {
        ...state,
        agentId: action.agentId,
      };
    }
    case FETCH_COMPANY_CAMPAIGNS: {
      return {
        ...state,
        companyId: action.companyId,
      };
    }
    case SHOW_DELETED_CAMPAIGNS: {
      return {
        ...state,
        query: {
          ...state.query,
          showDeleted: !state.query.showDeleted
        }
      };
    }
    default: {
      return state;
    }
  }
};


export default campaigns;
