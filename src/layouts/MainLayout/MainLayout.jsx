import React from 'react';
import useStore from '../../store/useStore';
import Header from '../../components/Header';
import FooterLinks from '../../components/Footer';
import * as S from './MainLayout.styles';
import useWebSocket from '../../hooks/useWebSocket';

const MainLayout = ({ children }) => {
    const { isAdminMode } = useStore();

    // WebSocket 연결 관리 (이 레이아웃이 마운트되어 있는 동안 유지)
    useWebSocket();

    return (
        <S.AppContainer $admin={isAdminMode}>
            <Header />
            <S.MainContent>
                {children}
            </S.MainContent>
            <S.Footer $admin={isAdminMode}>
                <S.FooterContent>
                    <p>© 2026 Calm Desk Admin Suite. All rights reserved.</p>
                    <FooterLinks />
                </S.FooterContent>
            </S.Footer>
        </S.AppContainer>
    );
};

export default MainLayout;
