import InputStyle from "./Input.module.css";

type InputProps = {
  leftIcon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  rightIcon?: React.ReactNode;
  type?: "bold" | "unbold";
};

function Input({
  leftIcon,
  label,
  placeholder,
  rightIcon,
  type = "unbold",
}: InputProps) {
  return (
    <div className={InputStyle.boxInput}>
      {leftIcon && <span style={{ margin: "10px" }}>{leftIcon}</span>}
      {label && <label>{label}</label>}
      <input
        className={`${InputStyle.input} ${
          type === "bold" ? InputStyle.boldPlaceholder : ""
        }`}
        placeholder={placeholder}
      />
      {rightIcon && <span style={{ marginRight: "10px" }}>{rightIcon}</span>}
    </div>
  );
}

export default Input;
