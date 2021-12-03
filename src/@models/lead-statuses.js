import * as R from "ramda";
import titleCase from "title-case"

export const LeadStatuses = {
    NEW: {
        color: 'purple',//'#6435c9',
        icon: 'N',
    },
    VIEWED: {
        color: 'teal',//'#2cb3c8',
        icon: 'V',
        name: 'Follow-up'
    },
    CONTACTED_SMS: {
        color: 'orange',//'#f2711c',
        icon: 'C',
    },
    CONTACTED_CALL: {
        color: 'orange',//'#f2711c',
        icon: 'C',
    },
    CONTACTED_EMAIL: {
        color: 'orange',//'#f2711c',
        icon: 'C',
    },
    MISSED: {
        color: 'red',//'#db2828',
        icon: 'M',
    },
    BAD: {
        color: 'red',//'#db2828',
        icon: 'B',
    },
    SOLD: {
        color: 'green',//'#21ba45',
        icon: 'S',
    },
};

export const getSelectBoxStatuses = R.pipe(R.mapObjIndexed((object, status) => {
    return {key: status, text: object.name || titleCase(R.replace(/_/g, ' ', status)), value: status};
}), R.values)(LeadStatuses);