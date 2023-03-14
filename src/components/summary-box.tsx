import { Card } from "../ui/card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ComponentProps {
  loading: boolean;
  summary: string;
}

const SummaryBox = (props: ComponentProps) => {
  const { loading, summary } = props;
  return (
    <Card>
      <div className="mb-5 flex justify-center text-xl">
        {loading ? (
          <p>Generating summary. This may take a while.</p>
        ) : (
          <p>Summary</p>
        )}
      </div>
      {loading ? (
        <div>
          <Skeleton count={3} />
        </div>
      ) : (
        <div className="text-l flex justify-center">{summary}</div>
      )}
    </Card>
  );
};

export default SummaryBox;
