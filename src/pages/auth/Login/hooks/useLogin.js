import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Loginapi";
import { decodeToken } from "../../../../utils/jwtUtils";

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

      if (response.token) {
        localStorage.setItem("authToken", response.token);
        const payload = decodeToken(response.token);

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
          token: response.token,
          joinStatus: response.joinStatus,
        });

        navigate("/app/dashboard");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert(error.message || "로그인에 실패했습니다.");
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleLoginSubmit,
  };
};
