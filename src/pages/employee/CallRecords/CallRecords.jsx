import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCallRecords, searchByPhone } from "../../../api/callRecordsApi";
import { Phone, Search, FileText } from "lucide-react";
import * as S from "./CallRecords.styles";

// API가 한국 시간(서버 LocalDateTime)으로 내려주므로, 타임존 없으면 KST(+09:00)로 해석
const formatDateTime = (dt) => {
  if (!dt) return "-";
  const str = typeof dt === "string" ? dt.trim() : String(dt);
  const asKst = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(str) && !str.includes("+") && !str.endsWith("Z")
    ? str + "+09:00"
    : str;
  const d = new Date(asKst);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CallRecords = () => {
  const navigate = useNavigate();
  const [scope, setScope] = useState("my");
  const [page, setPage] = useState(0);
  const [list, setList] = useState({ content: [], totalElements: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [searchPhone, setSearchPhone] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCallRecords(scope, page, 10) // 10개 단위로 페이징
      .then(setList)
      .catch(() => setList({ content: [], totalElements: 0, totalPages: 0 }))
      .finally(() => setLoading(false));
  }, [scope, page]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;
    setSearching(true);
    try {
      const data = await searchByPhone(searchPhone.trim());
      setSearchResult(data);
    } catch {
      setSearchResult([]);
    } finally {
      setSearching(false);
    }
  };

  const listContent = list?.content ?? [];
  const totalPages = list?.totalPages ?? 0;

  return (
    <S.Container>
      <S.Header>
        <h1>통화 기록</h1>
        <p>통화 녹음 후 욕설 집계 결과를 확인할 수 있습니다.</p>
        <S.CallLink onClick={() => navigate("/app/call")}>웹 통화 시작</S.CallLink>
      </S.Header>

      <S.Toolbar>
        <S.SelectScope
          value={scope}
          onChange={(e) => {
            setScope(e.target.value);
            setPage(0);
          }}
        >
          <option value="my">내 통화 위주</option>
          <option value="all">전체 위주</option>
        </S.SelectScope>

        <S.SearchForm onSubmit={handleSearch}>
          <S.SearchInput
            type="text"
            placeholder="고객 전화번호 검색"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <S.SearchButton type="submit" disabled={searching}>
            <Search size={18} /> 검색
          </S.SearchButton>
        </S.SearchForm>
      </S.Toolbar>

      {searchResult !== null && (
        <S.SearchResultCard>
          <h3>
            <Phone size={18} /> 전화번호 &quot;{searchPhone}&quot; 검색 결과
          </h3>
          {searchResult.length === 0 ? (
            <p>해당 전화번호의 통화 기록이 없습니다.</p>
          ) : (
            <S.Table>
              <thead>
                <tr>
                  <th>통화 일시</th>
                  <th>종료 일시</th>
                  <th>욕설 횟수</th>
                  <th>담당 직원</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((row) => (
                  <tr key={row.id}>
                    <td>{formatDateTime(row.callStartedAt)}</td>
                    <td>{formatDateTime(row.callEndedAt)}</td>
                    <td>{row.profanityCount}</td>
                    <td>{row.employeeName ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          )}
        </S.SearchResultCard>
      )}

      <S.Card>
        <h3>
          <FileText size={18} /> 목록
        </h3>
        {loading ? (
          <S.Loading>불러오는 중...</S.Loading>
        ) : listContent.length === 0 ? (
          <S.Empty>통화 기록이 없습니다.</S.Empty>
        ) : (
          <>
            <S.Table>
              <thead>
                <tr>
                  <th>고객 전화번호</th>
                  <th>통화 시작</th>
                  <th>통화 종료</th>
                  <th>욕설 횟수</th>
                  <th>상태</th>
                  {scope === "all" && <th>담당 직원</th>}
                </tr>
              </thead>
              <tbody>
                {listContent.map((row) => (
                  <tr key={row.id}>
                    <td>{row.customerPhone}</td>
                    <td>{formatDateTime(row.callStartedAt)}</td>
                    <td>{formatDateTime(row.callEndedAt)}</td>
                    <td>
                      <S.ProfanityCount $warn={row.profanityCount > 0}>
                        {row.profanityCount}
                      </S.ProfanityCount>
                    </td>
                    <td>{row.status}</td>
                    {scope === "all" && <td>{row.employeeName ?? "-"}</td>}
                  </tr>
                ))}
              </tbody>
            </S.Table>
            {totalPages > 1 && (
              <S.Pagination>
                <button
                  type="button"
                  disabled={page <= 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  이전
                </button>
                <span>
                  {page + 1} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  다음
                </button>
              </S.Pagination>
            )}
          </>
        )}
      </S.Card>
    </S.Container>
  );
};

export default CallRecords;
