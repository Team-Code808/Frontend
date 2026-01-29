import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import * as S from "./Login.styles";
import SignupContainer from "../Signup/SignupContainer";
import useStore from "../../../store/useStore";
import { useLogin } from "./hooks/useLogin";

const AuthPage = () => {
  const login = useStore((state) => state.login);
  const onLogin = login;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const step = searchParams.get("step") || "LOGIN";

  const { formData, handleChange, handleLoginSubmit } = useLogin(onLogin);

  const setStep = (newStep) => {
    setSearchParams({ step: newStep });
  };

  return (
    <S.Container>
      <S.BackgroundDecor type="blue" />
      <S.BackgroundDecor type="indigo" />

      <S.Card>
        {/* Visual Sidebar */}
        <S.VisualSidebar>
          <S.Brand>
            <div>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span>Calm Desk</span>
          </S.Brand>

          <S.HeroText>
            <h2>
              {step === "LOGIN"
                ? "Calm Desk에 오신 것을 \n환영합니다!"
                : "함께 더 나은 \n근무 환경을 만들어요"}
            </h2>
            <p>
              {step === "LOGIN"
                ? "동료들과 소통하고 스마트한 일정을 관리하며 오늘 하루를 시작하세요."
                : "당신을 위한 스마트 HR 솔루션, Calm Desk가 상담원님의 목소리에 귀를 기울입니다."}
            </p>
          </S.HeroText>

          <S.FeatureList>
            <S.FeatureItem>
              <CheckCircle2 size={20} className="text-blue-200" />
              <span>실시간 스트레스 지수 측정</span>
            </S.FeatureItem>
            <S.FeatureItem>
              <CheckCircle2 size={20} className="text-blue-200" />
              <span>간편한 연차/반차 신청</span>
            </S.FeatureItem>
          </S.FeatureList>
        </S.VisualSidebar>

        <S.FormContainer>
          {step === "LOGIN" && (
            <div style={{ marginBottom: "1rem" }}>
              <S.BackButton type="button" onClick={() => navigate("/")}>
                <ChevronLeft size={20} />
              </S.BackButton>
            </div>
          )}
          <S.FormHeader>
            <h3>{step === "LOGIN" ? "로그인" : "회원가입"}</h3>
            <p>
              {step === "LOGIN"
                ? "계정 정보를 입력해 주세요."
                : "새로운 계정 생성을 시작합니다."}
            </p>
          </S.FormHeader>

          {step === "LOGIN" ? (
            <S.Form onSubmit={handleLoginSubmit}>
              <S.InputGroup>
                <label>이메일</label>
                <S.InputWrapper>
                  <Mail />
                  <S.Input
                    name="email"
                    type="email"
                    required
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </S.InputWrapper>
              </S.InputGroup>
              <S.InputGroup>
                <label>비밀번호</label>
                <S.InputWrapper>
                  <Lock />
                  <S.Input
                    name="password"
                    type="password"
                    required
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </S.InputWrapper>
              </S.InputGroup>
              <S.SubmitButton type="submit">
                로그인하기
                <ArrowRight size={24} />
              </S.SubmitButton>
              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <S.LinkButton
                  type="button"
                  onClick={() => setStep("SIGNUP_BASIC")}
                >
                  아직 계정이 없으신가요? 회원가입
                </S.LinkButton>
              </div>
            </S.Form>
          ) : (
            <SignupContainer onLogin={onLogin} />
          )}
        </S.FormContainer>
      </S.Card>
    </S.Container>
  );
};

export default AuthPage;
