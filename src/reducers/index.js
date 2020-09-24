  import {CHECK_INTERNET, USERNAME, PROFILE_IMAGE, AUTH_TOKEN, IS_SUPERHOST, GROUP,LOGOUT,IS_USERHOST} from '../actions/actionTypes'
  const INITIAL_STATE = {
    Connected: '',
    username: '',
    image: 'null',
    auth_token: '',
    is_superhost: false,
    is_userhost: false,
    isError: false,
    errorMsg: '',
    
  };

  const reducer = (state = INITIAL_STATE, action) => {
    state.isError = false;
    switch(action.type){
      case CHECK_INTERNET:
        return {
          ...state,
          Connected: action.payload
        }
        case 'SETGROUPDATA':
        return {
          ...state,
          groupData: action.data
        }

      case PROFILE_IMAGE:
          return {
            ...state,
            image: action.payload
          }
      case USERNAME:
        return {
          ...state,
          username: action.payload
        }
      case AUTH_TOKEN:
        return {
          ...state,
          auth_token: action.payload
        }
      case IS_SUPERHOST:
        return {
          ...state,
          is_superhost: action.payload
        }
      case IS_USERHOST:
        return {
          ...state,
          is_userhost: action.payload
        }
      case GROUP:
        return {
          ...state,
          group: action.payload
        }
      case LOGOUT:
        return{
            Connected: '', 
            image: 'null',
            auth_token: '',
            username:'',
            isError: false,
            errorMsg: '',
k        }
      default:
        return {...state}
    }
  };

  export default reducer;