import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import * as S from './BusinessCard.styles';
import { extractBusinessCard, registerBusinessCard, getBusinessCardContacts } from '../../../api/businessCardApi';
import { teamApi } from '../../../api/teamApi';
import { applicationsApi } from '../../../api/applicationsApi';

const BusinessCard = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extracted, setExtracted] = useState(null);
  const [extractLoading, setExtractLoading] = useState(false);
  const [extractError, setExtractError] = useState(null);
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [rankId, setRankId] = useState('');
  const [ranks, setRanks] = useState([]);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(true);

  const loadDepartments = useCallback(async () => {
    try {
      const list = await teamApi.getDepartmentsList();
      setDepartments(Array.isArray(list) ? list : []);
    } catch {
      setDepartments([]);
    }
  }, []);

  const loadRanks = useCallback(async () => {
    try {
      const list = await applicationsApi.getRanks();
      setRanks(Array.isArray(list) ? list : []);
    } catch {
      setRanks([]);
    }
  }, []);

  const loadContacts = useCallback(async () => {
    setContactsLoading(true);
    try {
      const list = await getBusinessCardContacts();
      setContacts(Array.isArray(list) ? list : []);
    } catch {
      setContacts([]);
    } finally {
      setContactsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDepartments();
    loadRanks();
  }, [loadDepartments, loadRanks]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setExtractError(null);
    setExtracted(null);
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!f.type.startsWith('image/')) {
      setExtractError('이미지 파일만 업로드 가능합니다.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleExtract = async (e) => {
    e?.preventDefault();
    if (!file) {
      setExtractError('명함 이미지를 선택해 주세요.');
      return;
    }
    setExtractLoading(true);
    setExtractError(null);
    try {
      const d = await extractBusinessCard(file);
      if (d?.extractionError && !d?.name && !d?.email) {
        setExtractError(d.extractionError || '명함 인식에 실패했습니다.');
        setExtracted(null);
        return;
      }
      setExtracted({
        name: d?.name ?? '',
        phone: d?.phone ?? d?.mobile ?? '',
        email: d?.email ?? '',
      });
    } catch (err) {
      setExtractError(err.response?.data?.message || err.message || '명함 인식 중 오류가 발생했습니다.');
      setExtracted(null);
    } finally {
      setExtractLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setExtracted((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    if (!extracted?.name?.trim()) {
      setRegisterError('이름을 입력해 주세요.');
      return;
    }
    if (!extracted?.phone?.trim()) {
      setRegisterError('연락처를 입력해 주세요.');
      return;
    }
    if (!extracted?.email?.trim()) {
      setRegisterError('이메일을 입력해 주세요.');
      return;
    }
    if (!departmentId) {
      setRegisterError('부서를 선택해 주세요.');
      return;
    }
    if (!rankId) {
      setRegisterError('직급을 선택해 주세요.');
      return;
    }
    setRegisterLoading(true);
    setRegisterError(null);
    try {
      await registerBusinessCard({
        name: extracted.name.trim(),
        phone: extracted.phone.trim(),
        email: extracted.email.trim(),
        departmentId: Number(departmentId),
        rankId: Number(rankId),
      });
      setExtracted(null);
      setFile(null);
      setPreview(null);
      setDepartmentId('');
      setRankId('');
      loadContacts();
    } catch (err) {
      setRegisterError(err.response?.data?.message || err.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <S.Container>
      <S.PageHeader>
        <h2>명함 관리</h2>
        <p>명함 이미지를 업로드하면 이름·연락처·이메일을 추출한 뒤, 부서·직급을 선택하여 직원 입사 신청으로 등록됩니다.</p>
      </S.PageHeader>

      <S.Card>
        <S.SectionTitle>1. 명함 이미지 업로드</S.SectionTitle>
        <S.UploadZone>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={extractLoading} />
          {preview ? (
            <div>
              <img
                src={preview}
                alt="명함 미리보기"
                style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: '0.5rem' }}
              />
              <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                {file?.name} {!extractLoading && '(클릭하여 변경)'}
              </p>
            </div>
          ) : (
            <div>
              <Upload size={40} style={{ color: '#64748b', marginBottom: '0.5rem' }} />
              <p style={{ fontWeight: 700, color: '#94a3b8' }}>클릭하여 명함 이미지 선택</p>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>JPG, PNG (20MB 이하)</p>
            </div>
          )}
        </S.UploadZone>
        <div style={{ marginTop: '1rem' }}>
          <S.PrimaryButton type="button" onClick={handleExtract} disabled={!file || extractLoading}>
            {extractLoading ? (
              <>
                <Loader2 size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                인식 중…
              </>
            ) : (
              '명함 인식하기'
            )}
          </S.PrimaryButton>
        </div>
        {extractError && (
          <S.ErrorBox style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            {extractError}
          </S.ErrorBox>
        )}
      </S.Card>

      {extracted && (
        <S.Card>
          <S.SectionTitle>2. 정보 확인 후 부서·직급 선택</S.SectionTitle>
          <form onSubmit={handleRegister}>
            <S.FormGrid>
              <S.InputGroup>
                <label>이름 *</label>
                <input
                  value={extracted.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  placeholder="이름"
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>연락처 *</label>
                <input
                  value={extracted.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  placeholder="010-0000-0000"
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>이메일 *</label>
                <input
                  type="email"
                  value={extracted.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="email@example.com"
                />
              </S.InputGroup>
              <S.InputGroup>
                <label>부서 *</label>
                <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                  <option value="">선택</option>
                  {departments.map((dept) => (
                    <option key={dept.departmentId} value={dept.departmentId}>
                      {dept.departmentName}
                    </option>
                  ))}
                </select>
              </S.InputGroup>
              <S.InputGroup>
                <label>직급 *</label>
                <select value={rankId} onChange={(e) => setRankId(e.target.value)}>
                  <option value="">선택</option>
                  {ranks.map((r) => (
                    <option key={r.rankId} value={r.rankId}>{r.rankName}</option>
                  ))}
                </select>
              </S.InputGroup>
            </S.FormGrid>
            <S.RegisterRow>
              <S.PrimaryButton type="submit" disabled={registerLoading}>
                {registerLoading ? (
                  <>
                    <Loader2 size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                    등록 중…
                  </>
                ) : (
                  '입사 신청으로 등록'
                )}
              </S.PrimaryButton>
            </S.RegisterRow>
            {registerError && (
              <S.ErrorBox style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} />
                {registerError}
              </S.ErrorBox>
            )}
          </form>
        </S.Card>
      )}

      <S.Card>
        <S.SectionTitle>등록된 명함 연락처</S.SectionTitle>
        {contactsLoading ? (
          <p style={{ color: '#94a3b8' }}>목록 조회 중…</p>
        ) : contacts.length === 0 ? (
          <p style={{ color: '#64748b' }}>등록된 연락처가 없습니다. 위에서 명함을 업로드 후 등록해 보세요.</p>
        ) : (
          <S.TableWrap>
            <S.Table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>이메일</th>
                  <th>부서</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.phone || c.mobile || '-'}</td>
                    <td>{c.email || '-'}</td>
                    <td>{c.departmentName || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableWrap>
        )}
      </S.Card>
    </S.Container>
  );
};

export default BusinessCard;
