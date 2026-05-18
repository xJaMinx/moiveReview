import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dest = location.state?.from?.pathname || "/";

  const login = useAppStore((state) => state.login);
  const currentUser = useAppStore((state) => state.currentUser);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate(dest);
    }
  }, [currentUser, dest, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !pwd.trim()) {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    const isSuccess = await login(email, pwd);

    if (!isSuccess) {
      alert("로그인에 실패했습니다");
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-box">
        <h2 className="auth-title">로그인</h2>

        <form className="auth-form" onSubmit={submit}>
          <input
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />

          <input
            className="auth-input"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />

          <button className="auth-submit-btn" type="submit">
            로그인
          </button>
        </form>

        <div className="auth-footer">
          <span>아직 계정이 없나요?</span>
          <Link to="/signup" className="auth-link-btn">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;