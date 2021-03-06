import styled from 'styled-components/macro';

const maxWidth = '35rem';

export const StyleInputWrapper = styled.div`
    max-width: ${maxWidth};
    width: 100%;
    margin-right: ${props => props.theme.margin.md};
`;
