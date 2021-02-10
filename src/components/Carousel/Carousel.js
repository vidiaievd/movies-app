import { useState } from 'react';

import {
    CarouselContent,
    RightArrowButton,
    LeftArrowButton,
    CarouselWrapper,
    CarouselBox
} from './styles';

export const Carousel = ({ children }) => {
    const [position, setPosition] = useState(0);

    const left = () => {
        if (position === 0) return;
        setPosition(prevPosition => prevPosition + 10);
    };

    const right = () => {
        if (position === -140) return;
        setPosition(prevPosition => prevPosition - 10);
    };
    const step = {
        left: `${position}em`
    };

    return (
        <CarouselWrapper>
            <LeftArrowButton onClick={left}></LeftArrowButton>

            <CarouselBox>
                <CarouselContent style={step}>{children}</CarouselContent>
            </CarouselBox>

            <RightArrowButton onClick={right}></RightArrowButton>
        </CarouselWrapper>
    );
};
