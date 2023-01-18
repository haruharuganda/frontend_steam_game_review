import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __signUp, __idCheck } from "../../reduex/modules/loginSignUp";

const SignUpInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    userid: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  console.log(user);

  //유저 스테이트 구조분해 할당
  const { userid, password, passwordCheck, email } = user;

  //유효성 메시지
  const [emailInputMessage, setEmailInput] = useState("");
  const [passInputmessage, setPassInput] = useState("");
  const [passCheckInput, setPassCheckInput] = useState("");
  const [idInputmessage, setIdInput] = useState("");

  //정규식
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\\d@$!%*#?&]{8,20}$/;
  const regId = /^[a-z0-9_-]{4,20}$/;

  //유효성검사
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((userInfo) => {
      return { ...userInfo, [name]: value };
    });

    if (name === "userid")
      !regId.test(value)
        ? setIdInput("아이디는 영어로 입력해주세요")
        : setIdInput("");

    if (name === "password")
      !regPassword.test(value)
        ? setPassInput(
            `8~16자의 영문 대소문자와 숫자로 입력해주세요.
                특수문자(!@#$%^&*)도 사용 가능합니다.`
          )
        : setPassInput("");

    if (name === "passwordCheck")
      password !== value
        ? setPassCheckInput("비밀번호가 불일치합니다")
        : setPassCheckInput("");

    if (name === "email")
      !regEmail.test(value)
        ? setEmailInput("이메일 형식으로 입력해주세요.")
        : setEmailInput("");
  };

  //id중복확인

  const idCheck = () => {
    dispatch(__idCheck);
  };

  //회원가입 POST 요청 및 공백 존재 시 경고창
  const onSubmitUserHandler = (e) => {
    e.preventDefault();
    console.log(password, passwordCheck);

    //빈칸유효성 검사
    if (
      (userid.trim() === "" && userid.length >= 4) ||
      (password.trim() === "" &&
        password.length >= 8 &&
        password.length < 21) ||
      passwordCheck.trim() === "" ||
      email.trim() === ""
    ) {
      return alert("아이디랑 비밀번호를 올바르게 입력해주세요!");
    }

    //비밀번호 확인및 비밀번호 일치여부
    if (password !== passwordCheck) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    dispatch(
      __signUp({
        userid,
        password,
        email,
      })
    );

    navigate("/");
  };

  return (
    <div>
      <LoginContainer>
        <div>
          <h1>Sign Up</h1>
        </div>
        <FormBox onSubmit={onSubmitUserHandler}>
          <div>
            ID :
            <InputBox
              type={"text"}
              placeholder="아이디를 입력해주세요(4자 이상)"
              name="userid"
              value={userid}
              onChange={onChangeHandler}
            ></InputBox>
            <button onClick={idCheck}>아이디 중복확인</button>
            <p id="help-user" className="help">
              {idInputmessage}
            </p>
          </div>
          <div>
            PassWord :
            <InputBox
              type={"password"}
              name="password"
              placeholder="비밀번호를 입력해주세요(8~20자)"
              maxLength={20}
              value={password}
              onChange={onChangeHandler}
            ></InputBox>
            <p id="help-password1" className="help">
              {passInputmessage}
            </p>
          </div>
          <div>
            PasswordCheck :
            <InputBox
              type="password"
              name="passwordCheck"
              placeholder="비밀번호를 입력해주세요(8~20자)"
              maxLength={20}
              value={passwordCheck}
              onChange={onChangeHandler}
            ></InputBox>
            <p id="help-password1" className="help">
              {passCheckInput}
            </p>
          </div>

          <div>
            Email :
            <InputBox
              name="email"
              type="email"
              value={email}
              placeholder="Email을 입력해주세요"
              onChange={onChangeHandler}
            ></InputBox>
            <p id="help-user" className="help">
              {emailInputMessage}
            </p>
          </div>
          <div>
            <button> 회원가입 </button>
          </div>
          <div>
            <button> 이전으로 </button>
          </div>
        </FormBox>
      </LoginContainer>
    </div>
  );
};

export default SignUpInfo;

const LoginContainer = styled.div`
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

const InputBox = styled.input`
  width: 250px;
`;
