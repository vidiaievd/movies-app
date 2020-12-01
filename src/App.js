import {
    useState,
    // useEffect,
    useRef,
    // useContext,
    useMemo,
    useCallback,
    createContext,
    memo
} from 'react';
// import cn from 'classnames';
import styled, { css } from 'styled-components/macro';

// import { Button } from './components/Button/Button';
import classes from './App.module.scss';

const AppContext = createContext({
    userName: '',
    showCounter: true
});

const INLINE_STYLES = {
    borderColor: 'green',
    backgroundColor: 'green',
    textAlign: 'center',
    fontSize: 16
};

const Counter = memo(({ numbers, onChangeInput }) => {
    const [count, setCount] = useState(0);
    // const { userName, showCounter } = useContext(AppContext);
    // const renderCountRef = useRef(0); // { current: 0 }

    console.log('<Counter /> is rendering...', numbers, onChangeInput);

    // renderCountRef.current++;

    // console.log('Renders: ', renderCountRef.current);

    // useEffect(() => {
    //     console.log('<Counter /> is created...');

    //     return () => {
    //         console.log('<Counter /> is going to be removed...');
    //     };
    // }, []);

    // useEffect(() => {
    //     console.log(`Current count: ${count}`);

    //     // Cleanup function
    //     return () => {
    //         console.log("What's going on?!");
    //     };
    // }, [count]);

    const handleIncreaseCount = value =>
        setCount(prevCount => prevCount + value);

    const handleDecreaseCount = value =>
        setCount(prevCount => {
            const newCount = prevCount - value;

            if (newCount < 0) return prevCount;

            return newCount;
        });

    return (
        <div>
            {count}

            {/* <div>
                <div>Username: {userName}</div>
                <div>Show counter: {String(showCounter)}</div>
            </div> */}

            <div>
                <button type="button" onClick={() => handleIncreaseCount(1)}>
                    +1
                </button>

                <button type="button" onClick={() => handleDecreaseCount(1)}>
                    -1
                </button>

                <button type="button" onClick={() => handleIncreaseCount(5)}>
                    +5
                </button>

                <button type="button" onClick={() => handleDecreaseCount(5)}>
                    -5
                </button>
            </div>
        </div>
    );
});

// useEffect:
// - componentDidMount
// - componentDidUpdate
// - componentWillUnmount

export const App = () => {
    const [userName, setUserName] = useState('John Doe');
    const [showCounter, setShowCounter] = useState(true);
    const [showError, setShowError] = useState(false);
    const inputRef = useRef(); // { current: null }

    // console.log('Before useEffect');

    // useEffect(() => {
    //     console.log('showCounter is updated!', showCounter);
    // }, [showCounter]);

    // useEffect(() => {
    //     console.log('userName is updated!', userName);
    // }, [userName]);

    // console.log('After useEffect');

    const numbers = useMemo(() => [1, 2, 3, 4, 5, showCounter], [showCounter]);

    // const handleChangeInput = useMemo(
    //     () => e => setUserName(e.target.value),
    //     []
    // );

    const handleChangeInput = useCallback(e => setUserName(e.target.value), []);

    // const handleChangeInput = e => setUserName(e.target.value);
    const handleToggleCounter = () => setShowCounter(prevState => !prevState);
    const handleFocusInput = () => inputRef.current.focus();

    const handleCreateUser = () => {
        if (userName) return setShowError(false);

        setShowError(true);
        inputRef.current.focus();
    };

    // const inputClassNames = ['input'];

    // if (showError) {
    //     inputClassNames.push('input--error');
    // }

    return (
        <AppContext.Provider value={{ userName, showCounter }}>
            <div className={classes.app}>
                <div>
                    {showCounter && (
                        <Counter
                            numbers={numbers}
                            onChangeInput={handleChangeInput}
                        />
                    )}

                    <button type="button" onClick={handleToggleCounter}>
                        {showCounter ? 'Hide counter' : 'Show counter'}
                    </button>

                    <button type="button" onClick={handleFocusInput}>
                        Focus input
                    </button>

                    <Controls id="hello-world">
                        <InputWrapper>
                            <Input
                                // style={showError ? INLINE_STYLES : null}
                                ref={inputRef}
                                // className={cn('input', {
                                //     'input--error': showError
                                // })}
                                // className={`input ${
                                //     showError ? 'input--error' : ''
                                // }`}
                                // className={inputClassNames.join(' ')}
                                // className={classes.input}
                                $error={showError}
                                name="userName"
                                placeholder="Username"
                                value={userName}
                                onChange={handleChangeInput}
                            />

                            {showError && (
                                <ErrorMessage>
                                    Username is required!
                                </ErrorMessage>
                            )}
                        </InputWrapper>

                        <Button
                            type="button"
                            onClick={handleCreateUser}
                            className={classes.button}
                        >
                            Create user
                        </Button>

                        {/* <Button>CSS Modules Button</Button> */}
                    </Controls>
                </div>
            </div>
        </AppContext.Provider>
    );
};

