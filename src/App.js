import './App.css';
import Navbar from './Components/Navbar/Navbar.js';
import SideMenu from './Components/SideMenu/SideMenu.js';
import { useDarkMode } from './Components/Navbar/useDarkMode'
import MainFeed from './Components/MainFeed/MainFeed';
import Messages from './Components/Messages/Messages'

function App() {

  const [theme, toggleButton] = useDarkMode();

  return (
    <>
      <SideMenu theme={theme} />
      <Navbar className='side-bar' toggleButton={toggleButton} theme={theme} />
      <Messages/>
      {/* <UploadBar/> */}
      {/* <MainFeed theme={theme} /> */}
    </>
  );
}

export default App;
