import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
 
function Login() { 
 
  const navigate = useNavigate(); 
 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
 
  const handleLogin = (e) => { 
 
    e.preventDefault(); 
 
    if (!email || !password) { 
      alert("Please enter email and password"); 
      return; 
    } 
 
    alert("Login successful!"); 
 
    navigate("/dashboard"); 
  }; 
 
  return ( 
    <section className="login-page"> 
 
      <div className="login-card"> 
 
        <div className="login-icon"> 
          🔐 
        </div> 
 
        <p className="small-title">WELCOME BACK</p> 
 
        <h1>Login</h1> 
 
        <p> 
          Login to manage your job applications. 
        </p> 
 
        <form onSubmit={handleLogin}> 
 
          <div className="input-group"> 
            <label>Email</label> 
 
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => 
                setEmail(e.target.value) 
              } 
            /> 
          </div> 
 
          <div className="input-group"> 
            <label>Password</label> 
 
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => 
                setPassword(e.target.value) 
              } 
            /> 
          </div> 
 
          <button 
            type="submit" 
            className="btn primary full" 
          > 
            Login 
          </button> 
 
        </form> 
 
      </div> 
 
    </section> 
  ); 
} 
 
export default Login; 