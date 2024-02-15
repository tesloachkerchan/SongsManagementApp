
import styled from '@emotion/styled';

const TopbarContainer = styled.div`
height: 50px;
    width: 100%;
    background-color: black
        /*#1877f2*/
    ;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;
    `;
const TopbarLeft = styled.div`
    flex: 3;
    `;
const Logo = styled.span`
    font-size: 24px;
    margin-left: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;`
function Topbar() {
  return (
      <TopbarContainer>
      <TopbarLeft>
          <Logo>SongApp</Logo>
      </TopbarLeft>
    </TopbarContainer>
    
  )
}

export default Topbar
