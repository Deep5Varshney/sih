import { BrowserRouter, Routes, Route } from "react-router-dom";
import TouristUpload from "./pages/TouristUpload";
import ViewDocs from "./pages/ViewDocs";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TouristUpload />} />
        <Route path="/view/:cid" element={<ViewDocs />} />
  <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
