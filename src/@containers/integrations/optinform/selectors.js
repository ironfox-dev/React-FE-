import { createSelector } from 'reselect';
import * as R from 'ramda';

export const getIntegrationForm = createSelector(
  state => R.pathOr({}, [
    'integrations',
    'optinForm',
    'campaign',
    'integration_config'
  ], state),
  R.pipe(
    values => R.mapObjIndexed((field, key) => ({...field, name: key}), values),
    R.values, R.filter(R.has('isVisible')), R.sortWith([
      R.ascend(R.prop('order')),
      R.descend(R.prop('isRequired')),
    ]))
);