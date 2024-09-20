import React, { useState } from "react";

export const ZaloAuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateAuth = async () => {
    setIsLoading(true);
    setError(null); // Reset error state

    const appId = "4383217975172036996";
    const redirectUri = "http://localhost:3001/api/v1/authzalo/oauth-callback"; // Updated callback URL
    const state = "random_state"; // Optional

    try {
      // Fetch code_challenge from your backend
      const response = await fetch("http://localhost:3001/api/v1/authzalo/get-code-challenge");
      
      if (!response.ok) {
        throw new Error("Failed to fetch code challenge");
      }

      const { code_challenge } = await response.json();

      const authUrl = `https://oauth.zaloapp.com/v4/oa/permission?app_id=${appId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&state=${state}&code_challenge=${code_challenge}&code_challenge_method=S256`;

      window.location.href = authUrl;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1>OAuth Zalo</h1>
      <button onClick={initiateAuth} disabled={isLoading}>
        {isLoading ? 'Đang cấp quyền...' : 'Cấp quyền Zalo'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
