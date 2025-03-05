// import CommonForm from "@/components/common-form";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { signInFormControls, signUpFormControls } from "@/config";
// import { AuthContext } from "@/context/auth-context";
// import { GraduationCap } from "lucide-react";
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";

// function AuthPage() {
//   const [activeTab, setActiveTab] = useState("signin");
//   const {
//     signInFormData,
//     setSignInFormData,
//     signUpFormData,
//     setSignUpFormData,
//     handleRegisterUser,
//     handleLoginUser,
//   } = useContext(AuthContext);

//   function handleTabChange(value) {
//     setActiveTab(value);
//   }

//   function checkIfSignInFormIsValid() {
//     return (
//       signInFormData &&
//       signInFormData.userEmail !== "" &&
//       signInFormData.password !== ""
//     );
//   }

//   function checkIfSignUpFormIsValid() {
//     return (
//       signUpFormData &&
//       signUpFormData.userName !== "" &&
//       signUpFormData.userEmail !== "" &&
//       signUpFormData.password !== ""&&
//       signUpFormData.role !== ''
//     );
//   }

//   console.log(signInFormData);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="px-4 lg:px-6 h-14 flex items-center border-b">
//         <Link to={"/"} className="flex items-center justify-center">
//           <GraduationCap className="h-8 w-8 mr-4 text-teal" />
//           <span className='font-extrabold md:text-xl text-[14px]'>
//             <span className='text-gold'>DECENTRA</span>
//             <span className='text-teal'>TEACH</span>
//           </span>
//         </Link>
//       </header>
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <Tabs
//           value={activeTab}
//           defaultValue="signin"
//           onValueChange={handleTabChange}
//           className="w-full max-w-md"
//         >
//           <TabsList className="grid w-full grid-cols-2 border-teal border-2">
//             <TabsTrigger value="signin">Sign In</TabsTrigger>
//             <TabsTrigger value="signup">Sign Up</TabsTrigger>
//           </TabsList>
//           <TabsContent value="signin">
//             <Card className="border-teal border-2 p-6 rounded-lg shadow-lg bg-white hover:shadow-teal hover:shadow-xl">
//               <CardHeader>
//                 <CardTitle>Sign in to your account</CardTitle>
//                 <CardDescription>
//                   Enter your email and password to access your account
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <CommonForm
//                   formControls={signInFormControls}
//                   buttonText={"Sign In"}
//                   formData={signInFormData}
//                   setFormData={setSignInFormData}
//                   isButtonDisabled={!checkIfSignInFormIsValid()}
//                   handleSubmit={handleLoginUser}
//                 />
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="signup"
//           className="border-teal border-2 p-6 rounded-lg shadow-lg bg-white hover:shadow-teal hover:shadow-xl">
//             <Card className='p-6 space-y-4' style={{border: '3px solid red !important'}}>
//               <CardContent className="space-y-2">
//                 <CommonForm
//                   formControls={signUpFormControls}
//                   buttonText={"Sign Up"}
//                   formData={signUpFormData}
//                   setFormData={setSignUpFormData}
//                   isButtonDisabled={!checkIfSignUpFormIsValid()}
//                   handleSubmit={handleRegisterUser}
//                 />
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default AuthPage;




import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
    auth,
    error,
    setError, // ✅ Add this to reset error
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (auth.authenticate) {
      navigate("/dashboard"); // Change to your dashboard route
    }
  }, [auth, navigate]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    setError(null); // ✅ Clear error when switching tabs
    // Reset form data when switching tabs
    setSignInFormData({ userEmail: "", password: "" });
    setSignUpFormData({ userName: "", userEmail: "", password: "", role: "" });
  };

  const isSignInFormValid = () =>
    signInFormData.userEmail && signInFormData.password;

  const isSignUpFormValid = () =>
    signUpFormData.userName &&
    signUpFormData.userEmail &&
    signUpFormData.password &&
    signUpFormData.role;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to="/" className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4 text-teal" />
          <span className="font-extrabold md:text-xl text-[14px]">
            <span className="text-gold">DECENTRA</span>
            <span className="text-teal">TEACH</span>
          </span>
        </Link>
      </header>

      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2 border-teal border-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Sign In Tab */}
          <TabsContent value="signin">
            <Card className="border-teal border-2 p-6 rounded-lg shadow-lg bg-white hover:shadow-teal hover:shadow-xl">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText="Sign In"
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!isSignInFormValid()}
                  handleSubmit={handleLoginUser}
                />
                {activeTab === "signin" && (
                  <div className="mt-2 space-y-1">
                    {error?.username && (
                      <p className="text-red-500 text-sm">{error.username}</p>
                    )}
                    {error?.password && (
                      <p className="text-red-500 text-sm">{error.password}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <Card className="border-teal border-2 p-6 rounded-lg shadow-lg bg-white hover:shadow-teal hover:shadow-xl">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Fill in your details to register an account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText="Sign Up"
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!isSignUpFormValid()}
                  handleSubmit={handleRegisterUser}
                />
                {error && activeTab === "signup" && (
                  <p className="text-red-500 text-sm mt-2">{error.password}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
