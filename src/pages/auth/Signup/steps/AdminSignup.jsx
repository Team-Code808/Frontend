import React, { useEffect } from "react";
import {
  ChevronLeft,
  Building2,
  Factory,
  Users,
  Sparkles,
  Key,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../Signup.style";
import { generateCompanyCode } from "../api/signupApi";

const AdminSignup = ({ formData, onChange, onSubmit, setFormData }) => {
  const navigate = useNavigate();

  useEffect(() => {
  const fetchCompanyCode = async () => {
    try {
      const response = await generateCompanyCode();
        setFormData((prev) => ({
          ...prev,
          companyCode: response.companyCode,
        }));
    } catch (error) {
      console.error("회사 코드 생성 실패:", error);
    }
  };

    // companyCode가 없을 때만 생성
    if (!formData.companyCode) {
      fetchCompanyCode();
    }
  }, []);

  return (
    <S.Form onSubmit={onSubmit} animate>
      <S.StepHeader>
        <S.BackButton type="button" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </S.BackButton>
        <h3>회사 등록</h3>
      </S.StepHeader>

      <S.InputGroup>
        <label>회사명</label>
        <S.InputWrapper>
          <Building2 />
          <S.Input
            type="text"
            required
            placeholder="회사 이름 입력"
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
          />
        </S.InputWrapper>
      </S.InputGroup>

      <S.InputGroup>
        <label>업종</label>
        <S.InputWrapper>
          <Factory />
          <S.Select
            required
            name="category"
            value={formData.category}
            onChange={onChange}
            variant="blue"
          >
            <option value="" disabled>
              업종 선택
            </option>
            <option value="IT/정보통신">IT/정보통신</option>
            <option value="제조업">제조업</option>
            <option value="서비스업">서비스업</option>
            <option value="도소매/유통">도소매/유통</option>
            <option value="건설/건축">건설/건축</option>
            <option value="의료/보건">의료/보건</option>
            <option value="교육/학문">교육/학문</option>
            <option value="금융/보험">금융/보험</option>
            <option value="미디어/광고">미디어/광고</option>
            <option value="기타">기타</option>
          </S.Select>
        </S.InputWrapper>
      </S.InputGroup>

      <S.Grid2>
        <S.InputGroup>
          <label>최소 인원</label>
          <S.InputWrapper>
            <Users />
            <S.Input
              type="number"
              required
              placeholder="최소 인원"
              name="minValue"
              value={formData.minValue}
              onChange={onChange}
              min="1"
            />
          </S.InputWrapper>
        </S.InputGroup>
        <S.InputGroup>
          <label>최대 인원</label>
          <S.InputWrapper>
            <Users />
            <S.Input
              type="number"
              required
              placeholder="최대 인원"
              name="maxValue"
              value={formData.maxValue}
              onChange={onChange}
              min="1"
            />
          </S.InputWrapper>
        </S.InputGroup>
      </S.Grid2>

      <S.InfoBox variant="blue">
        <p>
          <Sparkles size={14} style={{ display: "inline", marginRight: 4 }} />
          회사를 등록하면 자동으로 총괄 관리자 권한이 부여됩니다.
        </p>
      </S.InfoBox>

      <S.InputGroup>
        <label>회사 코드 (자동 생성됨)</label>
        <S.InputWrapper>
          <Key />
          <S.Input
            type="text"
            readOnly
            value={formData.companyCode}
            placeholder={formData.companyCode ? "" : "코드 생성 중..."}
          />
        </S.InputWrapper>
      </S.InputGroup>

      <S.SubmitButton type="submit" variant="dark">
        등록 완료하기
        <CheckCircle2 size={24} />
      </S.SubmitButton>
    </S.Form>
  );
};

export default AdminSignup;
