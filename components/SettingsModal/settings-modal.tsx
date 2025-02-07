import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettingModal } from "@/store/global";
import GeneralTab from "./GeneralTab";
import ProfileTab from "./ProfileTab";

const SettingsModal = () => {
  const { isOpen, toggleSettingModal } = useSettingModal();

  if (!isOpen) return null;
  return (
    <Dialog open={isOpen} onOpenChange={() => toggleSettingModal()}>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">
            Settings
          </DialogTitle>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full h-[44px] rounded-xl mb-4">
              <TabsTrigger
                value="general"
                className="w-full py-[6px] data-[state=active]:shadow-lg data-[state=active]:shadow-black/20 rounded-xl text-base"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="w-full py-[6px] data-[state=active]:shadow-lg data-[state=active]:shadow-black/20 rounded-xl text-base"
              >
                Profile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <GeneralTab />
            </TabsContent>
            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
