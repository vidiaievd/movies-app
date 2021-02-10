import styled from 'styled-components/macro';

import { StyledButton } from '../../../components/Button';
import { StyledForm, StyledLegend } from '../../../styles';

const maxWidth = '50rem';

export const StyledFormWrapper = styled.div`
    max-width: ${maxWidth};
    width: 100%;
    background-color: ${props => props.theme.lightColors[600]};
    border-radius: 0.9rem;
    box-shadow: 0 0.6rem 1rem ${props => props.theme.darkColors[800]};

    ${StyledForm} {
        padding: ${props => props.theme.padding.lg};
    }

    ${StyledLegend} {
        margin-bottom: ${props => props.theme.padding.md};
    }

    ${StyledButton} {
        margin: 0 auto;
    }
`;
