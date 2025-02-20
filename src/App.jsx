import React, {useState, useEffect} from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import RoutesList from "./pages/routes-nav/RoutesList";
import UserContext from "./auth/UserContext";
import AppApi from "./api/api";
import {jwtDecode as decode} from "jwt-decode";

import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Fintech from "./pages/Fintech";
import Customers from "./pages/ecommerce/Customers";
import Orders from "./pages/ecommerce/Orders";
import Invoices from "./pages/ecommerce/Invoices";
import Shop from "./pages/ecommerce/Shop";
import Shop2 from "./pages/ecommerce/Shop2";
import Product from "./pages/ecommerce/Product";
import Cart from "./pages/ecommerce/Cart";
import Cart2 from "./pages/ecommerce/Cart2";
import Cart3 from "./pages/ecommerce/Cart3";
import Pay from "./pages/ecommerce/Pay";
import Campaigns from "./pages/Campaigns";
import UsersTabs from "./pages/community/UsersTabs";
import UsersTiles from "./pages/community/UsersTiles";
import Profile from "./pages/community/Profile";
import Feed from "./pages/community/Feed";
import Forum from "./pages/community/Forum";
import ForumPost from "./pages/community/ForumPost";
import Meetups from "./pages/community/Meetups";
import MeetupsPost from "./pages/community/MeetupsPost";
import CreditCards from "./pages/finance/CreditCards";
import Transactions from "./pages/finance/Transactions";
import TransactionDetails from "./pages/finance/TransactionDetails";
import JobListing from "./pages/job/JobListing";
import JobPost from "./pages/job/JobPost";
import CompanyProfile from "./pages/job/CompanyProfile";
import Messages from "./pages/Messages";
import TasksKanban from "./pages/tasks/TasksKanban";
import TasksList from "./pages/tasks/TasksList";
import Inbox from "./pages/Inbox";
import Calendar from "./pages/Calendar";
import Account from "./pages/settings/Account";
import Notifications from "./pages/settings/Notifications";
import Apps from "./pages/settings/Apps";
import Plans from "./pages/settings/Plans";
import Billing from "./pages/settings/Billing";
import Feedback from "./pages/settings/Feedback";
import Changelog from "./pages/utility/Changelog";
import Roadmap from "./pages/utility/Roadmap";
import Faqs from "./pages/utility/Faqs";
import EmptyState from "./pages/utility/EmptyState";
import PageNotFound from "./pages/utility/PageNotFound";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/ResetPassword";
import Onboarding01 from "./pages/Onboarding01";
import Onboarding02 from "./pages/Onboarding02";
import Onboarding03 from "./pages/Onboarding03";
import Onboarding04 from "./pages/Onboarding04";
import ButtonPage from "./pages/component/ButtonPage";
import FormPage from "./pages/component/FormPage";
import DropdownPage from "./pages/component/DropdownPage";
import AlertPage from "./pages/component/AlertPage";
import ModalPage from "./pages/component/ModalPage";
import PaginationPage from "./pages/component/PaginationPage";
import TabsPage from "./pages/component/TabsPage";
import BreadcrumbPage from "./pages/component/BreadcrumbPage";
import BadgePage from "./pages/component/BadgePage";
import AvatarPage from "./pages/component/AvatarPage";
import TooltipPage from "./pages/component/TooltipPage";
import AccordionPage from "./pages/component/AccordionPage";
import IconsPage from "./pages/component/IconsPage";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "app-token";

/** POS application.
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app,
 *   isLoading: has user data been pulled from API?
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 *
 * App -> Routes
 */
function App() {
  const [currentUser, setCurrentUser] = useState({
    data: null,
    isLoading: true,
  });

  // Key name for storing token in localStorage for "remember me" re-login
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  const location = useLocation();

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let {email} = decode(token);
          // put the token on the Api class so it can use it to call the API.
          AppApi.token = token;

          let currentUser = await AppApi.getCurrentUser(email);

          // Debug check
          console.log("Retrieved user:", currentUser);

          if (!currentUser || !currentUser.id) {
            console.error("Current user or user ID is undefined");
            setCurrentUser({
              isLoading: false,
              data: null,
            });
            return;
          }

          let userDatabases = await AppApi.getUserDatabases(currentUser.id);

          setCurrentUser({
            isLoading: false,
            data: {...currentUser, databases: userDatabases},
          });
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser({
            isLoading: false,
            data: null,
          });
        }
      } else {
        setCurrentUser({
          isLoading: false,
          data: null,
        });
      }
    }
    getCurrentUser();
  }, [token]);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({top: 0});
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  /** Handles site-wide login.
   *
   * Logs in a user
   *
   * Make sure you await this function to see if any error happens.
   */
  async function login(loginData) {
    let token = await AppApi.login(loginData);
    setToken(token);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function signup(signupData) {
    let token = await AppApi.signup(signupData);
    setToken(token);
  }

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser({
      isLoading: true,
      data: null,
    });
    setToken(null);
  }

  console.log("currentUser", currentUser);

  if (currentUser.isLoading) return <div>Loading...</div>;

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser.data,
        setCurrentUser,
        login,
        signup,
        logout,
      }}
    >
      <RoutesList
        currentUser={currentUser.data}
        login={login}
        signup={signup}
        logout={logout}
      />
    </UserContext.Provider>
  );
}

export default App;
