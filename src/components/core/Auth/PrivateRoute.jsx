// This will prevent authenticated users from accessing this route
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  
  if ( token !== null) {
    return children
  } 
  else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute


// import jwtDecode from "jwt-decode"
// // ...

// function PrivateRoute({ children }) {
//   const { token } = useSelector((state) => state.auth)
//   const decodedToken = token ? jwtDecode(token) : null

//   if (decodedToken && decodedToken.exp > Date.now() / 1000) {
//     return children
//   } 
//   else {
//     return <Navigate to="/login" />
//   }
// }

// export default PrivateRoute