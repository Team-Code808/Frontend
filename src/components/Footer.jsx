import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './common/Modal';

const LinkContainer = styled.div`
  display: flex;
  gap: 2rem;
  
  button {
    color: inherit;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    
    &:hover {
      color: #3b82f6; // blue-500
    }
  }

  @media (max-width: 640px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FooterLinks = () => {
    const [activeModal, setActiveModal] = useState(null); // 'terms', 'privacy', 'support'

    const closeModal = () => setActiveModal(null);

    return (
        <>
            <LinkContainer>
                <button onClick={() => setActiveModal('terms')}>이용약관</button>
                <button onClick={() => setActiveModal('privacy')}>개인정보처리방침</button>
                <button onClick={() => setActiveModal('support')}>고객지원</button>
            </LinkContainer>

            {/* 이용약관 모달 */}
            <Modal
                isOpen={activeModal === 'terms'}
                onClose={closeModal}
                title="이용약관"
            >
                <p><strong>제1조 (목적)</strong></p>
                <p>본 약관은 Calm Desk(이하 "회사")가 제공하는 서비스의 이용조건 및 절차, 회사와 회원의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.</p>

                <br />
                <p><strong>제2조 (용어의 정의)</strong></p>
                <p>1. "서비스"라 함은 회사가 제공하는 상담원 근태 관리 및 스트레스 케어 플랫폼을 의미합니다.</p>
                <p>2. "회원"이라 함은 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.</p>

                <br />
                <p><strong>제3조 (서비스의 제공)</strong></p>
                <p>회사는 다음과 같은 서비스를 제공합니다:</p>
                <p>- 실시간 스트레스 모니터링</p>
                <p>- 스마트 근태 관리 및 휴가 신청</p>
                <p>- 관리자 대시보드 및 통계</p>

                <br />
                <p><strong>제4조 (면책조항)</strong></p>
                <p>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>

                <br />
                <p>※ 본 약관은 예시이며, 실제 서비스 운영 시에는 법률 전문가의 검토를 거친 정식 약관을 사용해야 합니다.</p>
            </Modal>

            {/* 개인정보처리방침 모달 */}
            <Modal
                isOpen={activeModal === 'privacy'}
                onClose={closeModal}
                title="개인정보처리방침"
            >
                <p><strong>1. 개인정보의 수집 및 이용 목적</strong></p>
                <p>Calm Desk는 다음의 목적을 위해 개인정보를 수집 및 이용합니다:</p>
                <p>- 회원 가입 및 관리</p>
                <p>- 서비스 제공 및 기능 개선</p>
                <p>- 고객 문의 응대 및 공지사항 전달</p>

                <br />
                <p><strong>2. 수집하는 개인정보의 항목</strong></p>
                <p>- 필수항목: 이름, 이메일 주소, 사원번호, 부서명</p>
                <p>- 선택항목: 프로필 사진, 직급</p>

                <br />
                <p><strong>3. 개인정보의 보유 및 이용 기간</strong></p>
                <p>회원은 회원 탈퇴 시까지 개인정보를 보유 및 이용하며, 탈퇴 시 해당 정보를 지체 없이 파기합니다. 단, 관계 법령에 의하여 보존할 필요가 있는 경우에는 해당 기간 동안 보관합니다.</p>

                <br />
                <p><strong>4. 개인정보의 제3자 제공</strong></p>
                <p>회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.</p>
            </Modal>

            {/* 고객지원 모달 */}
            <Modal
                isOpen={activeModal === 'support'}
                onClose={closeModal}
                title="고객지원"
            >
                <p><strong>도움이 필요하신가요?</strong></p>
                <p>서비스 이용 중 불편한 점이나 문의사항이 있으시면 언제든지 연락주세요.</p>

                <br />
                <p><strong>운영 시간</strong></p>
                <p>평일 09:00 ~ 18:00 (주말 및 공휴일 휴무)</p>

                <br />
                <p><strong>연락처</strong></p>
                <p>- 이메일: support@calmdesk.com</p>
                <p>- 전화: 02-1234-5678</p>

                <br />
                <p><strong>자주 묻는 질문 (FAQ)</strong></p>
                <p>Q: 비밀번호를 잊어버렸어요.</p>
                <p>A: 로그인 화면의 '비밀번호 찾기' 기능을 이용해 주세요.</p>

                <br />
                <p>Q: 관리자 승인은 얼마나 걸리나요?</p>
                <p>A: 가입 신청 후 영업일 기준 24시간 이내에 처리됩니다.</p>
            </Modal>
        </>
    );
};

export default FooterLinks;