const primaryClr = '0, 0, 185';
const lightClr = '#fff';
const greyClr = '#ccc';
const dangerClr = '255, 0, 0';

const boxShadowMixin = (color, opacity) =>
    `0 0 20px 5px rgba(${color}, ${opacity})`;

const Controls = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 40px;
`;

const applyError = ({ $error }) => {
    if (!$error) {
        return css`
            &:focus {
                border-color: rgb(${primaryClr});
                box-shadow: ${boxShadowMixin(primaryClr, 0.4)};
            }
        `;
    }

    return css`
        border: 2px solid rgb(${dangerClr});
        box-shadow: ${boxShadowMixin(dangerClr, 0.4)};
    `;
};

const Input = styled.input.attrs({
    type: 'text',
    autoComplete: 'off'
})`
    display: block;
    width: 100%;
    padding: 14px;
    font-size: 16px;
    outline: 0;
    border: 2px solid ${greyClr};
    border-radius: 3px;
    transition: border-color 150ms ease, box-shadow 150ms ease;

    ${applyError}
`;

const InputWrapper = styled.div`
    max-width: 400px;
    width: 100%;
    margin-right: 20px;
`;

const ErrorMessage = styled.span`
    display: inline-block;
    font-size: 12px;
    font-family: sans-serif;
    color: rgb(${dangerClr});
    margin-top: 4px;
`;

const Button = styled.button.attrs({
    type: 'button'
})`
    padding: 16px 25px;
    background-color: rgb(${primaryClr});
    color: ${lightClr};
    border-radius: 3px;
    cursor: pointer;
    border: none;
    outline: 0;
    transition: background-color 150ms ease, box-shadow 150ms ease;

    &:focus {
        box-shadow: ${boxShadowMixin(primaryClr, 0.4)};
    }
`;

// export class App extends Component {
//     state = {
//         count: 0
//     };

//     hello = 'world'

//     handleIncreaseCount = value => {
//         this.setState(prevState => ({
//             count: prevState.count + value
//         }));
//     };

//     handleDecreaseCount = value => {
//         this.setState(prevState => ({
//             count: prevState.count - value
//         }));
//     };

//     render() {
//         const { count } = this.state;

//         return (
//             <div className="app">
//                 <div>
//                     <strong>{count}</strong>

//                     <div>
//                         <button
//                             type="button"
//                             onClick={() => this.handleIncreaseCount(1)}
//                         >
//                             +1
//                         </button>

//                         <button
//                             type="button"
//                             onClick={() => this.handleDecreaseCount(1)}
//                         >
//                             -1
//                         </button>

//                         <button
//                             type="button"
//                             onClick={() => this.handleIncreaseCount(5)}
//                         >
//                             +5
//                         </button>

//                         <button
//                             type="button"
//                             onClick={() => this.handleDecreaseCount(5)}
//                         >
//                             -5
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
