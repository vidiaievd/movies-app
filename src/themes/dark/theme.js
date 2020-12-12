import * as commonVariables from '../variables';
import * as themeVariables from './variables';

export const theme = {
    ...commonVariables,
    ...themeVariables,
    header: {
        background: `linear-gradient(to right, ${themeVariables.primaryClr}, ${themeVariables.secondaryClr})`,
        color: commonVariables.lightColors[500]
    },
    footer: {
        background: `linear-gradient(to right, ${themeVariables.primaryClr}, ${themeVariables.secondaryClr})`,
        color: commonVariables.lightColors[500]
    },
    button: {
        background: commonVariables.lightColors[500],
        color: commonVariables.darkColors[900]
    }
};
