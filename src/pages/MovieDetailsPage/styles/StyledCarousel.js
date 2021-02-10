import styled from 'styled-components/macro';

import { StyledLink } from '../../../components/Link/styles';

export const StyledCarousel = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    ${StyledLink} {
        margin: ${props => props.theme.margin.md} 0;
        &:hover,
        &:focus {
            outline: 0.2rem solid ${props => props.theme.secondaryClr};
            outline-offset: 0.3rem;
        }

        &:not(:last-child) {
            margin-right: ${props => props.theme.margin.md};
        }

        img {
            width: 12.5rem;
            height: 18.75rem;
        }
    }
`;
