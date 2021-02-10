import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { darkTheme } from '../../themes';
import { Button } from './Button';

describe('<Button />', () => {
    it('should contain text "Submit"', () => {
        const { debug, getByText } = render(
            <ThemeProvider theme={darkTheme}>
                <Button>Submit</Button>)
            </ThemeProvider>
        );
        debug();

        getByText(/submit/i);
    });
});
