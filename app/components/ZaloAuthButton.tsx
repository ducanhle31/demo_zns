import React from "react";
export const ZaloAuthButton = () => {
  const handleLogin = () => {
    window.location.href = "https://zaloapp.ongdev.online/api/v1/authzalo/login"; // Your backend URL
  };
  return (
    <div className="zalo-login">
      <button
        onClick={handleLogin}
        className="login-btn bg-blue-600 p-4 rounded-sm text-white hover:bg-blue-700"
      >
        Login with Zalo
      </button>
    </div>
  );
};
