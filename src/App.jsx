import React from 'react';
import useStore from './store/useStore';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';

// 공통 페이지 (Common Pages)
import LandingPage from './pages/common/Landing/Landing';
import FeatureDetails from './pages/common/FeatureDetails/FeatureDetails';
import NotFound from './pages/common/NotFound/NotFound';

import {
  ShieldAlert,
  Clock
} from 'lucide-react';
import * as S from './App.styles';

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

  const handleStart = () => navigate('/auth');
  const handleFeatureDetails = () => navigate('/features');
  const handleBackToLanding = () => navigate('/');

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
      <Route path="/" element={<LandingPage onStart={handleStart} onViewFeatures={handleFeatureDetails} />} />
      <Route path="/features" element={<FeatureDetails onBack={handleBackToLanding} onStart={handleStart} />} />

      <Route path="/app/*" element={
        <ProtectedRoute>
          <MainLayout>
            {user?.joinStatus === 'PENDING' ? (
              <StatusPlaceholder icon={Clock} title="승인 대기 중" description="관리자의 입사 승인을 기다리고 있습니다." />
            ) : user?.joinStatus === 'REJECTED' ? (
              <StatusPlaceholder icon={ShieldAlert} title="신청 반려됨" description="입사 신청이 반려되었습니다." />
            ) : (
              <Routes>
                {/* 관리자 라우트 */}
                {isAdminMode && (
                  <>
                    
                  </>
                )}

                {/* 직원 라우트 */}
                {!isAdminMode && (
                  <>
                   
                  </>
                )}
              </Routes>
            )}
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
