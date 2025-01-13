import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSessionTimeout = () => {
  const router = useRouter();

  useEffect(() => {
    const checkInactivity = () => {
      const lastActivity = sessionStorage.getItem("lastActivity");
      const now = Date.now();

      // Verifica si el tiempo de inactividad es mayor a 15 minutos
      if (lastActivity && now - parseInt(lastActivity, 10) > 15 * 60 * 1000) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("lastActivity");
        router.push("/inicio-sesion"); // Redirige al login
      }
    };

    const updateActivity = () => {
      sessionStorage.setItem("lastActivity", Date.now().toString());
    };

    // Verifica la inactividad cada minuto
    const interval = setInterval(checkInactivity, 60 * 1000);

    // Escucha eventos de actividad del usuario
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keypress", updateActivity);

    // Inicializa la actividad al cargar la página
    updateActivity();

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keypress", updateActivity);
    };
  }, [router]);
};
