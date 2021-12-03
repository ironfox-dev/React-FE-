import {
  ADD_COMPANIES, ADD_COMPANY_LEAD_STATS,
  ADD_SELECT_BOX_COMPANIES,
  ADD_SELECT_BOX_TIMEZONES,
  GOTO_COMPANIES_PAGE,
  LOAD_COMPANY,
  LOAD_COMPANY_CAMPAIGNS,
  LOAD_COMPANY_GRAPH_CONTACTED_LEADS_AVERAGE,
  OPEN_COMPANY_MODAL,
  SEARCH_COMPANIES,
  SORT_COMPANIES,
  TOGGLE_SHOW_DELETED,
} from './actions';

const initState = {
  company: {},
  companId: '',
  companies: [],
  selectBoxCompanies: [],
  selectBoxTimezones: [],
  averageResponseTime: '',
  companyLeadStats: {},
  graphContactedLeadsAverage: {
    type: 'line',
    data: {
      labels: ["date x", "date y", "date y", "date y", "date y"],
      datasets: [
        {
          label: '15 min (0-15)',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#21ba45'],
          borderWidth: 2
        },
        {
          label: '30 min (15-30)',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#f2711c'],
          borderWidth: 2
        },
        {
          label: '2 hrs (30-2)',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#2cb3c8'],
          borderWidth: 2
        },
        {
          label: '12 hrs (2-12)',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#6435c9'],
          borderWidth: 2
        },
        {
          label: '12 hrs + Missed leads',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#db2828'],
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  },
  pagination: {
    current_page: 1,
    per_page: 10,
    last_page: 1,
  },
  openModal: false,
  query: {
    search: '',
    showDeleted: false,
    sort: {
      name: true,
      deals: null,
      leads: null,
      agents: null,
      avg_response: null,
    },
  },
};

const companies = (state = initState, action) => {
  switch (action.type) {
    case ADD_COMPANIES: {
      return {
        ...state,
        companies: [...action.companies],
        pagination: action.pagination,
        query: {
          ...state.query
        },
      };
    }
    case GOTO_COMPANIES_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current_page: action.page
        },
      };
    }
    case SORT_COMPANIES: {
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
    case SEARCH_COMPANIES: {
      return {
        ...state,
        query: {
          ...state.query,
          search: action.search,
        },
      };
    }
    case OPEN_COMPANY_MODAL: {
      return {
        ...state,
        openModal: action.open,
      };
    }
    case TOGGLE_SHOW_DELETED: {
      return {
        ...state,
        query: {
          ...state.query,
          showDeleted: !state.query.showDeleted,
        },
      };
    }
    case ADD_SELECT_BOX_COMPANIES: {
      return {
        ...state,
        selectBoxCompanies: [...action.companies],
      };
    }
    case ADD_SELECT_BOX_TIMEZONES: {
      return {
        ...state,
        selectBoxTimezones: [...action.timezones],
      };
    }
    case LOAD_COMPANY: {
      return {
        ...state,
        company: action.company
      }
    }
    case LOAD_COMPANY_GRAPH_CONTACTED_LEADS_AVERAGE: {
      return {
        ...state,
        averageResponseTime: action.graphData.avg_response_time,
        graphContactedLeadsAverage: {
          ...state.graphContactedLeadsAverage,
          data: {
            ...action.graphData
          }
        }
      }
    }
    case LOAD_COMPANY_CAMPAIGNS: {
      return {
        ...state,
        companyId: action.companyId,
      }
    }
    case ADD_COMPANY_LEAD_STATS: {
      return {
        ...state,
        companyLeadStats: action.companyLeadStats,
      }
    }
    default: {
      return state;
    }
  }
};

export default companies;
