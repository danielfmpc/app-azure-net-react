import { Router } from './routers/Router';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from '@store/auth-store';
import { useEffect } from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from './auth/msalConfig';

function App() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const { validateToken, isHydrated } = useAuthStore();
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!isAuthenticated) return;

      try {
        const tokenResponse = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });

        localStorage.setItem("auth_token", tokenResponse.accessToken);

        if (isHydrated)
          await validateToken();

      } catch (error) {
        console.error("Erro ao autenticar:", error);
      }
    };

    handleAuthentication();
  }, [isAuthenticated, instance, accounts, validateToken, isHydrated]);

  if (!isHydrated) return <div>Preparando o app...</div>;
  if (isLoading) return <div>Carregando...</div>;

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App
