import { BrowserRouter, Route, Routes } from "react-router-dom";
import Doctor from "./pages/Doctor/Doctor";
import Base from "./pages/Base/Base";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base children={<Doctor />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
