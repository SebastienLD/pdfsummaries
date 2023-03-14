import { type NextPage } from "next";
import { useState } from "react";
import { SiteFooter } from "~/components/site-footer";
import PDFUPloader from "~/components/pdfuploader";
import SummaryBox from "~/components/summary-box";

const Home: NextPage = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  return (
    <div className="flex min-h-screen flex-col p-10">
      <div className="mb-10 flex justify-center">
        <h1 className="text-4xl font-semibold">PDF SUMMARIZER</h1>
      </div>
      <div className="flex-1">
        <PDFUPloader
          setSummary={setSummary}
          setIsFileUploaded={setIsFileUploaded}
          setLoading={setLoading}
        />
        {isFileUploaded && <SummaryBox summary={summary} loading={loading} />}
      </div>
      <SiteFooter />
    </div>
  );
};

export default Home;
