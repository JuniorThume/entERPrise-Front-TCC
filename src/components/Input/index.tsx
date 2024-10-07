
interface IInputProps {
  type: string;
  label: string;
}

const Input = ({ type, label }: IInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      <input type={type} id={label} className="bg-white border pl-1" />
    </div>
  );
}

export default Input;
