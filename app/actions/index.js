import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function openTab(tab) {
    return {
        type: types.OPEN_TAB,
        tab
    };
}
