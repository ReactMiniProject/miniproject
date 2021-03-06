import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";


// actions
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SET_PROFILE = "SET_PROFILE"
const SET_MYLIKE = "SET_MYLIKE"

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const setProfile = createAction(SET_PROFILE, (user) => ({ user }));
const setMyLike = createAction(SET_MYLIKE, (articleList) => ({ articleList }));


// initialState
const initialState = {
  user: null,
  is_login: false,
  profile: null,
  list: []
};

// 미들웨어
const loginDB = (id, pw) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://3.35.27.190/user/login",
      data: {
        userId: id,
        userPw: pw,
      }
    }).then( res => {
      const token = res.data.logInToken;
      setCookie("is_login", token);
      sessionStorage.setItem("token", token)
      
      dispatch(setUser(id));
      history.push("/");
    }).catch( err => {
      window.alert("로그인 실패!");
    })
    
  
  };
};

// (회원가입)
const signUpDB = (id, name, pw) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://3.35.27.190/user/signUp",
      data: {
        userId: id,
        userName: name,
        userPw: pw,
      },
    }).then(response => {
      history.push("/login");
    }).catch(error => {
      window.alert(error);
    })
  };  
};

// (로그아웃)
const logOutDB = () => {
  return function (dispatch, getState) {
    dispatch(logOut());
    sessionStorage.removeItem("token");
    deleteCookie("is_login");
  };
};

// 개인정보 수정시 비밀번호 체크
const checkPwDB = (pw) => {
  const cookie = getCookie("is_login");
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://3.35.27.190/api/pwCheck",
      data: {
        userPw: pw,
      },
      headers: {
        Authorization: `Bearer${cookie}`
      }
    }).then( res => {
      history.push("/mypage/changenick");
    }).catch( err => {
      console.log(err);
      window.alert("비밀번호가 틀렸습니다!");
    })
  }
}

// 닉네임변경
const editProfileDB = (formData) => {
  const cookie = getCookie("is_login");
  return function (dispatch, getState, { history }) {
    axios({
      method: "put",
      url: "http://3.35.27.190/api/myInfoUpdate",
      data: formData,
      headers: {
        Authorization: `Bearer${cookie}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then( res => {
      window.alert("수정되었습니다!");
      dispatch(setProfile());
      history.push("/mypage")
    }).catch( err => {
      console.log(err);
      window.alert("실패했습니다!")
    })
  }
}

// 마이페이지에서 좋아요 누른 게시물 가져오기
const getLikeArticleDB = () => {
  const cookie = getCookie("is_login");
  return function (dispatch, getState, {history}) {
    axios({
      method: "get",
      url: "http://3.35.27.190/api/articleLike",
      headers: {
        Authorization: `Bearer${cookie}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(res => {
      let articleList = [];
      const articles = res.data.articles;
      articles.forEach((article) => {
        articleList.push(article);
      })
      dispatch(setMyLike(articleList));
    }).catch(err => {
      console.log(err);
    })
  }
}


// reducer
export default handleActions(
  {
    // 로그인시 받을 데이터
    [SET_USER]: (state, action) => 
      produce(state, (draft) => {
        draft.user = action.payload.user          
        draft.is_login = true;      // draft는 state다. state 값을 바꾼다. 리덕스에 저장
    }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [SET_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.profile = action.payload.user;
      }),
    [SET_MYLIKE]: (state, action) => 
      produce(state, (draft) => {
        draft.list = action.payload.articleList;
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  logOut,
  signUpDB,
  setUser,
  loginDB,
  logOutDB,
  checkPwDB,
  editProfileDB,
  getLikeArticleDB,
};

export { actionCreators };
