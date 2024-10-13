type FormValues = {
    post: string;
    title: string;
    date: string;
};

type FormValidity = {
    post: boolean;
    title: boolean;
    date: boolean;
};

type FormState = {
    isValid: FormValidity;
    values: FormValues;
    isFormReadyToSubmit: boolean;
};

type Action =
    | { type: 'SET_VALUES'; payload: Partial<FormValues> }
    | { type: 'RESET_VALIDITY' }
    | { type: 'SUBMIT'; payload: FormValues }
    | { type: 'RESET_FORM' };

export const INITIAL_STATE: FormState = {
    isValid: {
        post: true,
        title: true,
        date: true,
    },
    values: {
        post: '',
        title: '',
        date: '',
    },
    isFormReadyToSubmit: false,
};

export function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_VALUES':
            return { 
                ...state, 
                values: { 
                    ...state.values, 
                    ...action.payload 
                } 
            };

        case 'RESET_VALIDITY':
            return { 
                ...state, 
                isValid: INITIAL_STATE.isValid 
            };

        case 'SUBMIT': {
            const postValidity = !!(action.payload.post && action.payload.post.trim().length);
            const titleValidity = !!(action.payload.title && action.payload.title.trim().length);
            const dateValidity = !!action.payload.date;

            const isFormReadyToSubmit = postValidity && titleValidity && dateValidity;

            return {
                ...state,
                values: action.payload,
                isValid: {
                    post: postValidity,
                    title: titleValidity,
                    date: dateValidity,
                },
                isFormReadyToSubmit,
            };
        }

        case 'RESET_FORM':
            return INITIAL_STATE;

        default:
            return state;
    }
}
 