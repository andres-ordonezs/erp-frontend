const BASE_URL = import.meta.env.REACT_APP_BASE_URL || "http://localhost:3000";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class AppApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "GET", customHeaders = {}) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      Authorization: `Bearer ${AppApi.token}`, "Content-Type": "application/json", ...customHeaders
    };

    url.search = (method === "GET") ? new URLSearchParams(data) : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET") ? JSON.stringify(data) : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();

  };

  // Individual API routes

  /* -- Users -- */

  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "POST");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  /** Save user profile page. */
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "PATCH");
    return res.user;
  }

  /* -- Databases -- */

  /** Get all databases associated with a user ID. */
  static async getUserDatabases(userId) {
    let res = await this.request(`databases/user/${userId}`);
    return res.databases;
  }

  /* -- Apps -- */

  /* Get all apps associated to a Database ID */
  static async getAppsByDb(dbId) {
    let res = await this.request(`apps`, {}, "GET", { "database-id": dbId });
    return res.apps;
  }

  /* Get all apps */
  static async getAllApps() {
    let res = await this.request(`apps/all`);
    return res.apps;
  }

  /* Get an app by ID */
  static async getApp(id) {
    let res = await this.request(`apps/${id}`);
    return res.app;
  }

}

export default AppApi;