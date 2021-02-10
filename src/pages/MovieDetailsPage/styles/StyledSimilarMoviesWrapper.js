import styled from 'styled-components/macro';

export const StyledSimilarMoviesWrapper = styled.div`
    /* display: flex; */
    position: absolute;
    height: 150px;
    margin-top: ${props => props.theme.margin.md};
    position: relative;
    z-index: 1;
`;
