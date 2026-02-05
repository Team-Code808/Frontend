import React from 'react';
import { X } from 'lucide-react';
import * as S from '../TeamManagement.styles';

export default function AddDeptModal({
  newDeptName,
  setNewDeptName,
  onClose,
  onSubmit,
}) {
  return (
    <S.ModalOverlay>
      <S.Backdrop onClick={onClose} />
      <S.AddDeptModalContainer>
        <S.AddDeptModalHeader>
          <h3>부서 추가</h3>
          <S.CloseModalButton onClick={onClose}>
            <X size={24} />
          </S.CloseModalButton>
        </S.AddDeptModalHeader>
        <S.AddDeptModalContent>
          <S.InputGroup>
            <label>부서명</label>
            <S.AddDeptInput
              type="text"
              placeholder="부서명을 입력하세요"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
              autoFocus
            />
          </S.InputGroup>
          <S.AddDeptButtonGroup>
            <S.AddDeptCancelButton onClick={onClose}>취소</S.AddDeptCancelButton>
            <S.AddDeptSubmitButton onClick={onSubmit}>추가</S.AddDeptSubmitButton>
          </S.AddDeptButtonGroup>
        </S.AddDeptModalContent>
      </S.AddDeptModalContainer>
    </S.ModalOverlay>
  );
}
