import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleToggle = (checked: boolean) => {
    setIsDark(checked);
    document.documentElement.classList.toggle("dark", checked);
  };

  return (
    <div className="flex items-center gap-2">
      <Sun
        size={16}
        className={isDark ? "text-muted-foreground" : "text-amber-500"}
      />
      <Switch checked={isDark} onCheckedChange={handleToggle} />
      <Moon
        size={16}
        className={isDark ? "text-primary" : "text-muted-foreground"}
      />
    </div>
  );
};

export default ThemeToggle;
