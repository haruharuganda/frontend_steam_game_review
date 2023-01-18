import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  __deleteComment,
  __getComments,
} from "../../reduex/modules/commentsSlice";

const CommentsCard = ({ comment }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    const result = window.confirm("이 코멘트를 지울까요?");
    if (result) {
      return dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  return (
    <>
      <STcard>
        <div>
          <div>{comment.id}</div>
          <div>{comment.comment}</div>
        </div>
        <div>
          <button onClick={""}>수정</button>
          <button onClick={onDeleteHandler}>삭제</button>
        </div>
      </STcard>
    </>
  );
};

export default CommentsCard;

const STcard = styled.div`
  display: flex;
  justify-content: space-between;

  border: 1px solid white;
  border-radius: 5px;

  padding: 10px;
  margin-bottom: 10px;

  background-color: #102646;
`;
