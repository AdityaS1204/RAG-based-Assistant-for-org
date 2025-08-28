import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../Pages/Login' 
import Dashboard from '../Pages/Dashboard'
import Chat from '../Pages/Chat'
import UsersList from '../Pages/Admin/UsersList'
import Uploads from '../Pages/Admin/Uploads'
import ActivityLogs from '../Pages/Admin/ActivityLogs'

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
      {
        path:'/admin/users',
        element:<UsersList/>
      },
      {
        path:'/admin/uploads',
        element:<Uploads/>
      },
      {
        path:'/admin/activity-logs',
        element:<ActivityLogs/>
      }
    ]
  }
])

export default AppRouter