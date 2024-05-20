const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen  gap-4 p-[5%]  h-screen max-w-[1300px] 2xl:max-w-[1500px] my-0 mx-auto  ">
      {children}
    </main>
  );
};
export default Main;
