import classes from './Button.module.scss';

export const Button = ({ children }) => (
    <button className={classes.button}>{children}</button>
);
