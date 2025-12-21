import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import {useState} from "react-dom";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input";


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error , setError] = useState(null);

  const nagivate = useNavigate();

  const handleLogin = async (e) => {};
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

          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
