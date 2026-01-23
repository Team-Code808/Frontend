import React from "react";
import { ChevronLeft, Building2, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../Signup.style";

const SignupType = ({ onSelectType }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        animation: "fadeIn 0.3s",
      }}
    >
      <S.StepHeader>
        <S.BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </S.BackButton>
        <h3>가입 유형 선택</h3>
      </S.StepHeader>

      <S.TypeButton
        activeType="company"
        onClick={() => onSelectType("ADMIN")}
      >
        <S.IconBox color="blue">
          <Building2 size={24} />
        </S.IconBox>
        <h4>회사 등록하기</h4>
        <p>새로운 회사를 등록하고 관리자 권한을 부여받습니다.</p>
      </S.TypeButton>

      <S.TypeButton
        activeType="staff"
        onClick={() => onSelectType("STAFF")}
      >
        <S.IconBox color="indigo">
          <Briefcase size={24} />
        </S.IconBox>
        <h4>회사 참여하기</h4>
        <p>기존에 등록된 회사의 직원으로 참여 신청을 합니다.</p>
      </S.TypeButton>
    </div>
  );
};

export default SignupType;
