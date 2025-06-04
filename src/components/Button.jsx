export const Button = ({ type, buttonName, onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {buttonName}
    </button>
  );
};
