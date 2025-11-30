// auth.js
export const getCurrentUser = () => {
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : null;
};

export const hasRole = (roleId) => {
  const user = getCurrentUser();
  return user && user.role_id === roleId;
};
