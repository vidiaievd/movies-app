import { Component, createContext } from 'react';

export const ToasterContext = createContext({
    toasts: [],
    isVisible: false,
    onAddToast: toast => {},
    onRemoveToast: toastId => {}
});

const COLORS = ['red', 'blue', 'green', 'orange'];

export class Toaster extends Component {
    state = {
        toasts: [],
        isVisible: false
    };

    handleAddToast = toast => {
        this.setState(prevState => {
            const bgColor = COLORS[prevState.toasts.length];

            return {
                toasts: [
                    ...prevState.toasts,
                    {
                        ...toast,
                        bgColor
                    }
                ]
            };
        });
    };

    handleRemoveToast = toastId => {
        this.setState(prevState => ({
            toasts: prevState.toasts.filter(t => t.id !== toastId)
        }));
    };

    render() {
        const { toasts, isVisible } = this.state;
        const { children } = this.props;

        return (
            <ToasterContext.Provider
                value={{
                    toasts,
                    isVisible,
                    onAddToast: this.handleAddToast,
                    onRemoveToast: this.handleRemoveToast
                }}
            >
                {children}
            </ToasterContext.Provider>
        );
    }
}
