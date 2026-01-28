import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../../constants/types";

export const useLogin = (onLogin) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const isSpecialAdmin = formData.id === "admin";

    const storedApps = JSON.parse(localStorage.getItem("users") || "[]");
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
      name: "김철수",
      role: isSpecialAdmin ? UserRole.ADMIN : UserRole.STAFF,
      department: "상담 1팀",
      phone: "010-0000-0000",
      joinStatus: "APPROVED",
    });
    navigate("/app/dashboard");
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleLoginSubmit,
  };
};
