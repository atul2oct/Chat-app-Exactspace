import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import AuthPage from "./Pages/AuthPage";
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col
    font-inter text-white'>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        {/* Private Route - for Only Logged in User */}
        <Route path="/chats" element={<PrivateRoute><ChatPage/></PrivateRoute>}/>
        <Route path="/auth" element={<AuthPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
