import React from 'react';
import logoSrc from '../assets/Logo.png';
import * as S from './Logo.styles';

const Logo = ({
  className = "",
  size = 40,
  showText = false,
  textColor
}) => {
  let color = '#0f172a';
  if (textColor && textColor.includes('white')) color = 'white';
  if (textColor && textColor.includes('slate-200')) color = '#e2e8f0';

  return (
    <S.LogoContainer className={className}>
      <S.LogoImage
        src={logoSrc}
        alt="Calm Desk Logo"
        style={{ width: size, height: size }}
      />
      {showText && (
        <S.LogoText color={color}>
          Calm Desk
        </S.LogoText>
      )}
    </S.LogoContainer>
  );
};

export default Logo;
