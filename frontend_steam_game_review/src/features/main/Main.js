import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SimpleSlider from "../../components/SimpleSlider";
import { __getGameList } from "../../reduex/modules/mainSlice";
const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genre = ["ALL", "RPG", "FPS", "ACTION"];
  const { gameList } = useSelector((state) => state.mainSlice);
  const [newList, setNewList] = useState(gameList);

  const selectMenuHandler = (e) => {
    if (e.target.id === "ALL") {
      console.log(e.target.id);
      setNewList(gameList);
    } else {
      console.log(e.target.id);
      const newGameList = gameList.filter(
        (genre) => genre.gameGenre === e.target.id
      );
      setNewList(newGameList);
    }
  };

  useEffect(() => {
    dispatch(__getGameList());
  }, []);

  useEffect(() => {
    setNewList(gameList);
  }, [gameList]);

  return (
    <>
      <Container>
        <ImgContainer>
          <SimpleSlider />
        </ImgContainer>
        <ContentContainer>
          <ContentBox>
            <div>
              <TabMenu>
                {genre.map((content, index) => {
                  return (
                    <Menu key={index} id={content} onClick={selectMenuHandler}>
                      {content}
                    </Menu>
                  );
                })}
              </TabMenu>

              {newList.map((contnet, index) => {
                return (
                  <Desc
                    onClick={() => {
                      navigate(`/Detail/${contnet.id}`);
                    }}
                    key={index}
                  >
                    <ContentImgBox>
                      <ContentImg src={contnet.gameImage}></ContentImg>
                    </ContentImgBox>
                    <Title>{contnet.gameName}</Title>
                  </Desc>
                );
              })}
            </div>
          </ContentBox>
        </ContentContainer>
      </Container>
    </>
  );
};

export default Main;
const Container = styled.div`
  max-width: 100%;
  min-width: 300px;

  margin-left: 100px;
  margin-right: 100px;

  overflow: hidden;
`;

const ImgContainer = styled.div`
  max-width: 100%;
  min-width: 20%;
`;

const Button = styled.button`
  height: 300px;
`;

const ContentContainer = styled.div`
  height: 80vh;
  background-color: azure;

  overflow: scroll;
  background-color: #4e697d;
`;

const ContentBox = styled.div``;

const TabMenu = styled.ul`
  height: 35px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
`;
const Menu = styled.li`
  margin: 5px;
`;
const Desc = styled.div`
  display: flex;
  background-color: #4e697d;
  background: linear-gradient(to bottom, #306287 0%, #2f4d63 35%);

  align-items: center;
`;
const ContentImgBox = styled.div`
  margin-left: 3px;
  margin-top: 3px;
  margin-right: 75px;
`;
const ContentImg = styled.img`
  height: 100px;
  width: 150px;
  margin: 10px, 10px;
`;
const Title = styled.p`
  color: white;
`;
