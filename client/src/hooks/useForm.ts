import { useState } from 'react';

export default function useForm(initialValues: object = {}, validation: object = {}) {
  const [values, setValues]: any = useState(initialValues);
  const [errors, setErrors]: any = useState({});
  const [touches, setTouches]: any = useState({});

  const bindInput = (field: string) => {
    const value = values?.[field] ?? '';
    const touched = touches?.[field] ?? false;
    const error = errors?.[field]?.[0];

    return {
      value,
      touched,
      error,
      onChange: (newValue: string) => {
        setValues({ ...values, [field]: newValue });
        setTouches({ ...touches, [field]: true });
        setErrors((errors) => ({
          ...errors,
          [field]: validation?.[field]?.map((item) => item(newValue)).filter((item) => item),
        }));
      },
      onBlur: () => null,
    };
  };

  return {
    values,
    setValues,
    bindInput,
  };
}
