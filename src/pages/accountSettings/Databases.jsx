import React, {useState} from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import SettingsSidebar from "../../partials/acountSettings/SettingsSidebar";
import DatabasesPanel from "../../partials/acountSettings/DatabasesPanel";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import UserContext from "../../auth/UserContext";

function Databases() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {currentUser} = useContext(UserContext);

  const {t, i18n} = useTranslation();

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Page header */}
            <div className="mb-8">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                {t("databases")}
              </h1>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 shadow-xs rounded-xl mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                {/* <SettingsSidebar /> */}
                <DatabasesPanel currentUser={currentUser} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Databases;
