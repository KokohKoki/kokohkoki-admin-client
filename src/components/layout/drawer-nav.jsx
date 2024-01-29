import { LogOut } from "lucide-react";
import { Settings, Menu } from "lucide-react";
import { useAuth } from "../../context/use-context";

export default function SideDrawer() {
  const { userPayload } = useAuth();
  const username = userPayload?.username;
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="flex transition duration-200 hover:text-rose-800">
          <Menu size={30} />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-white text-gray-700">
          <span className="font-bold tracking-wider text-lg">Menu</span>
          <span>{username}</span>
          <div className="w-full h-[2px] bg-gray-300 opacity-30 my-2" />
          <li>
            <a>Manage Fish</a>
          </li>
          <li>
            <a>Manage Discount</a>
          </li>
          <li>
            <a>Manage Schedule</a>
          </li>
          <div className="w-full h-[2px] bg-gray-300 opacity-30 mt-5" />
          <li>
            <a>
              <Settings size={18} />
              Settings
            </a>
          </li>
          <li>
            <a>
              <LogOut size={18} />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
