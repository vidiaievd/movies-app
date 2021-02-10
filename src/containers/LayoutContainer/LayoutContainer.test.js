import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { darkTheme } from '../../themes';
import { ThemeProvider } from 'styled-components';
import { LayoutContainer } from './LayoutContainer';
import { Layout } from '../../components';
import { rootReducer } from '../../store';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

describe('<LayoutContainer />', () => {
    it('should change search input value on type', () => {
        const { getByPlaceholderText, debug } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={darkTheme}>
                        <LayoutContainer>
                            {({ movies, ...other }) => (
                                <Layout {...other}>Hello World</Layout>
                            )}
                        </LayoutContainer>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
        const input = getByPlaceholderText(/search movies/i);
        fireEvent.change(input, { target: { value: 'Avengers' } });
        debug(input);
        expect(input.value).toBe('Avengers');
    });
});
