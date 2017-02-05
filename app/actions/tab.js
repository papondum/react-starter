export const OPEN_TAB = 'OPEN_TAB';
export const SET_HEAD = 'SET_HEAD';
export const SET_SUB_HEAD = 'SET_SUB_HEAD';
export function openTab(item) {
    return dispatch => {
        dispatch({
            type: OPEN_TAB,
            payload: item
        });
    };
}
export function setHeader(item) {
    return {
        type: SET_HEAD,
        payload: item
    };
}

export function setSubHeader(item) {
    return {
        type: SET_SUB_HEAD,
        payload: item
    };
}
