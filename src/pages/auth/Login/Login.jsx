import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Building2,
  Briefcase,
  ChevronLeft,
  Factory,
  Users,
  Key,
  ShieldCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { UserRole } from "../../../constants/types";
import Logo from "../../../components/Logo";
import * as S from "./Login.styles";

const DEPARTMENTS = [
  "CS 상담 1팀",
  "CS 상담 2팀",
  "VIP 전담팀",
  "기술 지원팀",
  "고객 만족팀(QA)",
  "운영 지원팀",
  "교육 훈련팀",
  "민원 전담팀",
  "아웃바운드 영업팀",
  "인사/채용팀",
];

const POSITIONS = [
  "수습 상담원",
  "전문 상담원",
  "선임 상담원",
  "QAA (품질관리)",
  "강사 (사내교육)",
  "파트장 (PL)",
  "팀장 (TL)",
  "매니저",
  "실장",
  "센터장",
];

const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

import useStore from "../../../store/useStore";

const AuthPage = () => {
  const login = useStore((state) => state.login);
  const onLogin = login;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "LOGIN";

  const setStep = (newStep) => {
    setSearchParams({ step: newStep });
  };
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    phone: "",

    companyName: "",
    companyCode: "",
    industry: "",
    companySize: "",
    department: "",
    position: "",
  });

  const [isCustomPos, setIsCustomPos] = useState(false);
  const [companyVerification, setCompanyVerification] = useState({
    verified: false,
    companyName: "",
    departments: [],
    attempted: false, // 검증 시도 여부
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const isSpecialAdmin = formData.id === "admin";

    const storedApps = JSON.parse(
      localStorage.getItem("params_applications") || "[]"
    );
    const pendingUser = storedApps.find((u) => u.id === formData.id);

    if (pendingUser) {
      onLogin({
        ...pendingUser,
        role: UserRole.STAFF,
      });
      navigate("/app/dashboard");
      return;
    }

    onLogin({
      id: formData.id || "demo_user",
      name: formData.name || "김철수",
      role: isSpecialAdmin ? UserRole.ADMIN : UserRole.STAFF,
      department: "상담 1팀",
      phone: formData.phone,
      joinStatus: "APPROVED",
    });
    navigate("/app/dashboard");
  };

  const handleBasicSignupSubmit = (e) => {
    e.preventDefault();
    setStep("SIGNUP_TYPE");
  };

  const handleAdminSignup = (e) => {
    e.preventDefault();

    // 회사 정보를 localStorage에 저장
    const companies = JSON.parse(localStorage.getItem("companies") || "[]");
    const newCompany = {
      companyCode: formData.companyCode,
      companyName: formData.companyName,
      departments: ["상담 1팀", "상담 2팀", "상담 3팀"], // 기본 부서
    };

    // 이미 존재하는지 확인
    const existingIndex = companies.findIndex(
      (c) => c.companyCode === formData.companyCode
    );
    if (existingIndex >= 0) {
      companies[existingIndex] = newCompany;
    } else {
      companies.push(newCompany);
    }
    localStorage.setItem("companies", JSON.stringify(companies));

    onLogin({
      id: formData.id,
      name: formData.name,
      role: UserRole.ADMIN,
      department: "Management",
      position: "CEO",
      companyCode: formData.companyCode,
      companyName: formData.companyName,
      phone: formData.phone,
      joinStatus: "APPROVED",
    });
    navigate("/app/dashboard");
  };

  const handleVerifyCompanyCode = () => {
    // Check both new and legacy storage
    const companies = JSON.parse(localStorage.getItem("companies") || "[]");
    const legacyCompanies = JSON.parse(
      localStorage.getItem("params_companies") || "[]"
    );

    let company = companies.find(
      (c) => c.companyCode === formData.companyCode.toUpperCase()
    );

    // Fallback to legacy check if not found
    if (!company) {
      const legacyCompany = legacyCompanies.find(
        (c) => c.code === formData.companyCode
      ); // legacy uses 'code' not 'companyCode'
      if (legacyCompany) {
        company = {
          companyName: legacyCompany.name,
          departments: legacyCompany.departments,
          companyCode: legacyCompany.code,
        };
      }
    }

    if (company) {
      setCompanyVerification({
        verified: true,
        companyName: company.companyName,
        departments: company.departments || [],
        attempted: true,
      });
    } else {
      setCompanyVerification({
        verified: false,
        companyName: "",
        departments: [],
        attempted: true,
      });
    }
  };

  const handleStaffSignup = (e) => {
    e.preventDefault();

    if (!companyVerification.verified) {
      alert("회사 코드를 먼저 검증해주세요.");
      return;
    }

    const newUser = {
      id: formData.id,
      name: formData.name,
      role: UserRole.STAFF,
      department: formData.department,
      position: formData.position,
      companyCode: formData.companyCode.toUpperCase(),
      companyName: companyVerification.companyName,
      phone: formData.phone,
      joinStatus: "PENDING",
    };

    const currentApps = JSON.parse(
      localStorage.getItem("params_applications") || "[]"
    );
    localStorage.setItem(
      "params_applications",
      JSON.stringify([...currentApps, newUser])
    );

    onLogin(newUser);
    navigate("/app/dashboard");
  };

  const renderContent = () => {
    switch (step) {
      case "LOGIN":
        return (
          <S.Form onSubmit={handleLoginSubmit}>
            <S.InputGroup>
              <label>아이디</label>
              <S.InputWrapper>
                <Mail />
                <S.Input
                  type="text"
                  required
                  placeholder="이메일 또는 아이디"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                />
              </S.InputWrapper>
            </S.InputGroup>
            <S.InputGroup>
              <label>비밀번호</label>
              <S.InputWrapper>
                <Lock />
                <S.Input
                  type="password"
                  required
                  placeholder="비밀번호"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </S.InputWrapper>
            </S.InputGroup>
            <S.SubmitButton type="submit">
              로그인하기
              <ArrowRight size={24} />
            </S.SubmitButton>
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <S.LinkButton
                type="button"
                onClick={() => setStep("SIGNUP_BASIC")}
              >
                아직 계정이 없으신가요? 회원가입
              </S.LinkButton>
            </div>
          </S.Form>
        );

      case "SIGNUP_BASIC":
        return (
          <S.Form onSubmit={handleBasicSignupSubmit}>
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
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>연락처</label>
                <S.Input
                  noIcon
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
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
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
              />
            </S.InputGroup>

            <S.InputGroup>
              <label>비밀번호</label>
              <S.Input
                noIcon
                type="password"
                required
                placeholder="8자 이상 입력"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </S.InputGroup>

            <S.SubmitButton type="submit">
              다음 단계
              <ArrowRight size={18} />
            </S.SubmitButton>
          </S.Form>
        );

      case "SIGNUP_TYPE":
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
              onClick={() => {
                setFormData({ ...formData, companyCode: generateRandomCode() });
                setStep("SIGNUP_ADMIN");
              }}
            >
              <S.IconBox color="blue">
                <Building2 size={24} />
              </S.IconBox>
              <h4>회사 등록하기</h4>
              <p>새로운 회사를 등록하고 관리자 권한을 부여받습니다.</p>
            </S.TypeButton>

            <S.TypeButton
              activeType="staff"
              onClick={() => setStep("SIGNUP_STAFF")}
            >
              <S.IconBox color="indigo">
                <Briefcase size={24} />
              </S.IconBox>
              <h4>회사 참여하기</h4>
              <p>기존에 등록된 회사의 직원으로 참여 신청을 합니다.</p>
            </S.TypeButton>
          </div>
        );

      case "SIGNUP_ADMIN":
        return (
          <S.Form onSubmit={handleAdminSignup} animate>
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
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </S.InputWrapper>
            </S.InputGroup>

            <S.Grid2>
              <S.InputGroup>
                <label>업종</label>
                <S.InputWrapper>
                  <Factory />
                  <S.Select
                    required
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
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
              <S.InputGroup>
                <label>규모</label>
                <S.InputWrapper>
                  <Users />
                  <S.Select
                    required
                    value={formData.companySize}
                    onChange={(e) =>
                      setFormData({ ...formData, companySize: e.target.value })
                    }
                    variant="blue"
                  >
                    <option value="" disabled>
                      규모 선택
                    </option>
                    <option value="5인 미만">5인 미만</option>
                    <option value="5-20인">5-20인</option>
                    <option value="21-50인">21-50인</option>
                    <option value="50인 이상">50인 이상</option>
                    <option value="100인 이상">100인 이상</option>
                  </S.Select>
                </S.InputWrapper>
              </S.InputGroup>
            </S.Grid2>

            <S.InfoBox variant="blue">
              <p>
                <Sparkles
                  size={14}
                  style={{ display: "inline", marginRight: 4 }}
                />
                회사를 등록하면 자동으로 총괄 관리자 권한이 부여됩니다.
              </p>
            </S.InfoBox>

            <S.InputGroup>
              <label>회사 코드 (자동 생성됨)</label>
              <S.InputWrapper>
                <Key />
                <S.Input type="text" readOnly value={formData.companyCode} />
              </S.InputWrapper>
            </S.InputGroup>

            <S.SubmitButton type="submit" variant="dark">
              등록 완료하기
              <CheckCircle2 size={24} />
            </S.SubmitButton>
          </S.Form>
        );

      case "SIGNUP_STAFF":
        return (
          <S.Form onSubmit={handleStaffSignup} animate>
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
                      setFormData({
                        ...formData,
                        companyCode: e.target.value.toUpperCase(),
                      });
                      setCompanyVerification({
                        verified: false,
                        companyName: "",
                        departments: [],
                        attempted: false,
                      });
                    }}
                    style={{ textTransform: "uppercase" }}
                  />
                </S.InputWrapper>
                <S.VerifyButton
                  type="button"
                  onClick={handleVerifyCompanyCode}
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
              {companyVerification.attempted &&
                !companyVerification.verified && (
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
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                variant="indigo"
              >
                <option value="" disabled>
                  부서 선택
                </option>
                {companyVerification.verified &&
                companyVerification.departments.length > 0
                  ? companyVerification.departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))
                  : DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
              </S.Select>
            </S.InputGroup>

            <S.InputGroup>
              <label>직급 / 직책</label>
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
                  value={isCustomPos ? "custom" : formData.position}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "custom") {
                      setIsCustomPos(true);
                      setFormData({ ...formData, position: "" });
                    } else {
                      setIsCustomPos(false);
                      setFormData({ ...formData, position: val });
                    }
                  }}
                  variant="indigo"
                >
                  <option value="" disabled>
                    직급 선택
                  </option>
                  {POSITIONS.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                  <option value="custom">직접 입력 (기타)</option>
                </S.Select>
                {isCustomPos && (
                  <S.Input
                    noIcon
                    type="text"
                    required
                    placeholder="직급 직접 입력"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
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
    }
  };

  return (
    <S.Container>
      <S.BackgroundDecor type="blue" />
      <S.BackgroundDecor type="indigo" />

      <S.Card>
        {/* Visual Sidebar */}
        <S.VisualSidebar>
          <S.Brand>
            <div>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span>Calm Desk</span>
          </S.Brand>

          <S.HeroText>
            <h2>
              {step === "LOGIN"
                ? "다시 오신 것을 \n환영합니다!"
                : "함께 더 나은 \n근무 환경을 만들어요"}
            </h2>
            <p>
              {step === "LOGIN"
                ? "동료들과 소통하고 스마트한 일정을 관리하며 오늘 하루를 시작하세요."
                : "당신을 위한 스마트 HR 솔루션, Calm Desk가 상담원님의 목소리에 귀를 기울입니다."}
            </p>
          </S.HeroText>

          <S.FeatureList>
            <S.FeatureItem>
              <CheckCircle2 size={20} className="text-blue-200" />
              <span>실시간 스트레스 지수 측정</span>
            </S.FeatureItem>
            <S.FeatureItem>
              <CheckCircle2 size={20} className="text-blue-200" />
              <span>간편한 연차/반차 신청</span>
            </S.FeatureItem>
          </S.FeatureList>
        </S.VisualSidebar>

        {/* Auth Form Container */}
        <S.FormContainer>
          {step === "LOGIN" && (
            <div style={{ marginBottom: "1rem" }}>
              <S.BackButton type="button" onClick={() => navigate("/")}>
                <ChevronLeft size={20} />
              </S.BackButton>
            </div>
          )}
          <S.FormHeader>
            <h3>{step === "LOGIN" ? "로그인" : "회원가입"}</h3>
            <p>
              {step === "LOGIN"
                ? "계정 정보를 입력해 주세요."
                : "새로운 계정 생성을 시작합니다."}
            </p>
          </S.FormHeader>
          {renderContent()}
        </S.FormContainer>
      </S.Card>
    </S.Container>
  );
};

export default AuthPage;
