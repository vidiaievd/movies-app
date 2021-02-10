import styled, { css } from 'styled-components/macro';

const applyActiveStyles = ({ $active }) => {
    if (!$active) return;
    return css`
        background-color: #b3b3b3;
    `;
};

const applyCursor = ({ $active }) => {
    if ($active) return;
    return css`
        cursor: pointer;
    `;
};

export const StyledTab = styled.div.attrs({ role: 'button', tabIndex: 0 })`
    width: 50%;
    padding: ${props => props.theme.padding.md};
    text-align: center;

    ${applyActiveStyles}
    ${applyCursor}

    &:first-child {
        border-radius: 0.9rem 0 0 0;
    }
    &:last-child {
        border-radius: 0 0.9rem 0 0;
    }
    outline: 0;
`;
