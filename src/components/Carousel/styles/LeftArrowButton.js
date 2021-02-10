import styled from 'styled-components/macro';

export const LeftArrowButton = styled.div`
    width: 4.5vw;
    height: 4.5vw;
    border-top: 10px solid ${props => props.theme.secondaryClr};
    border-right: 10px solid ${props => props.theme.secondaryClr};
    transform: rotate(-135deg);
    cursor: pointer;
    opacity: 0.7;
    margin: auto 0;
`;
