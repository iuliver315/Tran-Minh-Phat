import ThemeContextProvider from "./contexts/theme.context";
import { Footer, Header, Main } from "./layout";
import { Convertor } from "./components";

const App = () => {
  return (
    <ThemeContextProvider>
      <Header />
      <Main>
        <Convertor />
      </Main>
      <Footer />
    </ThemeContextProvider>
  );
};
export default App;
