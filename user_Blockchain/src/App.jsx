import { BrowserRouter, Routes, Route } from "react-router-dom";
import TouristUpload from "./pages/TouristUpload";
import ViewDocs from "./pages/ViewDocs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TouristUpload />} />
        <Route path="/view/:cid" element={<ViewDocs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
