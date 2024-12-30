import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../base/BaseUrl";
import axios from "axios";

export const ContextPanel = createContext();

const AppProvider = ({ children }) => {
  const userTypeId = localStorage.getItem("id");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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

  return (
    <ContextPanel.Provider value={{ userTypeId, currentYear }}>
      {children}
    </ContextPanel.Provider>
  );
};

export default AppProvider;
