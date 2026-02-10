import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/loginApi";
import { decodeToken } from "../../../../utils/jwtUtils";
import { tokenManager } from "../../../../utils/tokenManager";

export const useLogin = (onLogin) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response.accessToken) {
        tokenManager.setAccessToken(response.accessToken);
        const payload = decodeToken(response.accessToken);

        onLogin({
          id: response.memberId,
          memberId: response.memberId,
          email: payload?.sub || formData.email || response.email,
          name: response.name || payload?.name,
          role: response.role || payload?.role, // 백엔드에서 직접 받은 role 사용
          companyCode: response.companyCode,
          companyName: response.companyName,
          departmentName: response.departmentName,
          department: response.departmentName,
          departmentId: response.departmentId,
          phone: response.phone,
          // token: response.token,
          joinStatus: response.joinStatus,
        });

        if (response.joinStatus === "REJECTED" || response.joinStatus === "R") {
          alert("입사 신청이 반려되었습니다.");
          navigate("/auth?step=SIGNUP_TYPE");
        } else {
          navigate("/app/dashboard");
        }
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "로그인에 실패했습니다.";
      alert(message);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleLoginSubmit,
  };
};
