import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../base/BaseUrl";
import axios from "axios";

export const ContextPanel = createContext();

const AppProvider = ({ children }) => {
  const userTypeId = localStorage.getItem("id");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [year, setYear] = useState([]);
  useEffect(() => {
    const fetchYear = async () => {
      try {
        setIsButtonDisabled(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-year`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setYear(response.data?.year);
      } catch (error) {
        console.error("Error fetching  year  data", error);
      } finally {
        setIsButtonDisabled(false);
      }
    };

    fetchYear();
  }, []);
  const currentYear = useMemo(
    () => year?.current_year || "N/A",
    [year]
  );
  const fetchPagePermission = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-usercontrol-new`, {
        headers: { Authorization: `Bearer ${token}` },
      });
     
      // array in local storage
      localStorage.setItem("pageControl", JSON.stringify(response.data?.usercontrol));

      
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPermissions = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/panel-fetch-usercontrol`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Store the entire `usercontrol` array in localStorage
      localStorage.setItem("userControl", JSON.stringify(response.data?.usercontrol));

      
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(token){
      fetchPermissions();
    }
  
}, []);


  return (
    <ContextPanel.Provider value={{ userTypeId, currentYear,fetchPermissions ,fetchPagePermission}}>
      {children}
    </ContextPanel.Provider>
  );
};

export default AppProvider;
