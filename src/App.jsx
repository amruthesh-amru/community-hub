import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./appRouter";
function App() {
  return (
    <>
      <Router>
        <AppRouter />
      </Router>
    </>
  );
}

export default App;
