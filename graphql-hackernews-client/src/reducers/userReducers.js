const userReducer = (state = {}, action) => {


  switch (action.type) {
    case "LOGIN_DONE" :
      return Object.assign({}, state, action.token)
    case "LOGOUT" :
      return {};
    default :
      return state;
  }
}

export default userReducer;