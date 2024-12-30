import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSessionTimeout = () => {
  const router = useRouter();

  useEffect(() => {
    const checkInactivity = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      const now = Date.now();

      if (lastActivity && now - parseInt(lastActivity, 10) > 30 * 60 * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("lastActivity");
        router.push("/login");
      }
    };

    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now());
    };

    // Verifica la inactividad cada minuto
    const interval = setInterval(checkInactivity, 60 * 1000);

    // Escucha eventos de actividad del usuario
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keypress", updateActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keypress", updateActivity);
    };
  }, [router]);
};
