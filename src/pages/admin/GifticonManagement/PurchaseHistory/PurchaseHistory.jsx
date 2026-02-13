import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ShoppingBag, Search, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react'; // 아이콘 추가
import { useNavigate } from 'react-router-dom';
import useStore from '../../../../store/useStore';
import * as S from './PurchaseHistory.styles';

const PurchaseHistory = () => {
    const navigate = useNavigate();
    // purchasePagination 추가 추출
    const { purchaseHistory, purchasePagination, fetchAllPurchaseHistory, loading } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');

    // 컴포넌트 마운트 시 0페이지 로드
    useEffect(() => {
        fetchAllPurchaseHistory(); 
    }, [fetchAllPurchaseHistory]);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < purchasePagination.totalPages) {
            fetchAllPurchaseHistory(newPage);
        }
    };

    // 필터링 로직 (현재 페이지의 데이터 내에서 필터링)
    const filteredHistory = useMemo(() => {
        return purchaseHistory.filter(purchase => {
            const matchesSearch = 
                purchase.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                purchase.itemName.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesDate = filterDate === '' || 
                purchase.purchaseDate.startsWith(filterDate);
            
            return matchesSearch && matchesDate;
        });
    }, [purchaseHistory, searchTerm, filterDate]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    return (
        <S.Container>
            <S.Header>
                <S.BackButton onClick={() => navigate('/app/gifticons')}>
                    <ArrowLeft size={20} /> 뒤로가기
                </S.BackButton>
                <S.Title>
                    <ShoppingBag size={32} /> 구매 내역
                </S.Title>
            </S.Header>

            <S.Filters>
                <S.SearchWrapper>
                    <Search size={18} />
                    <S.SearchInput
                        type="text"
                        placeholder="직원명 또는 상품명 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </S.SearchWrapper>
                <S.DateWrapper>
                    <Calendar size={18} />
                    <S.DateInput
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </S.DateWrapper>
            </S.Filters>

            <S.TableContainer>
                {/* 1. 로딩 오버레이: 로딩 중일 때만 기존 테이블 위에 나타남 */}
                {loading && (
                    <S.LoadingOverlay>
                        <S.Spinner /> {/* 혹은 "불러오는 중..." 텍스트 */}
                    </S.LoadingOverlay>
                )}

                {/* 2. 데이터 유무에 따른 렌더링 (로딩 중에도 테이블은 사라지지 않음) */}
                {purchaseHistory.length === 0 && !loading ? (
                    <S.EmptyState>
                        <ShoppingBag size={48} />
                        <p>구매 내역이 없습니다.</p>
                    </S.EmptyState>
                ) : (
                    <>
                        <S.Table style={{ opacity: loading ? 0.5 : 1 }}>
                            <S.TableHead>
                                <S.TableRow>
                                    <S.TableHeader>구매일시</S.TableHeader>
                                    <S.TableHeader>직원명</S.TableHeader>
                                    <S.TableHeader>상품명</S.TableHeader>
                                    <S.TableHeader>가격</S.TableHeader>
                                </S.TableRow>
                            </S.TableHead>
                            <S.TableBody>
                                {filteredHistory.map((purchase) => (
                                    <S.TableRow key={purchase.id}>
                                        <S.TableCell><S.DateCell>{formatDate(purchase.purchaseDate)}</S.DateCell></S.TableCell>
                                        <S.TableCell><S.UserCell><User size={16} /> {purchase.userName}</S.UserCell></S.TableCell>
                                        <S.TableCell><S.ItemCell><S.ItemIcon>{purchase.itemImg}</S.ItemIcon> {purchase.itemName}</S.ItemCell></S.TableCell>
                                        <S.TableCell><S.PriceCell>{purchase.itemPrice.toLocaleString()} P</S.PriceCell></S.TableCell>
                                    </S.TableRow>
                                ))}
                            </S.TableBody>
                        </S.Table>

                        {/* 페이지네이션 UI 추가 */}
                        <S.Pagination>
                            <S.PageButton 
                                onClick={() => handlePageChange(purchasePagination.currentPage - 1)}
                                disabled={purchasePagination.currentPage === 0}
                            >
                                <ChevronLeft size={20} />
                            </S.PageButton>
                            
                            <S.PageNumber>
                                <strong>{purchasePagination.currentPage + 1}</strong> / {purchasePagination.totalPages}
                            </S.PageNumber>

                            <S.PageButton 
                                onClick={() => handlePageChange(purchasePagination.currentPage + 1)}
                                disabled={purchasePagination.currentPage === purchasePagination.totalPages - 1}
                            >
                                <ChevronRight size={20} />
                            </S.PageButton>
                        </S.Pagination>
                    </>
                )}
            </S.TableContainer>

            {purchasePagination.totalElements > 0 && (
                <S.Summary>
                    전체 <strong>{purchasePagination.totalElements}건</strong> 중 현재 페이지 내역입니다.
                </S.Summary>
            )}
        </S.Container>
    );
};

export default PurchaseHistory;