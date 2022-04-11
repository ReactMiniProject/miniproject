import { createAction, handleActions } from "redux-actions";
import {produce} from "immer";
import axios from "axios";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
  list: [],
}


const addPostDB = (data) => {
  return function(dispatch, getState){
    console.log(data)
    // axios({
    //   method : 'post',
    //   url : 'https://6253cea389f28cf72b52ffe7.mockapi.io',
    //   data : {
    //     articleDesc : text,
    //     articleThumb : imageFile,
    //     articleKind : option,
    //   },
    //   // headers : {
    //   //   Authorization : `sends with token`
    //   // },
    // })
    // .then(response=>{
    //   console.log(response)
    // })
    // .catch(error =>{
    //   console.log(error)
    // })
  }
}


const getPostDB = () => {
  return function (dispatch, getState){
    axios.get('...')
    .then(response => {

    })
    .catch(error =>{
      
    })
  }
}

const getPostModalDB = () => {
  return function (dispatch, getState){
    axios.get('...')
    .then(response => {

    })
    .catch(error =>{
      
    })
  }
}

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list = action.payload.post_list;
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post);
    }),
  }, initialState
);

const actionCreators = {
  setPost,
  addPost,
  addPostDB,
}

export {actionCreators};