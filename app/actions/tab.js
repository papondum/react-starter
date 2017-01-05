export const OPEN_TAB = 'OPEN_TAB';

export function openTab(item) {
    return dispatch => {
        dispatch({
            type: OPEN_TAB,
            payload: item
        });
    };
}
