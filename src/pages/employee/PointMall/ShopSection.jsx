import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import * as S from './PointMall.styles';
import useStore from '../../../store/useStore';

const ShopSection = () => {
    const { items: shopItems, addPurchaseHistory, user } = useStore();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

    const handlePurchaseClick = (item) => {
        setSelectedItem(item);
        setIsPurchaseModalOpen(true);
    };

    const handleConfirmPurchase = () => {
        if (selectedItem && user) {
            addPurchaseHistory(
                selectedItem.id,
                user.id || user.userId || 'unknown',
                user.name || user.userName || '알 수 없음',
                selectedItem.name,
                selectedItem.price,
                selectedItem.img
            );
            alert(`${selectedItem.name} 교환이 완료되었습니다!`);
            setIsPurchaseModalOpen(false);
            setSelectedItem(null);
        }
    };

    return (
        <S.ShopContainer>
            <S.ShopHeader>
                <h2>추천 기프티콘</h2>
                <S.SearchBar>
                    <S.SearchInputWrapper>
                        <Search />
                        <input type="text" placeholder="상품 검색..." />
                    </S.SearchInputWrapper>
                    <S.FilterBtn><Filter size={16} /></S.FilterBtn>
                </S.SearchBar>
            </S.ShopHeader>

            <S.ItemsGrid>
                {shopItems.filter(item => item.isActive).map((item) => (
                    <S.ItemCard key={item.id}>
                        <S.ItemImage>{item.img}</S.ItemImage>
                        <S.ItemInfo>
                            <h3>{item.name}</h3>
                            <p>{item.price} <span>P</span></p>
                            <S.QuantityInfo>남은 수량: <span>{item.quantity || 0}개</span></S.QuantityInfo>
                        </S.ItemInfo>
                        <S.ExchangeButton
                            onClick={() => handlePurchaseClick(item)}
                            disabled={!item.quantity || item.quantity <= 0}
                        >
                            {(!item.quantity || item.quantity <= 0) ? '품절' : '교환하기'}
                        </S.ExchangeButton>
                    </S.ItemCard>
                ))}
            </S.ItemsGrid>

            {isPurchaseModalOpen && selectedItem && (
                <S.ModalOverlay>
                    <S.Backdrop onClick={() => setIsPurchaseModalOpen(false)} />
                    <S.ModalContainer>
                        <S.ModalHeader>
                            <S.ModalHeaderTop>
                                <S.IconCircle><ShoppingBag size={24} color="white" /></S.IconCircle>
                                <S.CloseButton onClick={() => setIsPurchaseModalOpen(false)}><X size={24} color="white" /></S.CloseButton>
                            </S.ModalHeaderTop>
                            <S.ModalTitle>상품 교환</S.ModalTitle>
                            <S.ModalSubtitle>보유 포인트로 해당 상품을 교환하시겠습니까?</S.ModalSubtitle>
                        </S.ModalHeader>
                        <S.ModalBody>
                            <S.PurchaseInfo>
                                <div className="img-placeholder">{selectedItem.img}</div>
                                <div>
                                    <h4>{selectedItem.name}</h4>
                                    <p>{selectedItem.price} P 차감</p>
                                </div>
                            </S.PurchaseInfo>
                            <S.ConfirmButton onClick={handleConfirmPurchase}>
                                <CheckCircle2 size={20} /> 교환 확정
                            </S.ConfirmButton>
                        </S.ModalBody>
                    </S.ModalContainer>
                </S.ModalOverlay>
            )}
        </S.ShopContainer>
    );
};

export default ShopSection;