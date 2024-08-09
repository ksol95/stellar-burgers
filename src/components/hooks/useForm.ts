import { useState } from 'react';

export function useForm<T>(inputValues: T) {
  const [formValue, setFormValue] = useState<T>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return { formValue, handleChange, setFormValue };
}
