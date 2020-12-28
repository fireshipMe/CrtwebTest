// @ts-ignore
import styled from 'styled-components';

type BarPropTypes = {
  completed: number,
}

export const Container = styled.div`
    height: 20px;
    width: 100%;
    background-color: #edb879;
    border-radius: 50px;
    margin: 5px 0;
`;

export const Bar = styled.div<BarPropTypes>`
    height: 100%;
    width: ${props => props.completed + '%'};
    max-width: 100%;
    background-color: #1979a9;
    border-radius: inherit;
    transition: 0.5s width linear;
`;
