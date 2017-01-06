export const OPEN_TAB = 'OPEN_TAB';

export function openTab(item) {
    console.log(item);
    return dispatch => {
        dispatch({
            type: OPEN_TAB,
            payload: item
        });
    };
}
