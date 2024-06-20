import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";


interface Props<T> {
  initialValues: T
}

export const useForm = <T>({ initialValues }: Props<T>) => {
  const [formValues, setFormValues] = useState(initialValues);

  const onChange = ({ key, value }: { key: keyof T, value: string }) => {
    setFormValues({
      ...formValues,
      [key]: value
    });
  }


  return {
    onChange,
    formValues,
  }
}

