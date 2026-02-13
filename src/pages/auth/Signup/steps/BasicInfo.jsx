import React from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../Signup.style";

const BasicInfo = ({ formData, onChange, onNext }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.StepHeader>
        <S.BackButton type="button" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </S.BackButton>
        <h3>기본 정보 입력</h3>
      </S.StepHeader>

      <S.Grid2>
        <S.InputGroup>
          <label>이름</label>
          <S.Input
            noIcon
            type="text"
            required
            placeholder="이름"
            name="name"
            value={formData.name}
            onChange={onChange}
          />
        </S.InputGroup>
        <S.InputGroup>
          <label>연락처</label>
          <S.Input
            noIcon
            type="tel"
            required
            placeholder="010-0000-0000"
            name="phone"
            value={formData.phone}
            onChange={onChange}
          />
        </S.InputGroup>
      </S.Grid2>

      <S.InputGroup>
        <label>아이디 (이메일)</label>
        <S.Input
          noIcon
          type="email"
          required
          placeholder="example@company.com"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <label>비밀번호</label>
        <S.Input
          noIcon
          type="password"
          required
          placeholder="8자 이상 입력"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
      </S.InputGroup>

      <S.SubmitButton type="submit">
        다음 단계
        <ArrowRight size={18} />
      </S.SubmitButton>
    </S.Form>
  );
};

export default BasicInfo;
