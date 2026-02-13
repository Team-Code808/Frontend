import React from "react";
import {
  ChevronLeft,
  Key,
  CheckCircle,
  XCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../Signup.style";

const StaffSignup = ({
  formData,
  onChange,
  onSubmit,
  companyVerification,
  onVerify,
  setFormData,
  setCompanyVerification,
  isCustomPos,
  setIsCustomPos,
}) => {
  const navigate = useNavigate();

  return (
    <S.Form onSubmit={onSubmit} animate>
      <S.StepHeader>
        <S.BackButton type="button" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </S.BackButton>
        <h3>참여 신청</h3>
      </S.StepHeader>

      <S.InputGroup>
        <label>회사 코드</label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <S.InputWrapper style={{ flex: 1 }}>
            <Key />
            <S.Input
              type="text"
              required
              placeholder="공유받은 회사 코드 입력"
              value={formData.companyCode}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  companyCode: e.target.value.toUpperCase(),
                }));
                setCompanyVerification({
                  verified: false,
                  companyName: "",
                  departments: [],
                  ranks: [],
                  attempted: false,
                });
              }}
              style={{ textTransform: "uppercase" }}
            />
          </S.InputWrapper>
          <S.VerifyButton
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await onVerify();
              } catch (error) {
                console.error("회사 코드 검증 실패:", error);
              }
            }}
            disabled={!formData.companyCode}
          >
            검증
          </S.VerifyButton>
        </div>
        {companyVerification.verified && (
          <S.VerificationMessage success>
            <CheckCircle size={16} />
            <span>{companyVerification.companyName}입니다</span>
          </S.VerificationMessage>
        )}
        {companyVerification.attempted && !companyVerification.verified && (
          <S.VerificationMessage error>
            <XCircle size={16} />
            <span>없는 코드입니다</span>
          </S.VerificationMessage>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <label>
          부서
          {!companyVerification.verified && (
            <span
              style={{
                fontSize: "0.625rem",
                color: "#fb7185",
                marginLeft: "0.5rem",
              }}
            >
              (회사 코드 검증 후 선택 가능)
            </span>
          )}
        </label>
        <S.Select
          noIcon
          required
          disabled={!companyVerification.verified}
          name="departmentId"
          value={formData.departmentId}
          onChange={onChange}
          variant="indigo"
        >
          <option value="" disabled>
            {companyVerification.verified
              ? "부서 선택"
              : "회사 코드를 먼저 검증해주세요"}
          </option>
          {companyVerification.verified &&
            companyVerification.departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.departmentName}
              </option>
            ))}
        </S.Select>
      </S.InputGroup>

      <S.InputGroup>
        <label>
          직급 / 직책
          {!companyVerification.verified && (
            <span
              style={{
                fontSize: "0.625rem",
                color: "#fb7185",
                marginLeft: "0.5rem",
              }}
            >
              (회사 코드 검증 후 선택 가능)
            </span>
          )}
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <S.Select
            noIcon
            required
            disabled={!companyVerification.verified}
            value={isCustomPos ? "custom" : formData.rankId}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "custom") {
                setIsCustomPos(true);
                setFormData((prev) => ({ ...prev, rankId: "" }));
              } else {
                setIsCustomPos(false);
                setFormData((prev) => ({ ...prev, rankId: val }));
              }
            }}
            variant="indigo"
          >
            <option value="" disabled>
              {companyVerification.verified
                ? "직급 선택"
                : "회사 코드를 먼저 검증해주세요"}
            </option>
            {companyVerification.verified &&
              companyVerification.ranks.map((rank) => (
                <option key={rank.rankId} value={rank.rankId}>
                  {rank.rankName}
                </option>
              ))}
            {companyVerification.verified && (
              <option value="custom">직접 입력 (기타)</option>
            )}
          </S.Select>
          {isCustomPos && (
            <S.Input
              noIcon
              type="text"
              required
              placeholder="직급 직접 입력"
              value={formData.rankId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rankId: e.target.value }))
              }
              style={{ animation: "fadeIn 0.3s" }}
            />
          )}
        </div>
      </S.InputGroup>

      <S.InfoBox variant="indigo">
        <p>
          <ShieldCheck
            size={14}
            style={{ display: "inline", marginRight: 4 }}
          />
          관리자의 승인이 완료된 후 서비스를 이용하실 수 있습니다.
        </p>
      </S.InfoBox>

      <S.SubmitButton type="submit" variant="indigo">
        참여 신청하기
        <CheckCircle2 size={24} />
      </S.SubmitButton>
    </S.Form>
  );
};

export default StaffSignup;
