import { useAuth } from "@/hooks/useAuth";
import { useSettingModal } from "@/store/global";
import { LogIn, LogOut, Send, Settings } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDropdown = ({ isOpen, onClose }: ProfileDropdownProps) => {
  const [activeItem, setActiveItem] = useState<string>("profile");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toggleSettingModal } = useSettingModal();

  const { logout, login, user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="flex flex-col gap-2 p-[6px] bg-gray-200 dark:bg-gray-800 rounded-xl absolute bottom-[70px] left-3 w-52 
      animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div
        className={`py-3 px-6  rounded-xl cursor-pointer ${
          activeItem === "profile" ? "bg-gray-100 dark:bg-gray-900" : ""
        }`}
        onMouseEnter={() => setActiveItem("profile")}
        onClick={toggleSettingModal}
      >
        {user?.name || "My Profile"}
      </div>
      <div className="flex flex-col gap-2">
        <ProfileDropdownItem
          icon={<Settings className="w-5 h-5" />}
          text="Settings"
          onClick={toggleSettingModal}
          isActive={activeItem === "settings"}
          onMouseEnter={() => setActiveItem("settings")}
        />

        <ProfileDropdownItem
          icon={<Send className="w-5 h-5" />}
          text="Contact us"
          onClick={() => {}}
          isActive={activeItem === "contact"}
          onMouseEnter={() => setActiveItem("contact")}
        />

        {user ? (
          <ProfileDropdownItem
            icon={<LogOut className="w-5 h-5" />}
            text="Logout"
            onClick={logout}
            isActive={activeItem === "logout"}
            onMouseEnter={() => setActiveItem("logout")}
          />
        ) : (
          <ProfileDropdownItem
            icon={<LogIn className="w-5 h-5" />}
            text="Login"
            onClick={login}
            isActive={activeItem === "login"}
            onMouseEnter={() => setActiveItem("login")}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;

const ProfileDropdownItem = ({
  icon,
  text,
  onClick,
  isActive,
  onMouseEnter,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  isActive: boolean;
  onMouseEnter: () => void;
}) => {
  return (
    <button
      className={`w-full flex items-center gap-2 py-3 px-4  rounded-xl ${
        isActive ? "bg-gray-100 dark:bg-gray-900" : ""
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm">{text}</p>
      </div>
    </button>
  );
};
