import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __postLogin } from "../../reduex/modules/loginSignUp";
const LoginInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //초기값
  const initialState = {
    userId: "",
    password: "",
  };
  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(user);
  //로그인 POST 요청
  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    if (user.userId.trim() === "" || user.password.trim() === "") {
      return alert("빈칸이있습니다");
    }
    dispatch(__postLogin(user));
    console.log(user);
  };

  return (
    <div>
      <LoginContainer>
        <div>
          <h1>login</h1>
        </div>
        <FormBox onSubmit={onSubmitLoginHandler}>
          <div>
            ID :
            <input
              placeholder="아이디를 입력해주세요"
              type="text"
              name="userId"
              onChange={onChangeHandler}
            ></input>
          </div>
          <div>
            PassWord :{" "}
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              placeholder="비밀번호를 입력해주세요"
            ></input>
          </div>
          <div>
            <button> 로그인 </button>
          </div>
        </FormBox>
      </LoginContainer>
    </div>
  );
};

export default LoginInfo;

const LoginContainer = styled.div`
  border: 1px solid white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;

const FormBox = styled.form`
  width: 400px;
  height: 250px;

  border: 1px solid white;

  background-color: #171a21;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  color: white;
`;
