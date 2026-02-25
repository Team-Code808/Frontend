import React, { useState } from "react";
import { ChevronLeft, Upload, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../Signup.style";
import { extractBusinessCard } from "../api/Signupapi";

const BusinessCardUpload = ({ onExtracted, onBack }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setError(null);
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다. (JPG, PNG 등)");
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("명함 이미지를 선택해 주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await extractBusinessCard(file);
      const d = res?.data ?? res;
      if (d?.extractionError && !d?.name && !d?.email) {
        setError(d.extractionError || "명함 인식에 실패했습니다. 다시 시도하거나 일반 가입을 이용해 주세요.");
        setLoading(false);
        return;
      }
      onExtracted({
        name: d?.name || "",
        phone: d?.phone || d?.mobile || "",
        email: d?.email || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "명함 인식 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.StepHeader>
        <S.BackButton type="button" onClick={() => (onBack ? onBack() : navigate(-1))}>
          <ChevronLeft size={20} />
        </S.BackButton>
        <h3>명함 촬영 / 업로드</h3>
      </S.StepHeader>

      <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1rem" }}>
        명함 이미지를 업로드하면 이름, 연락처, 이메일 등이 자동으로 채워집니다.
      </p>

      <label
        style={{
          display: "block",
          border: "2px dashed #cbd5e1",
          borderRadius: "1rem",
          padding: "2rem",
          textAlign: "center",
          cursor: file ? "default" : "pointer",
          backgroundColor: preview ? "#f8fafc" : "#f8fafc",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          style={{ display: "none" }}
        />
        {preview ? (
          <div>
            <img
              src={preview}
              alt="명함 미리보기"
              style={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain", borderRadius: "0.5rem" }}
            />
            <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#64748b" }}>
              {file?.name} {!loading && "(클릭하여 변경)"}
            </p>
          </div>
        ) : (
          <div>
            <Upload size={40} style={{ color: "#94a3b8", marginBottom: "0.5rem" }} />
            <p style={{ fontWeight: 700, color: "#64748b" }}>클릭하여 명함 이미지 선택</p>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>JPG, PNG (20MB 이하)</p>
          </div>
        )}
      </label>

      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "0.75rem",
            color: "#b91c1c",
            fontSize: "0.875rem",
          }}
        >
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <S.SubmitButton type="submit" disabled={!file || loading}>
        {loading ? (
          <>
            <Loader2 size={18} style={{ animation: "spin 0.8s linear infinite" }} />
            명함 인식 중…
          </>
        ) : (
          "인식하고 다음 단계로"
        )}
      </S.SubmitButton>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </S.Form>
  );
};

export default BusinessCardUpload;
