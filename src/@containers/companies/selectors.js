import { createSelector } from 'reselect';
import * as R from 'ramda';

export const selectBoxCompanies = createSelector(
  state => state.companies.selectBoxCompanies,
  selectBoxCompanies => selectBoxCompanies.map(company => ({
    key: company.id,
    value: company.id,
    text: company.name,
  })),
);

export const selectBoxDealCampaigns = createSelector(
  [state => state.companies.selectBoxCompanies, state => state.companies.companyId],
  (selectBoxCompanies, companyId) => {
    if (selectBoxCompanies && selectBoxCompanies.length) {
      const company = selectBoxCompanies.find(company => +company.id === +companyId);
      if (company && company.campaigns && company.campaigns.length) {
        return company.campaigns.map(campaign => ({
          key: campaign.id,
          value: campaign.id,
          text: campaign.name,
        }))
      }
    }
    return []
  },
);

export const selectBoxTimezones = createSelector(
  [state => state.companies.selectBoxTimezones],
  (selectBoxTimezones) => {
    if (selectBoxTimezones && selectBoxTimezones.length) {
      return selectBoxTimezones.map(timezone => ({
        key: timezone.id,
        value: timezone.name,
        text: timezone.name,
      }))
    }
    return []
  },
);

export const companyLeadStatsRecords = createSelector(
    [state => state.companies.companyLeadStats],
    (companyLeadStats) => {
        return R.reduce((acc, { creation_date, total_leads_count, total_leads_converted }) => {
            acc.push({
                total_leads_count,
                total_leads_converted,
                name: creation_date,
            });

            return acc;
        }, [], Object.values((companyLeadStats.records || {})))
    }
);