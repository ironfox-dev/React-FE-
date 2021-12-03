export const TYPE_SMS_MESSAGE = 'SMS';
export const TYPE_EMAIL_MESSAGE = 'EMAIL';
export const TYPE_PUSH_NOTIFICATION  = 'PUSH_NOTIFICATION';
export const TYPE_BLIND_CALL = 'BLIND_CALL';
export const TYPE_LEAD_CHANGE_STATUS = 'CHANGE_STATUS';

export const actionTypes = [
  {
    key: TYPE_SMS_MESSAGE,
    text: 'Text message',
    value: TYPE_SMS_MESSAGE,
  },
  {
    key: TYPE_EMAIL_MESSAGE,
    text: 'Mail message',
    value: TYPE_EMAIL_MESSAGE,
  },
  {
    key: TYPE_PUSH_NOTIFICATION,
    text: 'Agent notification',
    value: TYPE_PUSH_NOTIFICATION,
  },
  {
    key: TYPE_LEAD_CHANGE_STATUS,
    text: 'Lead status change',
    value: TYPE_LEAD_CHANGE_STATUS,
  },
  {
    key: TYPE_BLIND_CALL,
    text: 'Blind call',
    value: TYPE_BLIND_CALL,
  }
];

export const checkIsTypeEmail = (type) => type === TYPE_EMAIL_MESSAGE;
export const checkIsTypePushNotification = (type) => type === TYPE_PUSH_NOTIFICATION;
export const checkIsBlindCall = (type) => type === TYPE_BLIND_CALL;
export const checkIsTypeText = (type) => type === TYPE_SMS_MESSAGE;
export const checkIsTypeStatusChange = (type) => type === TYPE_LEAD_CHANGE_STATUS;
