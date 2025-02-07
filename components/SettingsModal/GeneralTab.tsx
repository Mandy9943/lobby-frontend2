import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import SettingItem from "./SettingItem";

const GeneralTab = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="w-full flex flex-col gap-4">
      <SettingItem
        text="Language"
        button={
          <Select defaultValue="English">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <SettingItem
        text="Theme"
        button={
          <Select
            defaultValue={theme}
            onValueChange={(value) => setTheme(value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
};

export default GeneralTab;
