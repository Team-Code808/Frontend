// src/pages/admin/Dashboard/components/DashboardBanner.jsx
import React from "react";
import { ShieldAlert, Activity } from "lucide-react";
import * as S from "../Dashboard.styles";

const DashboardBanner = ({ companyStats }) => {
  return (
    <S.QuickBanner>
      <S.BannerContent>
        <S.ShieldIconBox>
          <ShieldAlert size={24} color="white" />
        </S.ShieldIconBox>
        <S.BannerText>
          <h2>ADMINISTRATION CONSOLE</h2>
          <p>
            총 {companyStats.totalMembers}명 등록 | 출근률{" "}
            {companyStats.todayAttendance}%
          </p>
        </S.BannerText>
      </S.BannerContent>
      <S.BannerStats>
        <S.StatBadge>총 인원: {companyStats.totalMembers}명</S.StatBadge>
        <S.StatBadge alert>
          고위험군: {companyStats.highRiskCount}명
        </S.StatBadge>
      </S.BannerStats>
      <S.BannerDecor>
        <Activity size={192} />
      </S.BannerDecor>
    </S.QuickBanner>
  );
};

export default DashboardBanner;
