import * as R from 'ramda';

export const getSelectBoxStatuses = state => {
    const statusesName = R.keys(state.leads.statuses);
    return R.map(status => {
            return {
                kay: status,
                text: state.leads.statuses[status].name || status,
                value: status,
                label: {color: state.leads.statuses[status].color, empty: true, circular: true},
            }
        },
        statusesName,
    );
};
