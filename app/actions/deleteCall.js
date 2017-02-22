import {post } from '../../utils'
export const DELETE_USERACC_TRIGGER = 'DELETE_USERACC_TRIGGER'
export const DELETE_USERACC_IDLE = 'DELETE_USERACC_IDLE'
export function deleteAcc(){        // go to reducer deleteCall
  return {
    type:DELETE_USERACC_TRIGGER
  }
}

export function deleteAccToIdle(){    
  return {
    type:DELETE_USERACC_IDLE
  }
}

export function deleteTrig(item){           //Trigger state   do noti
  switch (item) {
    case 'User account':
      return dispatch =>{
        dispatch(deleteAcc())
      }
      break;
    }

}

export function deleteItem(item,type){      //Action state   do delete
  //need switch case for select api by type

  return dispatch=> {
    post('/user/delete',item)
    .then((response)=> {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      //Notify fn value deleted
      console.log(response);
      dispatch(deleteAccToIdle())
    })
    .catch(err=>console.log(err))
  }
}
