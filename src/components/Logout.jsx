import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ open, handleOpen }) => {
  
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
       <Dialog 
         open={open} 
         handler={handleOpen}
         size="xs"
         animate={{
           mount: { scale: 1, y: 0 },
           unmount: { scale: 0.9, y: -100 },
         }}
         className="bg-white shadow-none rounded-xl"
       >
         <DialogHeader className="flex flex-col gap-1">
           <Typography variant="h4" color="blue-gray">
             Confirm Logout
           </Typography>
           <div className="h-0.5 w-full bg-blue-gray-50"></div>
         </DialogHeader>
         
         <DialogBody className="pt-4">
           <div className="flex items-center gap-3">
             <div className="rounded-full bg-blue-gray-50/50 p-3">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 strokeWidth={1.5}
                 stroke="currentColor"
                 className="w-6 h-6 text-blue-gray-600"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                 />
               </svg>
             </div>
             <Typography color="gray" className="font-normal">
               Are you sure you want to log out? You'll need to sign in again to access your account.
             </Typography>
           </div>
         </DialogBody>
         
         <DialogFooter className="flex justify-end gap-2 pt-2 pb-4">
           <Button
             variant="default"
             color="gray"
             onClick={handleOpen}
             className="flex items-center gap-2 normal-case"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="w-4 h-4"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M6 18L18 6M6 6l12 12"
               />
             </svg>
             Cancel
           </Button>
           <Button
             variant="gradient"
             color="red"
             onClick={handleLogout}
             className="flex items-center gap-2 normal-case"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="w-4 h-4"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
               />
             </svg>
             Logout
           </Button>
         </DialogFooter>
       </Dialog>
  );
};

export default Logout;
