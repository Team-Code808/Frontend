import React from "react";
import { ChevronLeft, FileText, PenLine } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import * as S from "../Signup.style";

const SignupMethod = ({ onSelect }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const goToLogin = () => {
    setSearchParams({ step: "LOGIN" });
  };

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
        <S.BackButton type="button" onClick={goToLogin}>
          <ChevronLeft size={20} />
        </S.BackButton>
        <h3>가입 방법 선택</h3>
      </S.StepHeader>

      <S.TypeButton
        activeType="company"
        onClick={() => onSelect("MANUAL")}
      >
        <S.IconBox color="blue">
          <PenLine size={24} />
        </S.IconBox>
        <h4>일반 가입</h4>
        <p>이름, 연락처, 이메일 등을 직접 입력하여 회원가입합니다.</p>
      </S.TypeButton>

      <S.TypeButton
        activeType="staff"
        onClick={() => onSelect("CARD")}
      >
        <S.IconBox color="indigo">
          <FileText size={24} />
        </S.IconBox>
        <h4>명함으로 가입</h4>
        <p>명함 사진을 촬영하거나 업로드하면 인적사항이 자동으로 채워집니다.</p>
      </S.TypeButton>
    </div>
  );
};

export default SignupMethod;
