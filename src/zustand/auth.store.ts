import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface AuthState {
  isAuthenticated: boolean;
  role: string;
  Nombre: string;
  setRole: (rol: string) => void;
  setNombre: (nombre: string) => void;
  setAuth: (authStatus: boolean) => void;
}

// Creamos el store de autenticación usando el tipo AuthState
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      Nombre: null,
      setRole: (rol: string) => set({ role: rol }),
      setNombre: (nombre: string) => set({ Nombre: nombre }),
      setAuth: (authStatus: boolean) => set({ isAuthenticated: authStatus }),
    }),
    {
      name: "auth-storage", // Nombre de la clave en localStorage
      storage: createJSONStorage(() => sessionStorage), // Utiliza localStorage para persistencia
    }
  )
);
