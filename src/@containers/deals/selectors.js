import {createSelector} from 'reselect';
import * as R from 'ramda';
import { integrations as selectBoxIntegrations } from "@containers/forms/campaign/integrations";

const filterDeals = ({deals, filters}) => {
  const dealsRes = deals.filter(deal => (!filters.companyId || deal.company.id === filters.companyId) && deal.deleted_at === null);
  const dealsResult = dealsRes.filter(deal => !filters.search || (deal.name.search(new RegExp(filters.search, 'i')) !== -1));

  return {
    filters,
    deals: dealsResult,
  };
};

const sortDeals = ({deals, filters}) => {
  const [name, direction] = R.pipe(
    R.pathOr('name.asc', ['sortBy']),
    R.split('.')
  )(filters);

  return R.sort((a, b) => {
    const checkIsDate = new Date(a[name]);

    if (!isNaN(checkIsDate)) {
      if (direction === 'desc') {
        return new Date(b[name]).getTime() - new Date(a[name]).getTime();
      }
      return new Date(a[name]).getTime() - new Date(b[name]).getTime();
    }

    if (direction === 'asc') {
      return a[name].localeCompare(b[name]);
    }
    return b[name].localeCompare(a[name]);
  }, deals);
};

const filterDeletedDeals = (state) => {
  const {deals, filters} = state;
  const dealsRes = deals.filter(deal => (!filters.companyId || deal.company.id === state.filters.companyId) && deal.deleted_at !== null);
  const dealsResult = dealsRes.filter(deal => !filters.search || (deal.name.search(new RegExp(filters.search, 'i')) !== -1));

  return {
    filters,
    deals: dealsResult,
  };
}

export const getDeals = createSelector(
  state => state.deals,
  R.pipe(
    filterDeals,
    sortDeals,
  )
);

export const getDeletedDeals = createSelector(
  state => state.deals,
  R.pipe(
    filterDeletedDeals,
    sortDeals,
  )
);


export const getSelectBoxDeals = createSelector(
  state => filterDeals(state.deals),
  ({deals}) => deals.map(company => ({
    key: company.id,
    value: company.id,
    text: company.name,
  })),
);


export const getSelectBoxDealCampaigns = createSelector(
  state => state.deals,
  (state) => {
    const {deals, filters} = state;
    const deal = deals.find(deal => deal.id === filters.dealId);
    if (deal) {
      return deal.campaigns && deal.campaigns.map(campaign => ({
        key: campaign.id,
        value: campaign.id,
        text: campaign.name,
      }));
    }
    return [];
  },
);

export const getSelectBoxDealCampaignAgents = createSelector(
  state => state.deals,
  (state) => {
    const {deals, filters} = state;
    const deal = deals.find(deal => deal.id === filters.dealId);
    if (deal) {
      const campaign = deal.campaigns && deal.campaigns.find(campaign => campaign.id === filters.campaignId);
      if (campaign) {
        return campaign.agents && campaign.agents.map(agent => ({
          key: agent.id,
          value: agent.id,
          text: agent.name,
        }));
      }
    }

    return [];
  },
);

export const getGraphicStatistics = createSelector(
  state => state.dealsStatistics,
  (dealsStatistics) => {
    return R.pipe(
      R.pathOr([], ['records']),
      R.values,
      R.reduce(function (acc, records) {
        return acc.concat(records);
      }, [])
    )(dealsStatistics);
  }
)

export const getSelectedGraphicCStatistics = createSelector(
  state => getGraphicStatistics(state),
  state => state.displayGraphicDate,
  state => state.dealsStatistics.totalLeadsCount,
  (dealsGraphic, displayGraphicDate, totalLeadsCount) => R.pipe(
      R.pluck(['records']),
      R.flatten,
      R.filter((record) => {
        return (displayGraphicDate !== 'all' ? R.propEq('created_date', displayGraphicDate, record) : true);
      }),
      R.reduce((acc, record) => {
        if (!R.hasPath([record.integration], acc)) {
          acc[record.integration] = {};
        }
        const leadsCount = R.pathOr(0, [record.integration, 'totalLeadsCount'], acc);
        const integrationFound = selectBoxIntegrations.find(R.propEq('key', record.integration));

        acc[record.integration].totalLeadsCount = (leadsCount + record.leadsCount);
        acc[record.integration].integration = record.integration;
        acc[record.integration].leadsPercentage = +(((leadsCount + record.leadsCount) / totalLeadsCount) * 100).toFixed(0);
        acc[record.integration].integrationDisplayName = integrationFound.text;

        return acc;
      }, {}),
      R.values,
    )(dealsGraphic)
)
