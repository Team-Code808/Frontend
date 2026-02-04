import React, { useState } from 'react';
import { Search } from 'lucide-react';
import * as S from './PointMall.styles';
import useStore from '../../../store/useStore';

const ShopSection = ({ refreshData }) => {
    // 💡 mallData에서 shopItems를 가져오고, fetchPointMallData를 사용하도록 수정
    const { mallData, fetchPointMallData, addPurchaseHistory, user } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const shopItems = mallData?.shopItems || [];

    const handleConfirmPurchase = async (item) => {
        if (!item || !user) {
            alert("사용자 정보가 없거나 상품이 선택되지 않았습니다.");
            return;
        }

        if (!window.confirm(`[${item.name}] 상품을 교환하시겠습니까?`)) return;

        try {
            // 💡 하드코딩된 6 대신 user.id 사용
            await addPurchaseHistory(
                item.id,
                user.id, 
                user.name,
                item.name,
                item.price,
                item.img
            );

            alert(`${item.name} 교환이 완료되었습니다!`);

            console.log(refreshData);
            // 부모 컴포넌트(PointMall)의 포인트 정보를 최신화
            if (refreshData) {
                await refreshData(user.id); 
            }
           
        } catch (error) {
            // 백엔드에서 온 에러 메시지 처리 (예: 포인트 부족)
            const errorMsg = error.response?.data?.message || "구매에 실패했습니다.";
            alert(errorMsg);
        }
    };

    const filteredItems = shopItems.filter(item => 
        item.active && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <S.ShopContainer>
            <S.SearchBar>
                <S.SearchInputWrapper>
                    <Search />
                    <input
                        type="text"
                        placeholder="상품명 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </S.SearchInputWrapper>
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