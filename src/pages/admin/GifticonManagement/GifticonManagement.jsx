import React, { useEffect, useState } from 'react';
import { Gift, CheckCircle2, XCircle, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/useStore';
import * as S from './GifticonManagement.styles';

const AdminGifticonManagement = () => {
    const navigate = useNavigate();

    const { items, fetchItems, toggleItemStatus, activateAll, deactivateAll, updateItemQuantity } = useStore();
    const [editingQuantity, setEditingQuantity] = useState({});

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);


    return (
        <S.Container>
            <S.PageHeader>
                <S.Title>
                    <Gift size={32} />
                    기프티콘 관리
                </S.Title>
                <S.ButtonGroup>
                    <S.BulkButton onClick={() => navigate('/app/gifticons/history')}>
                        <ShoppingBag size={18} />
                        구매 내역
                    </S.BulkButton>
                    <S.BulkButton onClick={activateAll} variant="activate">
                        <CheckCircle2 size={18} />
                        전체 활성화
                    </S.BulkButton>
                    <S.BulkButton onClick={deactivateAll} variant="deactivate">
                        <XCircle size={18} />
                        전체 비활성화
                    </S.BulkButton>
                </S.ButtonGroup>
            </S.PageHeader>

            <S.Grid>
                {items.map(item => (
                    <S.ItemCard key={item.id} $activeStatus={item.active}>
                        <S.ItemImage activeStatus={item.active}>
                            {item.img}
                        </S.ItemImage>
                        <S.ItemInfo>
                            <S.ItemName>{item.name}</S.ItemName>
                            <S.ItemPrice><span>{item.price}</span> P</S.ItemPrice>
                        </S.ItemInfo>

                        <S.QuantityRow>
                            <S.QuantityLabel>수량</S.QuantityLabel>
                            <S.QuantityControls>
                                <S.QuantityButton
                                    onClick={() => updateItemQuantity(item.id, (item.quantity || 0) - 1)}
                                    disabled={(item.quantity || 0) <= 0}
                                >
                                    <Minus size={14} />
                                </S.QuantityButton>
                                {editingQuantity[item.id] !== undefined ? (
                                    <S.QuantityInput
                                        type="number"
                                        min="0"
                                        value={editingQuantity[item.id]}
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value) || 0;
                                            setEditingQuantity({ ...editingQuantity, [item.id]: value });
                                        }}
                                        onBlur={() => {
                                            const value = Math.max(0, editingQuantity[item.id] || 0);
                                            updateItemQuantity(item.id, value);
                                            setEditingQuantity({ ...editingQuantity, [item.id]: undefined });
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const value = Math.max(0, editingQuantity[item.id] || 0);
                                                updateItemQuantity(item.id, value);
                                                setEditingQuantity({ ...editingQuantity, [item.id]: undefined });
                                                e.target.blur();
                                            } else if (e.key === 'Escape') {
                                                setEditingQuantity({ ...editingQuantity, [item.id]: undefined });
                                                e.target.blur();
                                            }
                                        }}
                                        autoFocus
                                    />
                                ) : (
                                    <S.QuantityValue
                                        onClick={() => setEditingQuantity({ ...editingQuantity, [item.id]: item.quantity || 0 })}
                                    >
                                        {item.quantity || 0}
                                    </S.QuantityValue>
                                )}
                                <S.QuantityButton
                                    onClick={() => updateItemQuantity(item.id, (item.quantity || 0) + 1)}
                                >
                                    <Plus size={14} />
                                </S.QuantityButton>
                            </S.QuantityControls>
                        </S.QuantityRow>

                        <S.StatusRow>
                            <S.StatusBadge activeStatus={item.active}>
                                {item.active ? '판매중' : '비활성'}
                            </S.StatusBadge>
                            <S.ToggleButton
                                activeStatus={item.active}
                                onClick={() => toggleItemStatus(item.id)}
                            />
                        </S.StatusRow>
                    </S.ItemCard>
                ))}
            </S.Grid>
        </S.Container>
    );
};

export default AdminGifticonManagement;
