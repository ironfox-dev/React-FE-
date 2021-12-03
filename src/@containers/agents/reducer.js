import {
  ADD_AGENTS, FILTER_AGENTS, GOTO_PAGE, LOAD_AGENT_DATA, LOAD_AGENT_LEADS_GRAPH, LOAD_AGENT_LEADS_GRAPH_PIE,
  LOAD_SELECTBOX_AGENTS,
  OPEN_AGENT_MODAL, SEARCH_AGENTS,
  SHOW_DELETED_AGENTS,
  SORT_AGENTS,
} from './actions';

const initState = {
  agentProfile: {},
  agents: [],
  agent: {
    id: '',
    name: '',
  },
  averageResponseTime: '',
  graphContactedLeadsAverage: {
    type: 'line',
    data: {
      labels: ["date 1", "date 2", "date 3", "date 4", "date 5"],
      datasets: [
        {
          label: '15 min (0-15)',
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#21ba45'],
          borderWidth: 2
        },
        {
          label: '30 min (15-30)',
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#f2711c'],
          borderWidth: 2
        },
        {
          label: '2 hrs (30-2)',
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#2cb3c8'],
          borderWidth: 2
        },
        {
          label: '12 hrs (2-12)',
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['rgba(0, 0, 0, 0)'],
          borderColor: ['#6435c9'],
          borderWidth: 2
        },
        {
          label: '12 hrs + Missed',
          data: [0, 0, 0, 0, 0],
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
      },
      legend: false,
    }
  },
  pieGraphContactedLeadsAverage: {
    type: 'doughnut',
    data: {
      labels: ["15 min (0-15)", "30 min (15-30)", "2 hrs (30-2)", "12 hrs (2-12)", "12 hrs + Missed"],
      datasets: [
        {
          data: [0, 0, 0, 0, 0],
          backgroundColor: ['#21ba45', '#f2711c', '#2cb3c8', '#6435c9', '#db2828'],
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: false,
        text: 'Chart.js Doughnut Chart'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  },
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
  selectBoxAgents: [],
  pagination: {
    current_page: 1,
    per_page: 10,
    last_page: 1,
  },
  openModalStatus: false,
  query: {
    search: '',
    showDeleted: false,
    filters: {
      companyId: null,
    },
    sort: {
      name: true,
      campaigns: null,
      leads: null,
      avg_response: null,
    },
  },
};

const agents = (state = initState, action) => {
  switch (action.type) {
    case OPEN_AGENT_MODAL: {
      return {
        ...state,
        openModalStatus: action.open,
      };
    }
    case ADD_AGENTS: {
      return {
        ...state,
        agents: [...action.agents],
        pagination: action.pagination,
      };
    }
    case SEARCH_AGENTS: {
      return {
        ...state,
        query: {
          ...state.query,
          search: action.search,
        },
      };
    }
    case GOTO_PAGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          current_page: action.activePage,
        },
      };
    }
    case SORT_AGENTS: {
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
    case SHOW_DELETED_AGENTS: {
      return {
        ...state,
        query: {
          ...state.query,
          showDeleted: !state.query.showDeleted,
        },
      };
    }
    case LOAD_SELECTBOX_AGENTS: {
      return {
        ...state,
        selectBoxAgents: [...action.agents]
      }
    }
    case FILTER_AGENTS: {
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
    case LOAD_AGENT_DATA: {
      return {
        ...state,
        agentProfile: {
            ...action.agent
        },
      }
    }
    case LOAD_AGENT_LEADS_GRAPH: {
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
    case LOAD_AGENT_LEADS_GRAPH_PIE: {
      return {
        ...state,
        averageResponseTime: action.graphData.avg_response_time,
        pieGraphContactedLeadsAverage: {
          ...state.pieGraphContactedLeadsAverage,
          data: {
            ...action.graphData
          }
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default agents;
