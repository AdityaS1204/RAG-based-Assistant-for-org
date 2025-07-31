import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../Pages/Login' 

const AppRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/login',
        element:<Login/>
      }
    ]
  }
])

export default AppRouter