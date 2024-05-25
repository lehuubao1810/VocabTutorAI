// ** React Imports
import { createContext, ReactNode, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios Instance
import AxiosInstance from 'src/configs/axios'

// ** Config
// import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, ErrCallbackType, LoginParams, UserDataType } from './types'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from 'src/firebase'
import { doc, getDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: (value: UserDataType | null) => {
    // Implement the logic to set the user
  },
  setLoading: (value: boolean) => {
    // Implement the logic to set the loading state
  },
  login: async (params: LoginParams) => {
    // Implement the logic to handle user login
  },
  logout: async () => {
    // Implement the logic to handle user logout
  }
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()



  useEffect(() => {
    console.log('user', user)
  }, [user])

  const handleLogin = async (params: LoginParams) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, params.email, params.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user;
      })
      .then(async (user) => {
        const userDoc = await getDoc(doc(db, "admin", user.uid));
        const userData = userDoc.data();
        if (!userDoc.exists) {
          setLoading(false)
          setUser(null)
          return;
        }
        setUser(
          {
            email: user.email,
            username: userData?.username,
            uid: user.uid,
          } as UserDataType
        )
        setLoading(false)
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
      });
  }

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null)
      })
      .catch((error: any) => {
        const errorMessage = error.message;
        toast.error(errorMessage)
      });
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
