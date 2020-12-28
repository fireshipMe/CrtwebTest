import styled from 'styled-components';

type PropType = {
  isHidden?: boolean,
  isRemoved?: boolean,
}

export const PanelContainer = styled.div<PropType>`
  width: 15%;
  display: flex;
  visibility: ${props => props.isRemoved ? 'hidden' : 'visible'};
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: ${props => props.isHidden ? "black" : "transparent"};
  border: ${props => props.isHidden ? "1px solid white" : "none"};
  box-sizing: border-box;
`;
