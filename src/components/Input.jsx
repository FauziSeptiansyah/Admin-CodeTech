export const Input = ({ type, name, value, onChange, className }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};
