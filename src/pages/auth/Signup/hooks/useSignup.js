import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  basicSignup,
  registerCompany,
  joinCompany,
  verifyCompanyCode,
} from "../api/signupApi";
import { decodeToken } from "../../../../utils/jwtUtils";
import { tokenManager } from "../../../../utils/tokenManager";

export const useSignup = (onLogin) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = searchParams.get("step") || "SIGNUP_BASIC";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    companyName: "",
    companyCode: "",
    category: "",
    minValue: "",
    maxValue: "",
    departmentId: "",
    rankId: "",
  });

  const [isCustomPos, setIsCustomPos] = useState(false);
  const [companyVerification, setCompanyVerification] = useState({
    verified: false,
    companyName: "",
    departments: [],
    ranks: [],
    attempted: false,
  });

  const setStep = (newStep) => {
    setSearchParams({ step: newStep });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBasicSignup = async () => {
    const response = await basicSignup({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
    });

    if (response.accessToken) {
      tokenManager.setAccessToken(response.accessToken);
    }

    return response;
  };

  const handleAdminSignup = async (e) => {
    e && e.preventDefault();

    const response = await registerCompany({
      companyName: formData.companyName,
      companyCode: formData.companyCode,
      category: formData.category,
      minValue: formData.minValue,
      maxValue: formData.maxValue,
    });

    if (response.token) {
      tokenManager.setAccessToken(response.token);
      const payload = decodeToken(response.token);

      onLogin({
        email: payload?.sub || formData.email,
        name: formData.name,
        role: payload?.role,
        companyCode: formData.companyCode,
        companyName: formData.companyName,
        phone: formData.phone,
        // token: response.token,
      });

      navigate("/app/dashboard");
    } else {
      console.error("response에 token이 없습니다.");
    }
  };

  const handleStaffSignup = async (e) => {
    e && e.preventDefault();

    const response = await joinCompany({
      companyCode: formData.companyCode.toUpperCase(),
      departmentId: formData.departmentId,
      rankId: formData.rankId,
    });

    if (response.token) {
      tokenManager.setAccessToken(response.token);
      const payload = decodeToken(response.token);

      onLogin({
        email: payload?.sub || formData.email,
        name: formData.name,
        role: payload?.role,
        companyCode: formData.companyCode.toUpperCase(),
        companyName: companyVerification.companyName,
        phone: formData.phone,
        // token: response.token,
        joinStatus: response.joinStatus,
      });

      navigate("/app/dashboard");
    } else {
      console.error("response에 token이 없습니다.");
    }
  };

  const handleVerifyCompanyCode = async () => {
    const response = await verifyCompanyCode({
      companyCode: formData.companyCode.toUpperCase(),
    });

    setCompanyVerification({
      verified: true,
      companyName: response.companyName,
      departments: response.departments || [],
      ranks: response.ranks || [],
      attempted: true,
    });

    return response;
  };

  return {
    currentStep,
    formData,
    setStep,
    handleChange,
    handleBasicSignup,
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
