import api from "@/axios/api";
import { useStorageState } from "@/hooks/useStorageState";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

type ContextType = {
  user: any;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (data: {
    username: string;
    name: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  loading?: boolean;
};

const authContext = createContext<ContextType>({
  user: null,
  async signIn() {},
  async signUp() {},
  async signOut() {},
  loading: true,
});

export function useAuth() {
  return useContext(authContext);
}

export default function AuthProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    SecureStore.getItemAsync("session")
      .then((value) => {
        setUser(JSON.parse(value!));
        console.log(value);
        setLoading(false);
      })
      .catch(() => {
        console.log("tidak dapat key");
        setLoading(false);
      });
  }, []);

  const signUp = useCallback(
    async ({
      username,
      name,
      password,
    }: {
      username: string;
      name: string;
      password: string;
    }) => {
      const { data } = await api.post("/users", {
        username,
        name,
        password,
      });
      await signIn(data.data.username, password);
    },
    []
  );

  const signIn = useCallback(async (username: string, password: string) => {
    const { data } = await api.post("/users/login", { username, password });
    await SecureStore.setItemAsync("session", JSON.stringify(data.data));
    setUser(data.data);
  }, []);

  const signOut = useCallback(async () => {
    console.log(user?.token);
    await api.delete("/users/logout", {
      headers: {
        Authorization: user?.token,
      },
    });
    await SecureStore.deleteItemAsync("session");
    setUser(null);
  }, [user]);

  const contextValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      signOut,
      loading,
    }),
    [user, signIn, signUp, signOut, loading]
  );

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
}
