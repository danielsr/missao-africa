import { useState } from 'react';

export const useForm = (initialValues: object) => {
    const [values, setValues]: any = useState(initialValues);

    return {
        values,
        reset: (field: string) => setValues({ ...values, [field]: null }),
        bind: (field: string) => ({
            value: values?.[field],
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValues({ ...values, [field]: event.target.value });
            },
        }),
    };
};
