import { useAuth } from "@/hooks/useAuth";
import { routesNames } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import SettingItem from "./SettingItem";

const ProfileTab = () => {
  const { user } = useAuth();
  return (
    <div className="w-full flex flex-col gap-4">
      <SettingItem
        text="Name"
        button={
          <div className="flex items-center gap-1">
            {user?.name}
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
          </div>
        }
      />

      <SettingItem
        text="Email address"
        button={<div className="flex items-center gap-1">{user?.email}</div>}
      />

      <SettingItem
        text="Phone number"
        button={<div className="flex items-center gap-1">+1234567890</div>}
      />

      <SettingItem
        text="Terms of Use"
        button={
          <Link href={routesNames.termsOfUse} target="_blank">
            <Button variant="ghost">View</Button>
          </Link>
        }
      />

      <SettingItem
        text="Privacy Policy"
        button={
          <Link href={routesNames.privacyPolicy} target="_blank">
            <Button variant="ghost">View</Button>
          </Link>
        }
      />

      <SettingItem
        text="Delete account"
        button={<Button variant="destructive">Delete</Button>}
      />
    </div>
  );
};

export default ProfileTab;
