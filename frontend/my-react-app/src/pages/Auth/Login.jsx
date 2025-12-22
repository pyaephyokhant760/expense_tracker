import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import {validateEmail} from "../../utils/helper";


const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState("");
  const [error , setError] = useState(null);

  // const nagivate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
  };
  return (
    <AuthLayout>
      <div>
        <div className="lg:w-[70%] h-3/4 md:h-full flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Please Enter Your Details to log in
          </p>

          <form action="" onSubmit={handleLogin}>
            <Input value={email} onChange={({target}) => setEmail(target.value)} label="Email Address" placeholder="Admin@gmail.com" type="text"/>
            <Input value={password} onChange={({target}) => setEmail(target.value)} label="Password" placeholder="Min 8 Character" type="password"/>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">Login</button>
            <p className="text-[13px] text-slate-800">Don't have an account? {""}
              <Link className="font-medium text-primary underline" to="/sign">SignUp</Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
