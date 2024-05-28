// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/firebase'
import { UserDataType } from 'src/context/types'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const Auth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (Auth.setUser) {
          if (user) {
          Auth.setUser({
            username: user.displayName,
            email: user.email,
            uid: user.uid,
          } as UserDataType)

        } else {
          // setLoading(false)
          Auth.setUser(null);
          if (router.asPath !== '/') {
            router.replace({
              pathname: '/login',
              query: { returnUrl: router.asPath }
            })
          } else {
            router.replace('/login')
          }

          return fallback
        }
        }
        
      })

      return () => unsubscribe();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )


  return <>{children}</>
}

export default AuthGuard
