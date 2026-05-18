import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "store/useAppStore";
import "./UserProfile.css";

const UserProfileEdit = () => {
    const navigate = useNavigate();
    const loginUser = useAppStore((state) => state.currentUser);
    const loginUserInfo = useAppStore((state) => state.currentUserInfo);
    const updateUserInfo = useAppStore((state) => state.updateUserInfo);
    const [name, setName] = useState(loginUserInfo?.name);
    const [birth, setBirth] = useState(loginUserInfo?.birth);
    const [phone, setPhone] = useState(loginUserInfo?.phone);
    
    const handleSubmit = async () => {
        await updateUserInfo(loginUser.uid, {
            name,
            birth,
            phone,
        });

        navigate("/user/profile/"+loginUser.uid);
    };

    return (
        <>
            <div className="user-profile-action-bar">
                <button
                    type="button"
                    className="user-profile-back-link"
                    onClick={() => navigate('/user/profile/' + loginUser.uid)}
                >
                    프로필로 돌아가기
                </button>
            </div>

            <div className="user-profile-card">
                <div className=" user-profile-row">
                    <span className="user-profile-label">이름 : </span>
                    <span className="user-profile-value">
                        <input
                            className="user-profile-input"
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                        />
                    </span>
                </div>
            
                <div className=" user-profile-row">
                    <span className="user-profile-label">생년월일 : </span>
                    <span className="user-profile-value">
                        <input
                            className="user-profile-input"
                            type="date"
                            value={birth}
                            onChange={(e)=>{setBirth(e.target.value)}}
                        />
                    </span>
                </div>

                <div className=" user-profile-row">
                    <span className="user-profile-label">전화번호 : </span>
                    <span className="user-profile-value">
                        <input
                            className="user-profile-input"
                            type="tel"
                            value={phone}
                            onChange={(e)=>{setPhone(e.target.value)}}
                        />
                    </span>
                </div>
            </div>

            <div className="user-profile-edit-actions">
                <button
                    type="button"
                    className="user-profile-btn secondary"
                    onClick={()=>navigate('/user/profile/'+loginUser.uid)}
                >
                    취소
                </button>
                <button
                    type="button"
                    className="user-profile-btn primary"
                    onClick={handleSubmit}
                >
                    저장
                </button>
            </div>
        </>
    )
}

export default UserProfileEdit;
