export const SELECTED_TAB = 'SELECTED_TAB'
export function selectedTab(name){
  return dispatch=>{
    dispatch({
      type:SELECTED_TAB,
      payload:name
    })
  }
}
