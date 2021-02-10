import { useSelector } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Layout } from './components';
import { LayoutContainer, MovieDetailsPageContainer } from './containers';
import { HomePage, AuthPage } from './pages';
import { GlobalStyles } from './styles';

import { darkTheme } from './themes';

const FakePage = props => {
    return <p>Hello! I'm a fake page!</p>;
};

const authSelector = state => !!state.auth.idToken;
export const App = () => {
    const isAuthenticated = useSelector(authSelector);
    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <GlobalStyles />
                <LayoutContainer>
                    {({ movies, ...other }) => (
                        <Layout {...other}>
                            <Switch>
                                {isAuthenticated && (
                                    <Route
                                        path={[
                                            '/favorite',
                                            '/profile',
                                            '/logout'
                                        ]}
                                    >
                                        <FakePage />
                                    </Route>
                                )}

                                {!isAuthenticated && (
                                    <Route path={['/auth']}>
                                        <AuthPage />
                                    </Route>
                                )}

                                <Route path="/movie/:movieId" exact>
                                    <MovieDetailsPageContainer
                                        movies={movies}
                                    />
                                </Route>

                                <Route path="/" exact>
                                    <HomePage movies={movies} />
                                </Route>

                                <Redirect to="/" />
                            </Switch>
                        </Layout>
                    )}
                </LayoutContainer>
            </ThemeProvider>
        </BrowserRouter>
    );
};
