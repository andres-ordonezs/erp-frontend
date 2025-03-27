import React, {useState, useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

import AppFormContainer from "../../partials/containers/AppFormContainer";
import AppApi from "../../api/api";

function AppContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appToEdit, setAppToEdit] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();
  const formRef = useRef();

  useEffect(() => {
    async function fetchApp() {
      if (id && id !== "new") {
        try {
          const app = await AppApi.getApp(id);
          setAppToEdit(app);
        } catch (err) {
          console.error("Error fetching app:", err);
          navigate("/admin/apps");
        }
      } else {
        setAppToEdit(null);
        // Reset form when creating new app
        if (formRef.current?.resetForm) {
          formRef.current.resetForm();
        }
      }
    }
    fetchApp();
  }, [id, navigate]);

  // Dynamic title based on edit mode and app name
  const getPageTitle = () => {
    if (appToEdit) {
      return `${appToEdit.name}`;
    }
    return "New App";
  };

  const handleBackClick = () => {
    navigate("/admin/apps");
  };

  const handleNewApp = () => {
    // Reset form before navigating
    if (formRef.current?.resetForm) {
      formRef.current.resetForm();
    }
    navigate("/admin/apps/new");
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              {/* Left: Back button and Title */}
              <div>
                {/* Only show back button if not in a modal or if specifically requested */}

                <button
                  className="btn text-gray-500 hover:text-gray-800  dark:text-gray-300 dark:hover:text-gray-600 mb-2 pl-0 focus:outline-none shadow-none"
                  onClick={handleBackClick}
                >
                  <svg
                    className="fill-current shrink-0 mr-1"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z"></path>
                  </svg>
                  <span>Back to Apps</span>
                </button>
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  {getPageTitle()}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {appToEdit
                    ? `Update the details for ${appToEdit.name}`
                    : "Create a new application record"}
                </p>
              </div>

              {/* Right side: potential additional actions */}

              <div className="mt-4 sm:mt-4 md:mt-18 mr-4">
                <button
                  className="btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300"
                  onClick={handleNewApp}
                >
                  <span>New</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <AppFormContainer
              ref={formRef}
              appData={appToEdit}
              onCancel={handleBackClick}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppContainer;
