const FormRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-3 flex-col [&>label]:font-semibold ">
      {children}
    </div>
  );
};
export default FormRow;
