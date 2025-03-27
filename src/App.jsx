import React, {useState, useEffect} from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import RoutesList from "./pages/routes-nav/RoutesList";
import UserContext from "./auth/UserContext";
import AppApi from "./api/api";
import {jwtDecode as decode} from "jwt-decode";

import "./css/style.css";

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
  const [currentDb, setCurrentDb] = useLocalStorage("current-db", null);
  const [databaseApps, setDatabaseApps] = useState([]);

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

  /* Get apps linked to current Database and stores them on state */
  useEffect(() => {
    async function loadApps() {
      let dbApps = await AppApi.getAppsByDb(currentDb);
      setDatabaseApps(dbApps);
    }
    loadApps();
  }, [currentDb]);

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser({
      isLoading: true,
      data: null,
    });
    setToken(null);
    setCurrentDb(null);
  }

  /* Handles site-wide database id */
  function setSelectedDb(dbId) {
    setCurrentDb(dbId);
  }

  console.log("dbApps", databaseApps);

  if (currentUser.isLoading) return <div>Loading...</div>;

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser.data,
        setCurrentUser,
        login,
        signup,
        logout,
        setSelectedDb,
        currentDb,
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
