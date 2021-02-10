import styled from 'styled-components/macro';

export const CarouselContent = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    left: 0;
    transition: left 0.5s ease-in-out;
    margin: auto;
    padding: 0 ${props => props.theme.padding.md};
`;
