let accessToken: string | null = null;

export const tokenService = {
  getToken: () => accessToken,
  setToken: (token: string | null) => {
    accessToken = token;
  },
  clearToken: () => {
    accessToken = null;
  },

  //for admin
  // Admin-specific
  getAdminToken: () => localStorage.getItem("adminToken"),
  setAdminToken: (token: string) => localStorage.setItem("adminToken", token),
  clearAdminToken: () => localStorage.removeItem("adminToken"),
};
