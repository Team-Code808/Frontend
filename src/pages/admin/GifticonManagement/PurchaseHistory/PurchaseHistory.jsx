import React, { useMemo, useState } from 'react';
import { ArrowLeft, ShoppingBag, Search, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../../store/useStore';
import * as S from './PurchaseHistory.styles';

const PurchaseHistory = () => {
    const navigate = useNavigate();
    const { purchaseHistory } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');

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
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    return (
        <S.Container>
            <S.Header>
                <S.BackButton onClick={() => navigate('/app/gifticons')}>
                    <ArrowLeft size={20} />
                    뒤로가기
                </S.BackButton>
                <S.Title>
                    <ShoppingBag size={32} />
                    구매 내역
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
                {filteredHistory.length === 0 ? (
                    <S.EmptyState>
                        <ShoppingBag size={48} />
                        <p>구매 내역이 없습니다.</p>
                    </S.EmptyState>
                ) : (
                    <S.Table>
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
                                    <S.TableCell>
                                        <S.DateCell>{formatDate(purchase.purchaseDate)}</S.DateCell>
                                    </S.TableCell>
                                    <S.TableCell>
                                        <S.UserCell>
                                            <User size={16} />
                                            {purchase.userName}
                                        </S.UserCell>
                                    </S.TableCell>
                                    <S.TableCell>
                                        <S.ItemCell>
                                            <S.ItemIcon>{purchase.itemImg}</S.ItemIcon>
                                            {purchase.itemName}
                                        </S.ItemCell>
                                    </S.TableCell>
                                    <S.TableCell>
                                        <S.PriceCell>{purchase.itemPrice} P</S.PriceCell>
                                    </S.TableCell>
                                </S.TableRow>
                            ))}
                        </S.TableBody>
                    </S.Table>
                )}
            </S.TableContainer>

            {filteredHistory.length > 0 && (
                <S.Summary>
                    총 <strong>{filteredHistory.length}건</strong>의 구매 내역이 있습니다.
                </S.Summary>
            )}
        </S.Container>
    );
};

export default PurchaseHistory;
