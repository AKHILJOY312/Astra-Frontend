import { useState } from "react";
import { LoginUseCase } from "../../application/use-cases/auth/LoginUseCase";
import { AuthGatewayImpl } from "../../interface-adapters/gateways/api/AuthGateway";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginUseCase = new LoginUseCase(new AuthGatewayImpl());
    try {
      const { user, token } = await loginUseCase.execute(email, password);
      dispatch(loginSuccess({ user, token }));
      navigate("/projects");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Astra Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
