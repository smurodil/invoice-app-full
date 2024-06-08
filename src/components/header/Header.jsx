import './header.css'
import { useState } from 'react'
import logo from '/assets/logo.png'
import sun from '/assets/icon-sun.svg'
import moon from '/assets/icon-moon.svg'
import profile from '/assets/image-avatar.jpg'
import useDarkMode from '../../hooks/useDarkMode'

function header() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDarkSide((state) => !state);
  };
  return (
    <div>
      <header className='header'>
        <img src={logo} alt="" className='header-logo' />
        <div className='header-bottom'>
          { colorTheme === "light" ? <img src={sun} onClick={toggleDarkMode} className='moon-icon'/> : <img onClick={toggleDarkMode} className='moon-icon' src={moon}/>}

          <div className='header-bottom-content'>

          </div>
          <div>
            <img src={profile} alt="" className='header-avatar' />
          </div>
        </div>
      </header>
    </div>
  )
}

export default header