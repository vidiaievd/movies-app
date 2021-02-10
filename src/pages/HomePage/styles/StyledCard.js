import styled from 'styled-components/macro';
import { StyledLink } from '../../../components/Link';

const cardMaxWidth = '50rem';
const borderRadius = '0.5rem';
// const borderWidth = '0.2rem';

export const StyledCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: ${cardMaxWidth};
    height: 50vw;
    background-image: url(${props => props.$imageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: ${borderRadius};
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* background-color: transparent; */
        background-color: ${props => props.theme.darkColors[800]};
        border-radius: ${borderRadius};
        transition: background-color 300ms ease;
    }

    &:hover {
        &:before {
            background-color: transparent;
        }
    }

    ${StyledLink} {
        position: relative;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
`;
