import React from "react";
import { ShieldAlert, Activity } from "lucide-react";
import * as S from "../Dashboard.styles";

const DashboardBanner = () => {
  return (
    <S.QuickBanner>
      <S.BannerContent>
        <S.ShieldIconBox>
          <ShieldAlert size={24} color="white" />
        </S.ShieldIconBox>
        <S.BannerText>
          <h2>ADMINISTRATION CONSOLE</h2>
          <p>실시간 센터 활성도: 88% | 총 42명 근무 중</p>
        </S.BannerText>
      </S.BannerContent>
      <S.BannerStats>
        <S.StatBadge>Active Sessions: 28</S.StatBadge>
        <S.StatBadge alert>Stress Alerts: 4</S.StatBadge>
      </S.BannerStats>
      <S.BannerDecor>
        <Activity size={192} />
      </S.BannerDecor>
    </S.QuickBanner>
  );
};

export default DashboardBanner;
