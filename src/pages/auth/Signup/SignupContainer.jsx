import React from "react";
import { useSignup, generateRandomCode } from "./hooks/useSignup";
import BasicInfo from "./steps/BasicInfo";
import SignupType from "./steps/SignupType";
import AdminSignup from "./steps/AdminSignup";
import StaffSignup from "./steps/StaffSignup";

const SignupContainer = ({ onLogin }) => {
  const {
    currentStep,
    formData,
    handleChange,
    setStep,
    handleAdminSignup,
    handleStaffSignup,
    handleVerifyCompanyCode,
    setFormData,
    companyVerification,
    setCompanyVerification,
    isCustomPos,
    setIsCustomPos,
  } = useSignup(onLogin);

  const renderStep = () => {
    switch (currentStep) {
      case "SIGNUP_BASIC":
        return (
          <BasicInfo
            formData={formData}
            onChange={handleChange}
            onNext={() => setStep("SIGNUP_TYPE")}
          />
        );
      case "SIGNUP_TYPE":
        return (
          <SignupType
            onSelectType={(type) => {
              if (type === "ADMIN") {
                const code = generateRandomCode();
                setFormData((prev) => ({ ...prev, companyCode: code }));
                setStep("SIGNUP_ADMIN");
              } else {
                setStep("SIGNUP_STAFF");
              }
            }}
          />
        );
      case "SIGNUP_ADMIN":
        return (
          <AdminSignup
            formData={formData}
            onChange={handleChange}
            onSubmit={handleAdminSignup}
          />
        );
      case "SIGNUP_STAFF":
        return (
          <StaffSignup
            formData={formData}
            onChange={handleChange}
            onSubmit={handleStaffSignup}
            companyVerification={companyVerification}
            onVerify={handleVerifyCompanyCode}
            setFormData={setFormData}
            setCompanyVerification={setCompanyVerification}
            isCustomPos={isCustomPos}
            setIsCustomPos={setIsCustomPos}
          />
        );
      default:
        return (
          <BasicInfo
            formData={formData}
            onChange={handleChange}
            onNext={() => setStep("SIGNUP_TYPE")}
          />
        );
    }
  };

  return <>{renderStep()}</>;
};

export default SignupContainer;
