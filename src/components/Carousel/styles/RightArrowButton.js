import styled from 'styled-components/macro';

export const RightArrowButton = styled.div`
    width: 4.5vw;
    height: 4.5vw;
    border-top: 10px solid ${props => props.theme.secondaryClr};
    border-right: 10px solid ${props => props.theme.secondaryClr};
    margin-right: 60px;
    transform: rotate(45deg);
    cursor: pointer;
    opacity: 0.7;
    margin: auto 0;
`;
