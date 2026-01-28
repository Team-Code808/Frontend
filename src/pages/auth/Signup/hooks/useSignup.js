import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserRole } from "../../../../constants/types";

export const DEPARTMENTS = [
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

export const POSITIONS = [
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

export const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const useSignup = (onLogin) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = searchParams.get("step") || "SIGNUP_BASIC";

  // 전체 회원가입 데이터
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
    attempted: false,
  });

  // 단계 변경 함수
  const setStep = (newStep) => {
    setSearchParams({ step: newStep });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminSignup = (e) => {
    e && e.preventDefault();

    const companies = JSON.parse(localStorage.getItem("companies") || "[]");
    const newCompany = {
      companyCode: formData.companyCode,
      companyName: formData.companyName,
      departments: ["상담 1팀", "상담 2팀", "상담 3팀"],
    };

    const existingIndex = companies.findIndex(
      (c) => c.companyCode === formData.companyCode
    );
    if (existingIndex >= 0) {
      companies[existingIndex] = newCompany;
    } else {
      companies.push(newCompany);
    }
    localStorage.setItem("companies", JSON.stringify(companies));

    //zustand store
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

  const handleStaffSignup = (e) => {
    e && e.preventDefault();

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

    const currentApps = JSON.parse(localStorage.getItem("users") || "[]");
    localStorage.setItem("users", JSON.stringify([...currentApps, newUser]));

    onLogin(newUser);
    navigate("/app/dashboard");
  };

  const handleVerifyCompanyCode = () => {
    // Check both new and legacy storage
    const companies = JSON.parse(localStorage.getItem("companies") || "[]");
    const legacyCompanies = JSON.parse(localStorage.getItem("users") || "[]");

    let company = companies.find(
      (c) => c.companyCode === formData.companyCode.toUpperCase()
    );

    if (!company) {
      const legacyCompany = legacyCompanies.find(
        (c) => c.code === formData.companyCode
      );
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

  return {
    currentStep,
    formData,
    setStep,
    handleChange,
    handleAdminSignup,
    handleStaffSignup,
    handleVerifyCompanyCode,
    setFormData,
    isCustomPos,
    setIsCustomPos,
    companyVerification,
    setCompanyVerification,
  };
};
