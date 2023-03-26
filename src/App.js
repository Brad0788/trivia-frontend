import logo from "./logo.svg";
import "./App.css";
import "./components/QuestionsList.js";
import QuestionsList from "./components/QuestionsList.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/NavBar";
import LinearDeterminate from "./components/LinearDeterminate";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <QuestionsList />
        <LinearDeterminate />
      </ThemeProvider>
    </div>
  );
}

export default App;
