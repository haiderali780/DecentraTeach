// import {Skeleton} from '@/components/ui/skeleton';
// import {initialSignInFormData, initialSignUpFormData} from '@/config';
// import {checkAuthService, loginService, registerService} from '@/services';
// import {createContext, useEffect, useState} from 'react';

// export const AuthContext = createContext(null);

// export default function AuthProvider({children}) {
//   const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
//   const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
//   const [auth, setAuth] = useState({
//     authenticate: false,
//     user: null,
//   });
//   const [loading, setLoading] = useState(true);

//   async function handleRegisterUser(event) {
//     event.preventDefault();
//     console.log(signUpFormData.role, ' ya ha role');
//     const data = await registerService(signUpFormData);
//     console.log(data);
//   }

//   async function handleLoginUser(event) {
//     event.preventDefault();
//     const data = await loginService(signInFormData);
//     console.log(data, 'datadatadatadatadata');

//     if (data.success) {
//       console.log(data.data.user);
//       sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
//       setAuth({
//         authenticate: true,
//         user: data.data.user,
//       });
//     } else {
//       setAuth({
//         authenticate: false,
//         user: null,
//       });
//     }
//   }

//   //check auth user

//   async function checkAuthUser() {
//     try {
//       const data = await checkAuthService();
//       if (data.success) {
//         setAuth({
//           authenticate: true,
//           user: data.data.user,
//         });
//         setLoading(false);
//       } else {
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       if (!error?.response?.data?.success) {
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//         setLoading(false);
//       }
//     }
//   }

//   function resetCredentials() {
//     setAuth({
//       authenticate: false,
//       user: null,
//     });
//   }

//   useEffect(() => {
//     checkAuthUser();••••••••••
//   }, []);

//   console.log(auth, 'gf');

//   return (
//     <AuthContext.Provider
//       value={{
//         signInFormData,
//         setSignInFormData,
//         signUpFormData,
//         setSignUpFormData,
//         handleRegisterUser,
//         handleLoginUser,
//         auth,
//         resetCredentials,
//       }}
//     >
//       {loading ? <Skeleton /> : children}
//     </AuthContext.Provider>
//   );
// }

import {Skeleton} from '@/components/ui/skeleton';
import {initialSignInFormData, initialSignUpFormData} from '@/config';
import {checkAuthService, loginService, registerService} from '@/services';
import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({authenticate: false, user: null});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({username: null, password: null}); // ⚠️ Error object for specific fields

  const updateAuth = (isAuthenticated, user = null) => {
    setAuth({authenticate: isAuthenticated, user});
  };

  // async function handleRegisterUser(event) {
  //   event.preventDefault();
  //   try {
  //     const data = await registerService(signUpFormData);
  //     if (data.success) {
  //       console.log('Registration successful:', data);
  //       setError({ username: null, password: null });
  //     } else {
  //       setError({ username: null, password: data.message || 'Registration failed' });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError({ username: null, password: 'Registration error occurred' });
  //   }
  // }
  async function handleRegisterUser(event) {
    event.preventDefault();

    try {
      const data = await registerService(signUpFormData);

      if (data.success) {
        console.log('Registration successful:', data);
        setError({username: 'regist', password: 'Sign Up successful. You can now sign in'});
        // alert('Registration successful! You can now log in.');
      } else {
        setError({username: null, password: 'User already exists with these credentials.'});
      }
    } catch (err) {
      console.error(err);
      setError({username: '!regist', password: 'User already exists with these credentials.'});
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const data = await loginService(signInFormData);
      if (data.success) {
        sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
        updateAuth(true, data.data.user);
        setError({username: null, password: null}); // Clear errors on success
      } else {
        updateAuth(false);
        // ⚠️ Handling specific errors
        if (data.message.includes('username') || data.message.includes('User not found')) {
          setError({username: 'Incorrect username', password: null});
        } else if (data.message.includes('password')) {
          setError({username: null, password: 'Incorrect password'});
        } else {
          setError({username: null, password: data.message || 'Invalid credentials'});
        }
      }
    } catch (err) {
      console.error(err);
      setError({username: null, password: 'Invalid credentials'});
    }
  }

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        updateAuth(true, data.data.user);
      } else {
        updateAuth(false);
      }
    } catch (err) {
      console.error(err);
      updateAuth(false);
    } finally {
      setLoading(false);
    }
  }

  function resetCredentials() {
    sessionStorage.removeItem('accessToken');
    updateAuth(false);
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
        error,
        setError, // ⚠️ Error object exposed
      }}
    >
      {loading ? <Skeleton message='Authenticating...' /> : children}
    </AuthContext.Provider>
  );
}
