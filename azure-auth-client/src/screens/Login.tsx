import { useMsal } from '@azure/msal-react';
import { loginRequest } from '@auth/msalConfig';
import { Button } from '@components/ui/button';
import { WindowsLogo } from 'phosphor-react';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import azure from '@assets/azure.jpeg';
import logo from '@assets/logo.svg';
import { useAuthStore } from '@store/auth-store';

function Login() {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  const getToken = useCallback(async () => {
    if (accounts.length === 0) return;

    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      localStorage.setItem('auth_token', response.accessToken);
    } catch (error) {
      console.error('Erro ao adquirir token:', error);
      instance.acquireTokenRedirect(loginRequest);
    }
  }, [accounts, instance]);

  useEffect(() => {
    const handleAuth = async () => {
      if (isLoading) return;

      if (isAuthenticated) {
        await getToken();
        navigate('/home');
        console.log('Usuário autenticado e token salvo no localStorage.');
      }
    };

    handleAuth();
  }, [isAuthenticated, getToken, navigate, isLoading]);

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <div className="h-screen flex ">
      {/* Lado esquerdo */}
      <div className="w-1/3 bg-zinc-950 flex flex-col justify-center items-center p-8">
        <img
          src={logo}
          alt="Logo"
        />
        <h1 className="text-2xl font-bold text-center text-zinc-50 my-8">
          Bem-vindo ao sistema
        </h1>
        {!isAuthenticated ? (
          <Button
            className="w-full max-w-sm sm:w-auto gap-2 p-6"
            onClick={handleLogin}
          >
            <WindowsLogo />
            <span className="truncate">Entrar com Azure</span>
          </Button>
        ) : (
          <span className="text-zinc-300 mt-4">Redirecionando...</span>
        )}
      </div>

      {/* Lado direito */}
      <div className="w-2/3 bg-gray-100 flex items-center justify-center">
        <img
          src={azure}
          alt="Imagem ilustrativa"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Login
