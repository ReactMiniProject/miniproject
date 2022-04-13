import React from "react";
import "../shared/App.css";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as articleActions } from "../redux/modules/article";
import Article from "../components/Article";
import SideBar from "../components/SideBar";

const MyPage = () => {
  const dispatch = useDispatch();
  const articleList = useSelector((state) => state.article.list);

  React.useEffect(() => {
    dispatch(articleActions.getArticleFB());
  }, []);

  return (
    <React.Fragment>
      
      <ArticleList>
        {articleList.map((a, idx) => {
          return <Article key={a.articleNum} {...a} />;
        })}
      </ArticleList>
      <Bar>
        <SideBar/>
      </Bar>
    </React.Fragment>
  )
}

export default MyPage;

const Bar = styled.div`
  position: fixed;
  top: 150px;
  left: 0;
`;

const ArticleList = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 60px auto 0 auto;
  width: 80%;
`;