export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer ? reducer(state, action.payload) : state;
    };
}
export function  getJson(url){

      // var url = 'http://localhost:4040/users'

      fetch(url)
      .then((response)=> {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data)=> {
        return data
      })
}
