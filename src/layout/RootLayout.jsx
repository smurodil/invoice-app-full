import { Outlet } from "react-router-dom"
import Header from '../components/header/Header'
import './rootLayout.css'

function RootLayout() {
  return (
    <div>
        <Header/>
        <main className="main">
          <Outlet />
        </main>
    </div>
  )
}

export default RootLayout