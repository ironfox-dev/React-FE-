export const LEAD_REPLY_TYPE_NONE = 'NONE';
export const LEAD_REPLY_TYPE_SMS_REPLY = 'SMS_REPLY';
export const LEAD_REPLY_TYPE_SMS_REPLY_CONTAIN = 'SMS_REPLY_CONTAIN';
export const LEAD_REPLY_TYPE_MAIL_OPEN = 'MAIL_OPEN';

export const leadReplyTypes = [
  {
    key: LEAD_REPLY_TYPE_SMS_REPLY,
    value: LEAD_REPLY_TYPE_SMS_REPLY,
    text: 'On sms reply'
  },
  {
    key: LEAD_REPLY_TYPE_SMS_REPLY_CONTAIN,
    value: LEAD_REPLY_TYPE_SMS_REPLY_CONTAIN,
    text: 'On Sms reply contains'
  }
];
