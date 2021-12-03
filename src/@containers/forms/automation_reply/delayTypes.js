export const DELAY_TYPE_TIME = 'TIME';
export const DELAY_TYPE_DAYS = 'DAYS';

export const delayTypes = [
  {
    key: DELAY_TYPE_TIME,
    value: DELAY_TYPE_TIME,
    text: 'Time'
  },
  {
    key: DELAY_TYPE_DAYS,
    value: DELAY_TYPE_DAYS,
    text: 'Days'
  }
]

export const checkTypeIsDays = (delayType) => {
  return delayType && delayType.toUpperCase() === DELAY_TYPE_DAYS;
}
