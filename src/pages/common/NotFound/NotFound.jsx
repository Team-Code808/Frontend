import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';
import * as S from './NotFound.styles';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <S.Container>
            <S.IconWrapper>
                <Ghost strokeWidth={1.5} />
            </S.IconWrapper>

            <S.Title>4<span>0</span>4</S.Title>
            <S.SubTitle>페이지를 찾을 수 없습니다</S.SubTitle>

            <S.Description>
                요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.<br />
                입력하신 주소가 정확한지 다시 한번 확인해 주세요.
            </S.Description>

            <S.ButtonGroup>
                <S.Button onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                    이전으로
                </S.Button>
                <S.Button $primary onClick={() => navigate('/')}>
                    <Home size={20} />
                    홈으로 가기
                </S.Button>
            </S.ButtonGroup>
        </S.Container>
    );
};

export default NotFound;
