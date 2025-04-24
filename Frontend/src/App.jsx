import {Route, Routes} from "react-router-dom";
import Home from "./pages/home.jsx";
import Captainlogin from "./pages/Captainlogin.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/userSignup.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";

const App = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/captainlogin" element={<Captainlogin />} />
            <Route path="/captainsignup" element={<CaptainSignup />} />
            <Route path="/captainlogin" element={<Captainlogin />} />

        </Routes>
    </div>
  )
}

export default App
