import style from "./select.module.scss";

interface Props {
  onSelect: (value: string) => void;
  options: string[];
}

export default function SelectDropDown({ onSelect, options }: Props) {
  return (
    <div className={style.container}>
      {options.map((option) => (
        <div
          key={option}
          className={style.option}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}
