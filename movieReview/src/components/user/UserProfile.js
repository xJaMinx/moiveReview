import React, { useEffect, useState } from "react";
import useAppStore from "store/useAppStore";
import "./UserProfile.css";
import { Link, useParams } from "react-router-dom";
import dbApi from "db/DB";

const UserProfile = () => {
    const {id} = useParams();
    const loginUser = useAppStore((state) => state.currentUser);
    // const loginUserInfo = useAppStore((state) => state.currentUserInfo);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
        const data = await dbApi.readUserInfo(id);
        setUserInfo(data);
        };

        if (id) fetchUserInfo();
    }, [id]);

    return (
        <>
            {id === loginUser?.uid && (
                <div className="user-profile-action-bar">
                    <Link to='/user/profile/edit' className="user-profile-edit-link">
                        프로필 수정
                    </Link>
                </div>
            )}
            <div className="user-profile-card">
                <div className=" user-profile-row">
                    <span className="user-profile-label">이름 : </span>
                    <span className="user-profile-value">{userInfo?.name}</span>
                </div>
            
                <div className=" user-profile-row">
                    <span className="user-profile-label">생년월일 : </span>
                    <span className="user-profile-value">{userInfo?.birth}</span>
                </div>

                <div className=" user-profile-row">
                    <span className="user-profile-label">전화번호 : </span>
                    <span className="user-profile-value">{userInfo?.phone}</span>
                </div>
            </div>   
        </>
    )
}

export default UserProfile;
