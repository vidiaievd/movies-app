import PT from 'prop-types';

import { Button, Link } from '../../components';
import { Carousel } from '../../components/Carousel/Carousel';
import {
    StyledWrapper,
    StyledDetails,
    StyledImage,
    StyledImageWrapper,
    StyledInfoWrapper,
    StyledInfo,
    StyledTitle,
    StyledReleaseDate,
    StyledDetailsTop,
    StyledCarousel
} from './styles';

const { REACT_APP_STORAGE_URL } = process.env;

export const MovieDetailsPage = ({ movie, similarMovies }) => {
    const {
        backdrop_path,
        original_title,
        poster_path,
        release_date,
        overview
    } = movie;

    const backdropUrl = REACT_APP_STORAGE_URL + backdrop_path;
    const posterUrl = REACT_APP_STORAGE_URL + poster_path;

    return (
        <StyledWrapper>
            <StyledDetails $imageUrl={backdropUrl}>
                <StyledDetailsTop>
                    <StyledImageWrapper>
                        <StyledImage src={posterUrl} alt={original_title} />
                    </StyledImageWrapper>

                    <StyledInfoWrapper>
                        <StyledInfo>
                            <StyledTitle>{original_title}</StyledTitle>
                            <StyledReleaseDate>
                                {release_date}
                            </StyledReleaseDate>
                            <p>{overview}</p>
                        </StyledInfo>

                        <Button>Add to Favorite</Button>
                    </StyledInfoWrapper>
                </StyledDetailsTop>

                <StyledCarousel>
                    <Carousel>
                        {similarMovies.map(
                            ({ id, poster_path, original_title }) => {
                                const posterUrl =
                                    REACT_APP_STORAGE_URL + poster_path;

                                return (
                                    <Link
                                        to={`/movie/${id}`}
                                        key={id}
                                        title={original_title}
                                    >
                                        <img
                                            src={posterUrl}
                                            alt={original_title}
                                        />
                                    </Link>
                                );
                            }
                        )}
                    </Carousel>
                </StyledCarousel>
            </StyledDetails>
        </StyledWrapper>
    );
};

MovieDetailsPage.propTypes = {
    /**
     * A particular movie details
     */
    movie: PT.shape({
        id: PT.number.isRequired,
        original_title: PT.string.isRequired,
        poster_path: PT.string,
        backdrop_path: PT.string,
        overview: PT.string.isRequired,
        release_date: PT.string.isRequired
    }).isRequired
};
