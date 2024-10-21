import { Control, Controller, FieldName } from "react-hook-form";
import { ProductFormData } from "../../zodSchemas/product/types";
import { LoginFormData } from "../../zodSchemas/login/types";

interface IInputProps {
  type: string;
  label: string;
  control: Control<ProductFormData|LoginFormData>;
  inputValue: string | number;
  name: FieldName<ProductFormData|LoginFormData>;
}

const Input = ({ type, label, inputValue, control, name }: IInputProps) => {
  const identifier = label + name;
  return (
    <div className="flex flex-col">
      <label htmlFor={identifier}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={() => (
          <input
            required
            type={type}
            id={identifier}
            className="bg-white border pl-1"
            defaultValue={inputValue}
          />
        )}
        rules={{ required: true }}
      />
    </div>
  );
};

export default Input;
