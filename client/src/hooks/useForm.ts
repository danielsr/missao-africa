import { useState, useEffect, useRef } from 'react';

export default function useForm(initialValues: object = {}, validation: object = {}) {
  const [values, setValues]: any = useState(initialValues);
  const [errors, setErrors]: any = useState({});
  const [touches, setTouches]: any = useState({});
  const validationRef = useRef(validation);

  const invalid = Object.keys(errors).some((error) => errors[error].length > 0);

  useEffect(() => {
    if (validationRef.current) {
      const errors = Object.keys(validationRef.current).reduce(
        (res, field) => ({
          ...res,
          [field]: validationRef.current[field]
            .map((item) => item(values[field]))
            .filter((item) => item),
        }),
        {}
      );
      setErrors(errors);
    }
  }, [values, validationRef]);

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
      },
      onBlur: () => null,
    };
  };

  return {
    invalid,
    values,
    setValues,
    bindInput,
  };
}
