import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __addComment,
  __getComments,
} from "../../reduex/modules/commentsSlice";
import CommentsCard from "./CommentsCard";

const CommentsForm = () => {
  // 게임인포에서 보내는 게임 아이디값
  const { id } = useParams();
  console.log("코멘트폼 파람값?", id);

  //게임아이디를 넣기위한 선언문
  const gameid = id;

  const [comment, setComment] = useState({ comment: "", gameid: id });
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  console.log("셀렉터 코멘츠?", comments);

  //코멘트 입력
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
    console.log("코멘트 입력 값", comment);
  };

  //코멘트 POST 요청
  const addComment = () => {
    if (comment.comment.trim() === "") {
      return alert("내용을 입력하세요.");
    }
    dispatch(__addComment({ gameid: id, ...comment }));
    setComment({ comment: "" });
    console.log("에드코멘트의 값", comment, id);
  };

  //코멘트가 추가될때마다 렌더링 해준다. 해당 게임에 맞는 코멘트를 불러오기위해 아이디값을 넣어준다
  useEffect(() => {
    dispatch(__getComments(gameid));
  }, [dispatch]);
  console.log(gameid);
  return (
    <div>
      <CommentContainer>
        <div>commentbox</div>
        <input
          size={40}
          onChange={onChangeHandler}
          name="comment"
          type="text"
          value={comment.comment}
          placeholder="코멘트를 입력하세요."
        ></input>
        <button onClick={addComment}>등록</button>
        <div>commentView</div>
        {/* 서버에서 데이터 불러오는동안 비동기로 처리되기 때문에 배열을 불러올 수 없음 그렇기 때문에 옵셔널 체인링을 사용 */}
        {comments?.map((comment) => (
          <CommentsCard key={comment.id} comment={comment} />
        ))}
      </CommentContainer>
    </div>
  );
};

export default CommentsForm;

const CommentContainer = styled.div`
  border: 1px solid white;

  width: 100%;
  height: 350px;

  margin: 20px auto;

  input {
    width: 85%;
    height: 20px;

    padding: 10px;
    margin: 12px;

    border: none;
    border-radius: 5px;
    font-size: large;
  }
  button {
    padding: 8px 13px;
    margin: 10px;
    font-weight: 700;
    font-size: 20px;

    color: white;
    border: none;
    border-radius: 5px;
    background-color: blue;
    cursor: pointer;
  }
`;
