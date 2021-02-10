import styled from 'styled-components/macro';

export const CarouselWrapper = styled.div`
    /* position: relative; */
    margin-top: ${props => props.theme.margin.md};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
