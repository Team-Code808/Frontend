import React from 'react';
import { Search, Plus } from 'lucide-react';
import * as S from '../TeamManagement.styles';

export default function TeamSearchBar({
  selectedDept,
  setSelectedDept,
  searchQuery,
  setSearchQuery,
  departments,
  onAddDeptClick,
}) {
  return (
    <S.SearchBar>
      <S.FilterSelectWrapper>
        <S.FilterSelect value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </S.FilterSelect>
        <S.AddDeptButton onClick={onAddDeptClick}>
          <Plus size={16} />
          부서 추가
        </S.AddDeptButton>
      </S.FilterSelectWrapper>
      <S.SearchInputWrapper>
        <Search />
        <S.SearchInput
          type="text"
          placeholder="직원 이름 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </S.SearchInputWrapper>
    </S.SearchBar>
  );
}
