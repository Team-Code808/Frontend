import React, { useState } from 'react';
import { Clock, CheckCircle2, Send, Info } from 'lucide-react';
import * as S from './Consultation.styles';

const CounselingRequestPage = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTitle('');
      setMessage('');
    }, 3000);
  };

  return (
    <S.Container>
      <S.Header>
        <h1>상담 신청</h1>
        <p>전문 상담사와 연결하여 마음의 안정을 찾으세요.</p>
      </S.Header>

      <S.MainGrid>
        {/* Guidance Section */}
        <S.LeftColumn>
          <S.GuideCard>
            <h3>
              <Info size={18} color="#4f46e5" />
              신청 안내
            </h3>
            <S.GuideList>
              <S.GuideItem>
                <span>•</span>
                <span>모든 상담 내용은 철저히 비밀이 보장됩니다.</span>
              </S.GuideItem>
              <S.GuideItem>
                <span>•</span>
                <span>상담 시간은 따로 지정하지 않으며, 관리자가 근무 시간 중 가장 적절한 때에 호출합니다.</span>
              </S.GuideItem>

            </S.GuideList>
          </S.GuideCard>

          <S.StatusCard>
            <h3>상담 대기 현황</h3>
            <S.StatusContent>
              <div>
                <p>2명</p>
                <p>현재 대기 중</p>
              </div>
              <Clock size={40} />
            </S.StatusContent>
          </S.StatusCard>
        </S.LeftColumn>

        {/* Form Section */}
        <S.RightColumn>
          <S.Form onSubmit={handleSubmit}>
            <S.FormGroup>
              <S.Label>상담 제목</S.Label>
              <S.Input
                type="text"
                placeholder="상담 제목을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>상담 사유 및 내용</S.Label>
              <S.TextArea
                placeholder="상담을 원하는 구체적인 내용을 적어주세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </S.FormGroup>

            <S.SubmitButton disabled={submitted}>
              {submitted ? (
                <>
                  <CheckCircle2 size={24} />
                  신청 완료되었습니다
                </>
              ) : (
                <>
                  <Send size={20} />
                  상담 신청하기
                </>
              )}
            </S.SubmitButton>
          </S.Form>
        </S.RightColumn>
      </S.MainGrid>
    </S.Container>
  );
};

export default CounselingRequestPage;
