import { Moon, Sun, Plus } from "lucide-react";
import { useTheme } from './ThemeProvider'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ModeToggle Component to handle theme switching
export function ModeToggle() {
  const { theme, setTheme } = useTheme(); // Destructure theme to conditionally render the icons

  return (
    <div>
      {/* Conditional rendering based on the current theme */}
      {theme === "dark" ? (
        <Sun onClick={() => setTheme("light")} />
      ) : (
        <Moon onClick={() => setTheme("dark")} />
      )}
    </div>
  );
}

const Navbar = () => {
  return (
    <div className="py-6 px-12 bg-brand-600 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold">Products</h2>
      </div>
      <div className="flex justify-end gap-3 items-center">
        <Link to="/create">
          <Button variant="link" className="flex items-center gap-2">
            <div className="rounded-2xl bg-slate-500 py-3 px-4"><Plus/>
            </div>
          </Button>
        </Link>
        {/* Add the ModeToggle component */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
