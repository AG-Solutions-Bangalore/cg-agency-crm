import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { ContextPanel } from "../../context/ContextPanel";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { fetchPermissions } = useContext(ContextPanel);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const res = await axios.post(`${BASE_URL}/api/panel-login`, formData);

      if (res.status === 200) {
        const token = res.data.UserInfo?.token;
        if (token) {
          localStorage.setItem("id", res.data.UserInfo.user.id);
          localStorage.setItem("name", res.data.UserInfo.user.name);
          localStorage.setItem("email", res.data.UserInfo.user.email);
          localStorage.setItem("userType", res.data.UserInfo.user.id);
          localStorage.setItem("token", token);
          fetchPermissions();
          toast.success("Successfully logged in");
          navigate("/home");
        } else {
          toast.error("Login Failed, Token not received.");
        }
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-gray-50 to-blue-gray-100">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <Card className="w-full max-w-[1000px] flex-row overflow-hidden">
          {/* Left Side - Form */}
          <CardBody className="flex flex-col w-full lg:w-1/2 p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="https://creativegarments.in/agency/img/logo.webp"
                alt="Company Logo"
                className="h-12 object-contain"
              />
            </div>

            <Typography
              variant="h4"
              color="blue-gray"
              className="text-center mb-2"
            >
              Welcome Back
            </Typography>
            <Typography color="gray" className="text-center mb-8 font-normal">
              Enter your credentials to continue
            </Typography>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Username
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  
                />
              </div>

              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Password
                </Typography>
                <Input
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  icon={
                    <button
                    tabIndex={-1}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  }
                  
                />
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                 tabIndex={-1}
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                     
                    >
                      Remember me
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Link
                 tabIndex={-1}
                  to="/forget-password"
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="mt-2"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardBody>

          {/* Right Side - Image */}
          <div className="hidden lg:block w-1/2 relative">
            <img
              src="https://creativegarments.in/agency/img/login_side.jpg"
              alt="Login"
              className="h-full w-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-500/10"></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
