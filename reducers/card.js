import { combineReducers } from 'redux';

const card = (state = {
  // card: {
    name: [],
    status: [],
    content: [],
    category: [],
    author: [],
    like: [],
    numCard: 0
  // }
}, action) => {
  switch (action.type) {
    case "ADD_NEW_CARD" :
      // console.log(state)
      console.log(action);
        state = Object.assign({}, state, {
        name: state.name.concat([action.name]),
        status: state.status.concat([action.status]),
        content: state.content.concat([action.content]),
        category: state.category.concat([action.category]),
        author: state.author.concat([action.author]),
        numCard: state.numCard+1
        })
      return state
    case "REMOVE_CARD" :
      console.log(action);
      state = {
        name: [...state.name.slice(0,action.index),
               ...state.name.slice(action.index+1)],
        status: [...state.status.slice(0,action.index),
                 ...state.status.slice(action.index+1)],
        content: [...state.content.slice(0,action.index),
                  ...state.content.slice(action.index+1)],
        category: [...state.category.slice(0,action.index),
                   ...state.category.slice(action.index+1)],
        author: [...state.author.slice(0,action.index),
                 ...state.author.slice(action.index+1)],
        like: [...state.like.slice(0,action.index),
               ...state.like.slice(action.index+1)],
        numCard: state.numCard - 1
      }
      return state
    case "UPDATE_CARD" :
      console.log(action);
      state = {
        name: [...state.name.slice(0,action.index), action.name,
               ...state.name.slice(action.index+1)],
        status: [...state.status.slice(0,action.index), action.status,
                 ...state.status.slice(action.index+1)],
        content: [...state.content.slice(0,action.index), action.content,
                  ...state.content.slice(action.index+1)],
        category: [...state.category.slice(0,action.index), action.category,
                   ...state.category.slice(action.index+1)],
        author: [...state.author.slice(0,action.index), action.author,
                 ...state.author.slice(action.index+1)],
        like: [...state.like.slice(0,action.index), action.like,
              ...state.like.slice(action.index+1)],
        numCard: state.numCard
      }
      return state
    case "GET_LIKE" :
      console.log(action);
      state = Object.assign({}, state, {
        like: [...state.like.slice(0,action.index), action.num, ...state.like.slice(action.index+1)]
      })
      return state
    default:
      return state
  }
}

export default card ;
