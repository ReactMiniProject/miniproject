import styled from "styled-components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header>
        For Fun
      </Header>
    </div>
  );
}

const Header = styled.div`
  background: #ff6f61;
  height: 60px;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
