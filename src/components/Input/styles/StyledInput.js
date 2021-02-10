import styled, { css } from 'styled-components/macro';

const padding = '1.55rem';

const applyError = ({ $hasError }) => {
    if (!$hasError) return;

    return css`
        &::placeholder {
            color: ${props => props.theme.commonColors.danger};
        }
        border: 2px solid ${props => props.theme.commonColors.danger};
        box-shadow: 0 0 15px ${props => props.theme.commonColors.danger};
    `;
};

export const StyledInput = styled.input`
    display: block;
    width: 100%;
    padding: ${props => `${padding} ${props.theme.padding.sm}`};
    border-radius: 0.3rem;
    border: none;

    ${applyError}
`;
