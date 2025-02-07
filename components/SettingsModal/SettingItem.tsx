import { Separator } from "../ui/separator";

const SettingItem = ({
  text,
  button,
}: {
  text: string;
  button: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <p>{text}</p>
        {button}
      </div>
      <Separator />
    </div>
  );
};

export default SettingItem;
