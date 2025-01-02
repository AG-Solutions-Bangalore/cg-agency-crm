// this is the perfect code that run peretcly adn sync perfetcly with button conrtrol 
import React, { useState, useEffect, useContext } from "react";



import BASE_URL from "../../base/BaseUrl";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContextPanel } from "../../context/ContextPanel";
import Layout from "../../layout/Layout";
const UserManagement = () => {
  const [permissions, setPermissions] = useState({});
  const [pageSelections, setPageSelections] = useState({});
  const [columnSelections, setColumnSelections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usercontrol, setUsercontrol] = useState(null);
  const { fetchPermissions } = useContext(ContextPanel);
  const navigate = useNavigate();

  const userTypes = [
    { id: "1", label: "Test User" },
    { id: "2", label: "Admin" },
    { id: "3", label: "Super Admin" },
  ];

  const fetchUserControl = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/panel-fetch-usercontrol`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsercontrol(response.data.usercontrol);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      toast.error("Failed to fetch user controls");
    }
  };

  useEffect(() => {
    fetchUserControl();
  }, []);

  const pageOptions = usercontrol
    ? [...new Set(usercontrol.map((item) => item.pages))]
    : [];

  const updatePermissions = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...updatedData,
        usertype: updatedData.usertype.join(","),
      };

      await axios.put(
        `https://agsrebuild.store/public/api/panel-update-usercontrol/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User control updated successfully");
      fetchPermissions();
      fetchUserControl();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user control"
      );
    }
  };

  useEffect(() => {
    if (!usercontrol) return;
    const newPermissions = {};
    const newPageSelections = {};
    const newColumnSelections = {};

    pageOptions.forEach((page) => {
      newPageSelections[page] = false;
      newColumnSelections[page] = {};

      userTypes.forEach((user) => {
        newColumnSelections[page][user.id] = false;
      });

      const pageButtons = usercontrol
        .filter((item) => item.pages === page)
        .map((item) => item.button);

      pageButtons.forEach((button) => {
        const buttonControl = usercontrol.find(
          (item) => item.button === button
        );
        newPermissions[button] = {
          id: buttonControl.id,
          permissions: {},
        };
        userTypes.forEach((user) => {
          const userTypeArray = buttonControl?.usertype ? buttonControl.usertype.split(",") : [];
          newPermissions[button].permissions[user.id] = userTypeArray.includes(user.id) || false;
        });
      });
    });

    setPermissions(newPermissions);
    setPageSelections(newPageSelections);
    setColumnSelections(newColumnSelections);
  }, [usercontrol]);

  const handlePermissionChange = async (buttonId, userId, page) => {
    if (columnSelections[page]?.[userId]) return;

    const buttonData = permissions[buttonId];
    const newPermissions = {
      ...buttonData.permissions,
      [userId]: !buttonData.permissions[userId],
    };

    const updatedUserTypes = Object.entries(newPermissions)
      .filter(([_, hasPermission]) => hasPermission)
      .map(([id]) => id);

    const updatedData = {
      pages: page,
      button: buttonId,
      usertype: updatedUserTypes,
      status: "Active",
    };

    try {
      await updatePermissions(buttonData.id, updatedData);
      setPermissions((prev) => ({
        ...prev,
        [buttonId]: {
          ...prev[buttonId],
          permissions: newPermissions,
        },
      }));
    } catch (error) {
      console.error("Failed to update permission:", error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex bg-white items-center justify-center h-64">
          <Spinner className="h-8 w-8" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Typography color="red" className="text-lg">
            Error loading user controls
          </Typography>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h4" color="blue-gray">
            User Control List
          </Typography>

            <Button
            onClick={() => navigate(`/create-createMTest`)}
            className="flex items-center gap-2"
            color="blue"
          >
            Create Roles
          </Button>
        </div>

        {pageOptions.map((page) => {
          const pageButtons = usercontrol
            .filter((item) => item.pages === page)
            .map((item) => ({
              value: item.button,
              label: item.button,
            }));

          return (
            <Card key={page} className="mb-8">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none px-4 py-3"
              >
                <Typography variant="h5" color="blue-gray">
                  {page}
                </Typography>
              </CardHeader>

              <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold leading-none"
                        >
                          Button Name
                        </Typography>
                      </th>
                      {userTypes.map((user) => (
                        <th
                          key={user.id}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold leading-none"
                          >
                            {user.label}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageButtons.map((button) => (
                      <tr key={button.value}>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography variant="small" color="blue-gray">
                            {button.label}
                          </Typography>
                        </td>
                        {userTypes.map((user) => (
                          <td
                            key={user.id}
                            className="p-4 border-b border-blue-gray-50"
                          >
                            <Checkbox
                              checked={
                                permissions[button.value]?.permissions[
                                  user.id
                                ] ?? false
                              }
                              onChange={() =>
                                handlePermissionChange(
                                  button.value,
                                  user.id,
                                  page
                                )
                              }
                              color="blue"
                              disabled={columnSelections[page]?.[user.id]}
                              className={
                                columnSelections[page]?.[user.id]
                                  ? "opacity-50"
                                  : ""
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}
      </div>
    </Layout>
  );
};

export default UserManagement;
