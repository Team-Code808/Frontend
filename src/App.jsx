import React from "react";
import useStore from "./store/useStore";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";

// 관리자 페이지
import AdminDashboard from "./pages/admin/Dashboard/Dashboard";
import AdminGifticonManagement from "./pages/admin/GifticonManagement/GifticonManagement";
import PurchaseHistory from "./pages/admin/GifticonManagement/PurchaseHistory/PurchaseHistory";
import Monitoring from "./pages/admin/Monitoring/Monitoring";
import AdminMyPage from "./pages/admin/Mypage/MyPage";
import AdminApplications from "./pages/admin/Applications/Applications";

// 공통 페이지 (Common Pages)
import LandingPage from "./pages/common/Landing/Landing";
import FeatureDetails from "./pages/common/FeatureDetails/FeatureDetails";
import NotFound from "./pages/common/NotFound/NotFound";

// 인증 페이지 (Auth Pages)
import AuthPage from "./pages/auth/Login/Login";

// 직원 페이지 (Employee Pages)
import MyPage from "./pages/employee/MyPage/MyPage";
import Department from "./pages/employee/Department/Department";
import Attendance from "./pages/employee/Attendance/Attendance";
import Consultation from "./pages/employee/Consultation/Consultation";
import Dashboard from "./pages/employee/Dashboard/Dashboard";
import PointMall from "./pages/employee/PointMall/PointMall";

import { ShieldAlert, Clock } from "lucide-react";
import * as S from "./App.styles";

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  const { user, isAdminMode } = useStore();
  const navigate = useNavigate();

  const handleStart = () => navigate("/auth");
  const handleFeatureDetails = () => navigate("/features");
  const handleBackToLanding = () => navigate("/");

  const StatusPlaceholder = ({ icon: Icon, title, description }) => (
    <S.PlaceholderContainer>
      <S.PlaceholderIconBox>
        <Icon />
      </S.PlaceholderIconBox>
      <S.PlaceholderText>
        <h2>{title}</h2>
        <p>{description}</p>
      </S.PlaceholderText>
    </S.PlaceholderContainer>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onStart={handleStart}
            onViewFeatures={handleFeatureDetails}
          />
        }
      />
      <Route
        path="/features"
        element={
          <FeatureDetails onBack={handleBackToLanding} onStart={handleStart} />
        }
      />
      <Route path="/auth" element={<AuthPage />} />

      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <MainLayout>
              {user?.joinStatus === "N" ? (
                <StatusPlaceholder
                  icon={Clock}
                  title="승인 대기 중"
                  description="관리자의 입사 승인을 기다리고 있습니다."
                />
              ) : (user?.joinStatus === "REJECTED" || user?.joinStatus === "R") ? (
                <Navigate to="/auth?step=SIGNUP_TYPE" replace />
              ) : (
                <Routes>
                  {/* 관리자 라우트 */}
                  {isAdminMode && (
                    <>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="monitoring" element={<Monitoring />} />
                      <Route
                        path="gifticons"
                        element={<AdminGifticonManagement />}
                      />
                      <Route
                        path="gifticons/history"
                        element={<PurchaseHistory />}
                      />
                      <Route
                        path="applications"
                        element={<AdminApplications />}
                      />
                      <Route path="mypage/*" element={<AdminMyPage />} />
                      {/* <Route
                        path="*"
                        element={<Navigate to="/app/dashboard" replace />}
                      /> */}
                    </>
                  )}

                  {/* 직원 라우트 — Header 메뉴와 경로 일치 */}
                  {!isAdminMode && (
                    <>
                      <Route path="department" element={<Department />} />
                      <Route path="attendance" element={<Attendance />} />
                      <Route path="consultation" element={<Consultation />} />
                      <Route path="pointmall" element={<PointMall />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="mypage/*" element={<MyPage />} />
                      <Route
                        path="*"
                        element={<Navigate to="/app/dashboard" replace />}
                      />
                    </>
                  )}
                </Routes>
              )}
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
