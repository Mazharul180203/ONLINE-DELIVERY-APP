import {Route, Routes} from "react-router-dom";
import Start from "./pages/start.jsx";
import Captainlogin from "./pages/Captainlogin.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/userSignup.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import Home from "./pages/Home.jsx";
import UserLogout from "./pages/userLogout.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import Riding from "./pages/Riding.jsx";
import CaptainRiding from "./pages/CaptainRiding.jsx";

const App = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/riding" element={<Riding />} />
            <Route path="/captain-riding" element={<CaptainRiding />} />
            <Route path="/captainlogin" element={<Captainlogin />} />
            <Route path="/captainsignup" element={<CaptainSignup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user/logout" element={<UserLogout/>} />
            <Route path="captain-home" element={<CaptainHome/>} />

        </Routes>
    </div>
  )
}

export default App
