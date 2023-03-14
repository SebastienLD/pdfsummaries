import { Card } from "../ui/card";
const UploaderBox: React.FC = () => {
  return (
    <Card animateOnHover>
      <div className="flex-col justify-center p-8 md:p-20">
        <div className="flex justify-center text-xl">Drag PDF Here</div>
        <div className="text-l flex justify-center">Or Click to Select </div>
      </div>
    </Card>
  );
};

export default UploaderBox;
