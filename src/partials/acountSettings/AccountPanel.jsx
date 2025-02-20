import React, {useState} from "react";

import Image from "../../images/user-avatar-80.png";
import {useTranslation} from "react-i18next";

function AccountPanel() {
  const [sync, setSync] = useState(false);

  const {t, i18n} = useTranslation();

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
          {t("myAccount")}
        </h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              <img
                className="w-20 h-20 rounded-full"
                src={Image}
                width="80"
                height="80"
                alt="User upload"
              />
            </div>
            <button className="btn-sm dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300">
              Change
            </button>
          </div>
        </section>
        {/* Business Profile */}
        <section>
          <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
            {t("profile")}
          </h2>
          <div className="text-sm">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit.
          </div>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className="sm:w-1/3">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                {t("name")}
              </label>
              <input id="name" className="form-input w-full" type="text" />
            </div>
          </div>
        </section>
        {/* Password */}
        <section>
          <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-1">
            Password
          </h2>
          <div className="text-sm">
            You can set a permanent password if you don't want to use temporary
            login codes.
          </div>
          <div className="mt-5">
            <button className="btn border-gray-200 dark:border-gray-700/60 shadow-xs text-violet-500">
              Set New Password
            </button>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-gray-200 dark:border-gray-700/60">
          <div className="flex self-end">
            <button className="btn dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300">
              Cancel
            </button>
            <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3">
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AccountPanel;
