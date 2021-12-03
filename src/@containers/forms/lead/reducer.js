import { CHANGE_LEAD, LOAD_LEAD, SAVED_LEAD } from './actions';
import {Auth} from "@services";

const initState = {
    formSaved: false,
    form: {
        title: '',
        show: false,
        id: null,
        company_id: '',
        campaign_id: '',
        agent_id: '',
        deal_id: '',
        fullname: '',
        status: '',
        email: '',
        phone: '',
        metadata: '',
    },
    required: {
        fullname: true,
        status: true,
        email: true,
        phone: true,
        company_id: Auth.isAgency,
        deal_campaign_id: true,
        agent_id: true,
    },
};

const leadForm = (state = initState, action) => {
    switch (action.type) {
        case LOAD_LEAD: {
            return {
                ...state,
                formSaved: false,
                form: {
                    ...action.form,
                    title: !action.form.id ? 'Create Lead' : 'Edit lead',
                },
            };
        }
        case CHANGE_LEAD: {
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.form,
                },
            };
        }
        case SAVED_LEAD: {
            return {
                ...state,
                formSaved: true,
                form: {
                    ...state.form,
                    ...action.form,
                    show: false,
                },
            };
        }
        default: {
            return state;
        }
    }
};

export default leadForm;
