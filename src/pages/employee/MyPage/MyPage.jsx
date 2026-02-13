import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyPageMain from './MyPageMain';
import ProfileEditView from './ProfileEditView';
import CouponWalletView from './CouponWalletView';
import PointHistoryView from './PointHistoryView';

const MyPage = () => {
  return (
    <Routes>
      <Route path="/" element={<MyPageMain />} />
      <Route path="profile" element={<ProfileEditView />} />
      <Route path="coupons" element={<CouponWalletView />} />
      <Route path="points" element={<PointHistoryView />} />
    </Routes>
  );
};

export default MyPage;
