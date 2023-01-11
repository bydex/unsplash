import "./App.css";
import { Header } from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchPage } from "./views/SearchPage";
import { DetailPhoto } from "./views/DetailPhoto";
import { Favourites } from "./views/Favourites";
import { Provider } from "react-redux";
import store from "./store";
import { History } from "./views/History";

function App() {
  return (
    <Provider store={store}>
      <Router className="App">
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/photos/:id" element={<DetailPhoto />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
