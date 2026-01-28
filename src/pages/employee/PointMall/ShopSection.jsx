import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import * as S from './PointMall.styles';
import useStore from '../../../store/useStore';

const ShopSection = ( {refreshData} ) => {
    const { items: shopItems, fetchItems, addPurchaseHistory, user } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const companyId = user?.companyId || 2;
        fetchItems(companyId);
    }, [user?.companyId]);

    // [수정] 인자로 item을 직접 받도록 변경
    const handleConfirmPurchase = async (item) => {
        console.log("구매 시도 데이터:", { 
        user,   
        itemId: item.id, 
        userId: user?.id,  // 이 값이 "sad"인지 확인해보세요!
        price: item.price 
    });
        if (!item || !user) return;

        // 즉시 구매이므로 최소한의 확인창은 띄우는 것이 좋습니다 (선택 사항)
        if (!window.confirm(`[${item.name}] 상품을 교환하시겠습니까?`)) return;

        try {
            await addPurchaseHistory(
                item.id,
                2,
                user.name,
                item.name,
                item.price,
                item.img
            );

            alert(`${item.name} 교환이 완료되었습니다!`);

            if (refreshData) {
                await refreshData(); 
            }
            
            // 포인트와 재고 동기화를 위해 다시 불러오기
            await fetchItems(user.companyId || 2); 
           
        } catch (error) {
            alert("구매 실패", error);
            
        }
    };

    const filteredItems = shopItems.filter(item => 
        item.active && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <S.ShopContainer>
            {/* 상단 검색바 섹션 */}
            <S.SearchBar>
            <S.SearchInputWrapper>
                <Search /> {/* styled-components 내부의 svg 선택자에 의해 스타일링됨 */}
                <input
                    type="text"
                    placeholder="상품명 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </S.SearchInputWrapper>
            
            {/* 필요하다면 여기에 필터 버튼 등을 추가할 수 있는 구조(display: flex)입니다 */}
        </S.SearchBar>
            <S.ItemsGrid>
                {filteredItems.map((item) => (
                    <S.ItemCard key={item.id}>
                        <S.ItemImage>{item.img}</S.ItemImage>
                        <S.ItemInfo>
                            <h3>{item.name}</h3>
                            <p>{Number(item.price).toLocaleString()} <span>P</span></p>
                            <S.QuantityInfo>재고: <span>{item.quantity || 0}개</span></S.QuantityInfo>
                        </S.ItemInfo>

                        {/* [수정 핵심] 클릭 시 해당 아이템을 인자로 넘기며 함수 실행 */}
                        <S.ExchangeButton
                            onClick={() => handleConfirmPurchase(item)}
                            disabled={!item.quantity || item.quantity <= 0}
                        >
                            {(!item.quantity || item.quantity <= 0) ? '품절' : '교환하기'}
                        </S.ExchangeButton>
                    </S.ItemCard>
                ))}
            </S.ItemsGrid>
        </S.ShopContainer>
    );
};

export default ShopSection;