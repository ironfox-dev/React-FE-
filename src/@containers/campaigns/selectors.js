import { createSelector } from 'reselect';

export const getDeal = createSelector(
  [state => state.deals, state => state.campaigns.dealId],
  ({ deals }, dealId) => deals && deals.find(deal => +deal.id === +dealId),
);