import { createSelector } from 'reselect';
import * as R from 'ramda';

export const getSelectBoxAgencies = createSelector(
  state => state.profile.profile,
  profile => {
    return profile.agencies && profile.agencies.map(agency => ({
      key: R.path(['pivot', 'id'], agency),
      value: R.path(['pivot', 'id'], agency),
      text: agency.name,
    }))
  }
);