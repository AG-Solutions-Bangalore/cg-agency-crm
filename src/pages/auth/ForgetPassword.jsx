import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import BASE_URL from "../../base/BaseUrl";
import { toast } from "sonner";


const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/api/panel-send-password`,
        {
          username,
          email
        },
        { method: "POST" }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("New Password Sent to your Email");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Email not sent. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <>
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
                className="h-20 object-contain"
              />
            </div>

            <Typography variant="h4" color="blue-gray" className="text-center mb-2">
              Reset Password
            </Typography>
            <Typography color="gray" className="text-center mb-8 font-normal">
              Enter your details to receive a new password
            </Typography>

            <form onSubmit={onResetPassword} className="flex flex-col gap-6">
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Username
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  
                />
              </div>

              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Email Address
                </Typography>
                <Input
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="!border-t-blue-gray-200 focus:!border-blue-500"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  
                />
              </div>

              <Button
                type="submit"
                className="mt-2"
                fullWidth
              >
                Reset Password
              </Button>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  Back to Sign In
                </Link>
              </div>
            </form>

          </CardBody>

          {/* Right Side - Image */}
          <div className="hidden lg:block w-1/2 relative">
            <img
              src="https://creativegarments.in/agency/img/login_side.jpg"
              alt="Reset Password"
              className="h-full w-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-500/10"></div>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
};

export default ForgetPassword;
