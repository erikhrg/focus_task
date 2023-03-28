import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Logastro from './pages/Logastro'
import Tomanocuu from './pages/Tomanocuu'
import './App.css'

const Layout = () => {
  return (
    <>
      <div className='container'>
        <Outlet/>
      </div>
    </>
  )
}

const router = createBrowserRouter ([
  {
    path:'/', element: <Layout/>,
    children: [
      {
        path:'/', element: <Logastro/>
      },
      {
        path:'/tomanocuu', element: <Tomanocuu/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
