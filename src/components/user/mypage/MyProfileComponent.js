import React from "react";
import {
  AdminMemo,
  IdentCodeWrap,
  MyClassWrap,
  MyInfo,
  ProfileImg,
  ProfileInfo,
  ProfileWrap,
} from "../../../styles/user/mypage";
import { OrangeBtn } from "../../../styles/ui/buttons";
import MyClass from "../MyClass";
import { IMG_URL } from "../../../api/config";

const MyProfileComponent = ({ ilevel, myData, ikid }) => {
  const my = myData;
  return (
    <>
      <ProfileWrap>
        <ProfileImg>
          <img
            src={`${IMG_URL}/pic/kid/${ikid}/${my.profile}`}
            alt={my.kidNm}
          />
        </ProfileImg>
        <ProfileInfo>
          <MyClassWrap state={my.iclass}>
            <MyClass state={my.iclass} admin={true} />
            {ilevel === "admin" ? (
              <IdentCodeWrap>
                <dl>
                  <dt>식별코드</dt>
                  <dd>00000</dd>
                </dl>
                <OrangeBtn>식별코드수정</OrangeBtn>
              </IdentCodeWrap>
            ) : null}
          </MyClassWrap>
          <MyInfo>
            <dl>
              <dt>이름</dt>
              <dd>{my.kidNm}</dd>
            </dl>
            <dl>
              <dt>성별</dt>
              <dd>{my.gender === 0 ? "여자" : "남자"}</dd>
            </dl>
            <dl>
              <dt>생년월일</dt>
              <dd>{my.birth}</dd>
            </dl>
            <dl>
              <dt>주소</dt>
              <dd>{my.address}</dd>
            </dl>
            {ilevel === "admin" ? (
              <dl>
                <dt>비상연락처</dt>
                <dd>홍길동 01000000000</dd>
              </dl>
            ) : null}
          </MyInfo>
        </ProfileInfo>
      </ProfileWrap>
      {ilevel === "admin" ? (
        <AdminMemo>
          <dt>관리자메모</dt>
          <dd>
            <div>입력한내용이 없습니다.</div>
          </dd>
        </AdminMemo>
      ) : null}
    </>
  );
};

export default MyProfileComponent;
