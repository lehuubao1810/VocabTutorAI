// ** React Imports
import { createContext, ReactNode, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, LoginParams, UserDataType } from './types'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from 'src/firebase'
import { doc, getDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: (value: UserDataType | null) => {
  },
  setLoading: (value: boolean) => {
  },
  login: async (params: LoginParams) => {
  },
  logout: async () => {
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

  const handleLogin = async (params: LoginParams) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, params.email, params.password)
      .then((userCredential) => {
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
