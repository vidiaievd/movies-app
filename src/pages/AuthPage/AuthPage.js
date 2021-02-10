import { Redirect } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Button } from '../../components';

import { useTabs } from '../../hooks';

import {
    StyledLabel,
    StyledLegend,
    StyledForm,
    StyledFormError
} from '../../styles';
import {
    StyledWrapper,
    StyledFormWrapper,
    StyledFieldset,
    StyledFormGroup,
    StyledTabs,
    StyledTab
} from './Styles';

import { authenticateUser } from '../../store';

const PASSWORD_MIN_LENGTH = 6;

const EMAIL_REG_EXP = /^[a-zA-Z._-]+@[a-z]+\.[a-z]{2,3}$/;

const SIGN_IN_FIELDS = [
    {
        id: 'email',
        label: 'E-mail',
        type: 'email',
        name: 'email',
        placeholder: 'E-mail',
        validationRules: {
            required: 'E-mail is required',
            pattern: {
                value: EMAIL_REG_EXP,
                message: 'Provided value should be an e-mail address'
            }
        }
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        validationRules: {
            required: 'Password is required',
            minLength: {
                value: PASSWORD_MIN_LENGTH,
                message: `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`
            }
        }
    }
];

const SIGN_UP_FIELDS = [
    {
        id: 'firstName',
        label: 'First Name',
        type: 'text',
        name: 'firstName',
        placeholder: 'First Name',
        validationRules: {
            required: 'First Name is required'
        }
    },
    {
        id: 'lastName',
        label: 'Last Name',
        type: 'text',
        name: 'lastName',
        placeholder: 'Last Name',
        validationRules: {
            required: 'Last Name is required'
        }
    },
    {
        id: 'email',
        label: 'E-mail',
        type: 'email',
        name: 'email',
        placeholder: 'E-mail',
        validationRules: {
            required: 'E-mail is required',
            pattern: {
                value: EMAIL_REG_EXP,
                message: 'Provided value should be an e-mail address'
            }
        }
    },
    {
        id: 'age',
        label: 'Age',
        type: 'number',
        name: 'age',
        placeholder: 'Age',
        validationRules: {
            required: 'Age is required'
        }
    },
    {
        id: 'password',
        label: 'Password',
        type: 'password',
        name: 'password',
        placeholder: 'Password',
        validationRules: {
            required: 'Password is required',
            minLength: {
                value: PASSWORD_MIN_LENGTH,
                message: `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`
            }
        }
    },
    {
        id: 'confirmPassword',
        label: 'Confirm password',
        type: 'password',
        name: 'password',
        placeholder: 'Confirm password',
        validationRules: {
            required: 'Confirm password is required'
        }
    }
];

const authSelector = state => !!state.auth.idToken;

const {
    REACT_APP_FIREBASE_AUTH_URL: authUrl,
    REACT_APP_FIREBASE_API_KEY: apiKey
} = process.env;

export const AuthPage = () => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            email: 'john@gmail.com',
            password: '123456'
        }
    });

    const { activeTab, tabs, onSwitchTab } = useTabs();
    const isAuthenticated = useSelector(authSelector);
    const dispatch = useDispatch();

    if (isAuthenticated) return <Redirect to="/" />;

    const onSubmit = async values => {
        const user = {
            ...values,
            returnSecureToken: true
        };
        const mode =
            activeTab === tabs.SIGN_IN ? 'signInWithPassword' : 'signUp';
        const url = `${authUrl}${mode}?key=${apiKey}`;

        try {
            const {
                data: { idToken, localId }
            } = await axios.post(url, user);

            dispatch(authenticateUser(idToken, localId));
        } catch (e) {
            console.error(e);
        }
    };
    const onError = errors => console.log('[errors] = ', errors);

    const fields = activeTab === tabs.SIGN_IN ? SIGN_IN_FIELDS : SIGN_UP_FIELDS;
    const legend = activeTab === tabs.SIGN_IN ? 'Sign In' : 'Sign Up';
    return (
        <StyledWrapper>
            <StyledFormWrapper>
                <StyledTabs>
                    <StyledTab
                        $active={activeTab === tabs.SIGN_IN}
                        onClick={() => onSwitchTab(tabs.SIGN_IN)}
                    >
                        Sign In
                    </StyledTab>
                    <StyledTab
                        $active={activeTab === tabs.SIGN_UP}
                        onClick={() => onSwitchTab(tabs.SIGN_UP)}
                    >
                        Sign Up
                    </StyledTab>
                </StyledTabs>
                <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
                    <StyledFieldset>
                        <StyledLegend>{legend}</StyledLegend>

                        {fields.map(
                            ({
                                id,
                                label,
                                name,
                                validationRules,
                                ...other
                            }) => (
                                <StyledFormGroup key={id}>
                                    <StyledLabel htmlFor={id}>
                                        {label}
                                    </StyledLabel>
                                    <Input
                                        $hasError={errors[name]}
                                        ref={register(validationRules)}
                                        id={id}
                                        name={name}
                                        {...other}
                                    />

                                    <ErrorMessage
                                        errors={errors}
                                        name={name}
                                        as={StyledFormError}
                                    />
                                </StyledFormGroup>
                            )
                        )}
                    </StyledFieldset>

                    <Button type="submit">Submit</Button>
                </StyledForm>
            </StyledFormWrapper>
        </StyledWrapper>
    );
};
