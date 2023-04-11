import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../Pages/AuthPage/AuthPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
