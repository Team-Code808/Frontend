import styled from 'styled-components';

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoImage = styled.img`
  object-fit: cover;
  border-radius: 0.75rem;
`;

export const LogoText = styled.span`
  font-size: 1.25rem; /* xl */
  font-weight: 900;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: ${props => props.color || '#0f172a'}; /* default slate-900 */
`;
