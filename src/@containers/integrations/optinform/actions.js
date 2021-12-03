export const LOAD_CAMPAIGN_INTEGRATION = 'LOAD_CAMPAIGN_INTEGRATION';
export const CHANGE_FIELD_INTEGRATION = 'CHANGE_FIELD_INTEGRATION';
export const RESET_FORM = 'RESET_FORM';

export const loadCampaignIntegration = campaign => ({
  type: LOAD_CAMPAIGN_INTEGRATION,
  campaign
});


export const changeField = field => ({
  type: CHANGE_FIELD_INTEGRATION,
  field,
});

export const resetForm = form => ({
  type: RESET_FORM,
  form,
});
