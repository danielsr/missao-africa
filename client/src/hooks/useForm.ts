import { useState } from 'react';

export default function useForm(initialValues: object) {
    const [values, setValues]: any = useState(initialValues);

    return {
        values,
        reset: (field: string) => setValues({ ...values, [field]: null }),
        bindInput: (field: string) => ({
            value: values?.[field],
            onChange: (newValue: string) => {
                setValues({ ...values, [field]: newValue });
            },
        }),
    };
}
