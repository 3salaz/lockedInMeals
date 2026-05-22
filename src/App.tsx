import { useEffect } from "react";

import AppRoutes from "@/routes/AppRoutes";
import { useSiteTheme } from "@/features/theme/hooks/useSiteTheme";
import { applyThemeToDocument } from "@/features/theme/utils/applyThemeToDocument";

export default function App() {
  const { theme } = useSiteTheme();

  useEffect(() => {
    applyThemeToDocument(theme);

    localStorage.setItem(
      "site-theme",
      JSON.stringify(theme),
    );
  }, [theme]);

  return <AppRoutes />;
}