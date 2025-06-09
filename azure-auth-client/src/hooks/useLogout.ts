
import { loginRequest } from "@/auth/msalConfig";
import { useMsal } from "@azure/msal-react";
import { useAuthStore } from "@store/auth-store";

export function useLogout() {
  const { instance } = useMsal();
  const logoutStore = useAuthStore((state) => state.logout);

  return () => {    
    logoutStore();

    const accounts = instance.getAllAccounts();
    if (accounts.length > 0) {

      const allAccounts = instance.getAllAccounts();

      allAccounts.forEach(async (account) => {
        await instance.logout({account: account, ...loginRequest })
      })

      
      window.location.href = "/"
    // instance.logoutRedirect({
    //     account: accounts[0],
    //     postLogoutRedirectUri: "/", 
    //   });
    } else {
      window.location.href = "/"
    }
  };
}
