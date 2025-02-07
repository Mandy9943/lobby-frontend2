import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "@/hooks/useAuth";
import { navRoutes } from "@/utils/routes";
import { ChevronDown, PanelRightClose } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ProfileDropdown = dynamic(() => import("./ProfileDropdown"));

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div
      className={` bg-gray-100 dark:bg-gray-900 h-screen fixed top-1 left-0 py-4 flex flex-col ${
        isOpen ? "w-[260px]" : "w-[68px]"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {isOpen ? (
          <h1 className="w-[142px]">
            <Image
              src="/statics/images/text-logo.png"
              alt="Lobbyai"
              width={774}
              height={322}
            />
          </h1>
        ) : (
          <h1 onClick={onToggle} className="cursor-pointer">
            <Image
              src="/statics/images/logo.png"
              alt="Lobbyai"
              width={774}
              height={322}
            />
          </h1>
        )}

        {isOpen ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={onToggle}
                  className="py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl"
                >
                  <PanelRightClose
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close Sidebar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>

      {!isOpen ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={onToggle}
                className="mx-auto aspect-square w-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl"
              >
                <PanelRightClose
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open Sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}

      <div className={`pt-10 flex-1 ${isOpen ? "p-3" : "p-2"}`}>
        <nav>
          <ul className={` ${isOpen ? "space-y-4" : "space-y-2"}`}>
            {navRoutes.map((route) => {
              if (route.subRoutes) {
                return (
                  <li
                    key={route.href}
                    className={`w-full flex ${
                      isOpen ? "justify-start" : "justify-center"
                    }`}
                  >
                    <Collapsible
                      key={route.name}
                      className="w-full flex flex-col items-center"
                    >
                      <CollapsibleTrigger
                        className={`flex items-center text-left text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200  hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl ${
                          isOpen
                            ? "justify-between w-full py-2 px-3"
                            : "justify-center aspect-square w-10 px-0 py-0"
                        }`}
                      >
                        <span className="flex items-center gap-2 ">
                          {route.icon && <route.icon className="h-5 w-5" />}
                          {isOpen ? route.name : null}
                        </span>
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : null}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-7 mt-2 space-y-2">
                        {route.subRoutes.map((subRoute) => (
                          <Link
                            key={subRoute.href}
                            href={subRoute.href!}
                            className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                          >
                            {subRoute.name}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                );
              }
              if (!route.href) {
                return null;
              }
              return (
                <li
                  key={route.href}
                  className={` flex  ${
                    isOpen
                      ? "justify-start w-full"
                      : "justify-center aspect-square w-10 mx-auto"
                  }`}
                >
                  <Link
                    href={route.href}
                    className={`flex w-full items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl ${
                      isOpen
                        ? "justify-start"
                        : "justify-center aspect-square w-10"
                    }`}
                  >
                    {route.icon && <route.icon className="h-5 w-5" />}
                    {isOpen ? route.name : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className={`pt-10 relative ${isOpen ? "p-3" : "p-2"}`}>
        <button
          className={`flex items-center gap-3 w-full py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl ${
            isOpen ? "justify-start" : "justify-center py-0 px-0 aspect-square"
          }`}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={user?.image || "/statics/images/user-default.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {isOpen ? <p className="text-gray-400">My Profile</p> : null}
        </button>

        {isProfileOpen ? (
          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        ) : null}
      </div>
    </div>
  );
}
