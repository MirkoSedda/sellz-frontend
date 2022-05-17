import { BE_URL } from "../costants"
import { toastSuccess, toastError } from "./toastNotification"
import "react-toastify/dist/ReactToastify.css"

// export const fetchUser = (token, user) => {
//   axios({
//     method: "GET",
//     url: `${BE_URL}/users/me`,
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(user),
//   })
//     .then(res => {
//       console.log(res.data)
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

export const registerUser = async user => {
  try {
    const res = await fetch(`${BE_URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    })
    const { _id } = await res.json()
    console.log("_id:", _id)
    toastSuccess("Thanks for registering")
    return { _id }
  } catch (error) {
    toastError(`Error registering user: ${error}`)
    console.log(error)
  }
}

// export const LoginUser = async userData => {
//   try {
//     const res = await fetch(`${BE_URL}/users/login`, {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: {
//         "Content-type": "application/json",
//       },
//     })
//     if (res.ok) {
//       const { user, accessToken } = await res.json()
//       console.log("user:", user)
//       console.log("accessToken:", accessToken)
//       window.localStorage.setItem("user", JSON.stringify(user))
//       window.localStorage.setItem("accessToken", JSON.stringify(accessToken))
//       toastSuccess("Logged in successfully")
//       return { accessToken, user }
//     }
//   } catch (error) {
//     toastError(`Error logging in user: ${error}`)
//     console.log(error)
//   }
// }
