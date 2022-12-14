import './App.css';
import SideMenu from './Components/SideMenu/SideMenu.js';
import { useDarkMode } from './Components/SideMenu/useDarkMode.js';
import MainFeed from './Components/MainFeed/MainFeed';
import VideoMeet from './Components/VideoMeeting/VideoMeet';
import Messages from './Components/Messages/Messages';
import { Routes, Route } from 'react-router-dom';
import Error404 from './Components/Error/Error404';

function App() {
  const [theme, toggleButton] = useDarkMode();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={[
            <SideMenu toggleButton={toggleButton} theme={theme} />,
            <MainFeed theme={theme} />,
          ]}
        />
        <Route
          path="/VideoCall"
          element={[
            <SideMenu toggleButton={toggleButton} theme={theme} />,
            <VideoMeet />,
          ]}
        />
        <Route
          path="/Message"
          element={[
            <SideMenu toggleButton={toggleButton} theme={theme} />,
            <Messages />,
          ]}
        />
        <Route path="/*" element={<Error404></Error404>} />
        <Route path="/404" element={<Error404></Error404>} />
      </Routes>
    </>
  );
}

export default App;
