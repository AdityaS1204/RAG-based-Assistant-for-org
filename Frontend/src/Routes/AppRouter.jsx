import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../Pages/Login' 
import Dashboard from '../Pages/Dashboard'
import Chat from '../Pages/Chat'
const AppRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/chat',
        element:<Chat/>
      },
    ]
  }
])

export default AppRouter