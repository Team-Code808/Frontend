import React, { useState, useRef, useEffect } from "react";
import { uploadCallRecording } from "../../../api/callRecordsApi";
import { Mic, Square } from "lucide-react";
import * as S from "./Call.styles";

const Call = () => {
  const [status, setStatus] = useState("idle"); // idle | recording | ended
  const [customerPhone, setCustomerPhone] = useState("");
  const [recordingStartedAt, setRecordingStartedAt] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0); // 녹음 시간 (초)
  const [recordingSize, setRecordingSize] = useState(0); // 녹음 파일 크기 (bytes)

  const localStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recordingDurationIntervalRef = useRef(null); // 녹음 시간 타이머

  // 녹음 시간 및 크기 표시
  useEffect(() => {
    if (status === "recording" && mediaRecorderRef.current?.state === "recording") {
      recordingDurationIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
        const totalSize = chunksRef.current.reduce((sum, chunk) => sum + chunk.size, 0);
        setRecordingSize(totalSize);
      }, 1000);
    } else {
      if (recordingDurationIntervalRef.current) {
        clearInterval(recordingDurationIntervalRef.current);
        recordingDurationIntervalRef.current = null;
      }
    }
    return () => {
      if (recordingDurationIntervalRef.current) {
        clearInterval(recordingDurationIntervalRef.current);
      }
    };
  }, [status]);

  // 녹음 시작
  const handleStartRecording = async () => {
    setError(null);
    
    try {
      // 이전 리소스 정리
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {
          console.warn("이전 녹음기 정리 중 오류:", e);
        }
        mediaRecorderRef.current = null;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;
      }
      
      chunksRef.current = [];
      setRecordingDuration(0);
      setRecordingSize(0);
      
      // 마이크 접근 권한 요청
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,  // 에코 제거
          noiseSuppression: true,   // 노이즈 제거
          autoGainControl: true,    // 자동 게인 제어
          sampleRate: 48000,        // 48kHz 샘플링 레이트 (고품질)
          channelCount: 1           // 모노 (STT에 충분)
        }
      });
      localStreamRef.current = stream;
      
      // MediaRecorder 옵션: 오디오 품질 최적화 (Google Cloud Speech-to-Text 지원)
      const options = {
        mimeType: MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
          ? "audio/ogg;codecs=opus"  // OGG 우선 (Google Cloud Speech-to-Text 지원)
          : MediaRecorder.isTypeSupported("audio/ogg")
          ? "audio/ogg"
          : MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"  // WebM 대체
          : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/webm",  // 기본값
        audioBitsPerSecond: 64000  // 64kbps (고품질 오디오)
      };
      
      const recorder = new MediaRecorder(stream, options);
      chunksRef.current = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
          const totalSize = chunksRef.current.reduce((sum, chunk) => sum + chunk.size, 0);
          console.log("✅ 청크 추가됨. 총 청크 수:", chunksRef.current.length, "총 크기:", (totalSize / 1024).toFixed(2), "KB");
        }
      };
      
      recorder.onstop = () => {
        const totalSize = chunksRef.current.reduce((sum, chunk) => sum + chunk.size, 0);
        console.log("녹음 종료. 총 청크 수:", chunksRef.current.length, "총 크기:", totalSize, "bytes");
      };
      
      recorder.onerror = (e) => {
        console.error("MediaRecorder 에러:", e);
        setError("녹음 중 오류가 발생했습니다.");
      };
      
      recorder.onstart = () => {
        console.log("✅ 녹음 시작됨");
        setRecordingStartedAt(new Date());
        setRecordingDuration(0);
        setRecordingSize(0);
      };
      
      // 녹음 시작
      recorder.start(0); // 0 = 가능한 한 자주 데이터 수집
      mediaRecorderRef.current = recorder;
      setStatus("recording");
      
    } catch (err) {
      console.error("녹음 시작 실패:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setError("마이크 권한이 거부되었습니다. 브라우저 설정에서 마이크 권한을 허용해주세요.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setError("마이크를 찾을 수 없습니다. 마이크가 연결되어 있는지 확인해주세요.");
      } else {
        setError(`녹음 시작 실패: ${err.message || "알 수 없는 오류"}`);
      }
      setStatus("idle");
    }
  };

  // 녹음 종료
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      console.log("녹음 중지 시작, 현재 상태:", mediaRecorderRef.current.state);
      
      // 마지막 데이터를 확보하기 위해 requestData 호출
      if (mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.requestData();
      }
      
      // 약간의 지연 후 stop (마지막 데이터 수집을 위해)
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
          console.log("녹음 중지 완료, 최종 청크 수:", chunksRef.current.length);
        }
        mediaRecorderRef.current = null;
      }, 200);
    }
    
    // 마이크 스트림 정리
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    
    // chunksRef는 업로드 전까지 유지 (업로드 후에만 초기화)
    setStatus("ended");
  };

  // 녹음 파일 업로드
  const handleUpload = async () => {
    const phone = customerPhone.trim() || "미입력";
    
    // 디버깅 정보
    const totalSize = chunksRef.current.reduce((sum, chunk) => sum + chunk.size, 0);
    console.log("업로드 시도:", {
      chunksCount: chunksRef.current.length,
      chunksSize: totalSize,
      chunksSizeKB: (totalSize / 1024).toFixed(2),
      phone: phone
    });
    
    if (chunksRef.current.length === 0) {
      alert("녹음 데이터가 없습니다. 녹음을 다시 시작해주세요.");
      return;
    }
    
    if (totalSize < 1000) {
      const confirmUpload = window.confirm(
        `경고: 녹음 파일 크기가 매우 작습니다 (${(totalSize / 1024).toFixed(2)} KB).\n` +
        `음성이 없을 수 있습니다. 그래도 업로드하시겠습니까?`
      );
      if (!confirmUpload) {
        return;
      }
    }
    
    // 오디오 전용 Blob 생성 (OGG 형식 우선, Google Cloud Speech-to-Text 지원)
    const mimeType = chunksRef.current.length > 0 && chunksRef.current[0].type 
      ? chunksRef.current[0].type 
      : "audio/ogg;codecs=opus";
    const extension = mimeType.includes("ogg") ? "ogg" : mimeType.includes("webm") ? "webm" : "wav";
    const blob = new Blob(chunksRef.current, { type: mimeType });
    const file = new File([blob], `recording.${extension}`, { type: mimeType });
    const started = recordingStartedAt || new Date();
    const ended = new Date();
    
    // 한국 시간(KST)으로 전송해 통화 기록 목록에서도 한국 시간으로 표시되도록 함
    const format = (d) => {
      const date = d instanceof Date ? d : new Date(d);
      const s = date.toLocaleString("sv-SE", { timeZone: "Asia/Seoul" });
      return s.replace(" ", "T");
    };

    setUploading(true);
    setUploadProgress(0);
    try {
      await uploadCallRecording(
        file, 
        phone, 
        format(started), 
        format(ended),
        (progress) => {
          setUploadProgress(progress);
        }
      );
      alert("업로드 완료. 통화기록에서 확인하세요.");
      setStatus("idle");
      setCustomerPhone("");
      setRecordingStartedAt(null);
      setRecordingDuration(0);
      setRecordingSize(0);
      chunksRef.current = [];
      setUploadProgress(0);
    } catch (e) {
      alert(e.response?.data?.message || "업로드 실패");
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <h1>음성 녹음</h1>
        <p>녹음 시작 버튼을 눌러 마이크에서 음성을 녹음하세요. 녹음 종료 후 파일을 업로드하면 자동으로 욕설 감지가 진행됩니다.</p>
      </S.Header>

      {error && <S.Error>{error}</S.Error>}

      {status === "idle" && (
        <S.Card>
          <S.BigButton onClick={handleStartRecording}>
            <Mic size={32} /> 녹음 시작
          </S.BigButton>
        </S.Card>
      )}

      {status === "recording" && (
        <S.Card>
          <S.StatusBadge $connected>녹음 중</S.StatusBadge>
          <p style={{ fontSize: "0.9em", color: "#666", marginTop: "8px" }}>
            녹음 시간: {Math.floor(recordingDuration / 60)}분 {recordingDuration % 60}초
          </p>
          <p style={{ fontSize: "0.9em", color: "#666", marginTop: "4px" }}>
            녹음 크기: {(recordingSize / 1024).toFixed(2)} KB
          </p>
          <S.BigButton $danger onClick={handleStopRecording}>
            <Square size={24} /> 녹음 종료
          </S.BigButton>
        </S.Card>
      )}

      {status === "ended" && (
        <S.Card>
          <p>녹음이 종료되었습니다. 녹음 파일을 업로드하세요.</p>
          {recordingDuration > 0 && (
            <p style={{ fontSize: "0.9em", color: "#666", marginTop: "8px" }}>
              총 녹음 시간: {Math.floor(recordingDuration / 60)}분 {recordingDuration % 60}초
            </p>
          )}
          {recordingSize > 0 && (
            <p style={{ fontSize: "0.9em", color: "#666", marginTop: "8px" }}>
              녹음 파일 크기: {(recordingSize / 1024).toFixed(2)} KB
            </p>
          )}
          <div style={{ marginTop: "16px", marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9em", color: "#666" }}>
              고객 전화번호 (선택사항):
            </label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="전화번호를 입력하세요 (선택사항)"
              disabled={uploading}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "1em",
                opacity: uploading ? 0.6 : 1
              }}
            />
          </div>
          {uploading && (
            <div style={{ marginTop: "16px", marginBottom: "16px" }}>
              <div style={{ 
                width: "100%", 
                height: "8px", 
                backgroundColor: "#e0e0e0", 
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${uploadProgress}%`,
                  height: "100%",
                  backgroundColor: "#4caf50",
                  transition: "width 0.3s ease"
                }} />
              </div>
              <p style={{ fontSize: "0.9em", color: "#666", marginTop: "8px", textAlign: "center" }}>
                업로드 중... {uploadProgress}%
              </p>
            </div>
          )}
          <S.BigButton onClick={handleUpload} disabled={uploading}>
            {uploading ? "업로드 중..." : "녹음 업로드"}
          </S.BigButton>
        </S.Card>
      )}
    </S.Container>
  );
};

export default Call;
