import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dbApi from "db/DB";
import "./Auth.css";

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        if (!email || !pwd || !pwdCheck || !name || !birth || !phone) {
            alert("모든 항목을 입력해주세요");
            return;
        }

        if (pwd !== pwdCheck) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        const newUser = {
            email,
            pwd,
            name,
            birth,
            phone,
        };

        try {
            await dbApi.authSignup(newUser);
            alert("회원가입이 완료되었습니다");
            navigate("/login");
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다");
        }
    };

    return (
        <section className="auth-page">
            <div className="auth-box">
                <h2 className="auth-title">회원가입</h2>

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

                    <input
                        className="auth-input"
                        type="password"
                        value={pwdCheck}
                        onChange={(e) => setPwdCheck(e.target.value)}
                        placeholder="비밀번호 확인을 입력하세요"
                    />

                    <input
                        className="auth-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름을 입력하세요"
                    />

                    <input
                        className="auth-input"
                        type="date"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                    />

                    <input
                        className="auth-input"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="전화번호를 입력하세요"
                    />
                    <button className="auth-submit-btn" type="submit">
                        회원가입
                    </button>
                </form>

                <div className="auth-footer">
                    <span>이미 계정이 있나요?</span>
                    <Link to="/login" className="auth-link-btn">
                        로그인
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Signup;