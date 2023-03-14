import { type Dispatch, type SetStateAction, useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import { Card } from "../ui/card";
import UploaderBox from "./uploader-box";

// const FLASK_API_BASE = "https://pdfsummarizer-backend.herokuapp.com";
const FLASK_API_BASE = "http://127.0.0.1:5000";

const fileTypes = ["PDF"];

interface GetTextChunksResponse {
  data: {
    chunks: Array<string>;
  };
}

interface SummaryResponse {
  data: {
    summary: string;
  };
}

interface ComponentProps {
  setSummary: Dispatch<SetStateAction<string>>;
  setIsFileUploaded: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const PDFUPloader = (props: ComponentProps) => {
  const { setSummary, setIsFileUploaded, setLoading } = props;

  const axiosUploadHandler = async (formData: FormData) => {
    let textChunks: Array<string> = [];

    const options = {
      method: "POST",
      url: `${FLASK_API_BASE}/get_text_chunks`,
      data: formData,
    };
    try {
      const responseData: GetTextChunksResponse = await axios.request(options);
      textChunks = textChunks.concat(responseData.data?.chunks);
    } catch (error) {
      setIsFileUploaded(false);
      setLoading(false);
      alert("Sorry, something went wrong!");
      console.log(error);
    }

    const summaryPromises: Array<Promise<SummaryResponse>> = [];
    textChunks.forEach((chunk) => {
      const summaryOptions = {
        method: "POST",
        url: `${FLASK_API_BASE}/get_chunk_summary`,
        data: { chunk: chunk },
      };
      try {
        const summaryResponse = axios.request(summaryOptions);
        summaryPromises.push(summaryResponse);
      } catch (error) {
        setIsFileUploaded(false);
        setLoading(false);
        alert("Sorry something went wrong when getting a summary");
        console.log(error);
      }
    });
    const allSummaryResonses = await Promise.all(summaryPromises);
    let fullSummary = "";
    allSummaryResonses.forEach((summaryResponse: SummaryResponse) => {
      fullSummary = fullSummary + summaryResponse.data.summary;
    });
    setSummary(fullSummary);
    setLoading(false);
  };

  const handleUploadFile = (file: File) => {
    const formData = new FormData();
    if (file) {
      setIsFileUploaded(true);
      setLoading(true);
      formData.append("file", file, file.name);
      console.log("The selected file is ", file);
      axiosUploadHandler(formData).catch((error: Error) => {
        console.log("Error in axios handler", error);
      });
    }
  };

  return (
    <>
      <Card className="mb-5">
        <div className="flex flex-row justify-center">
          <FileUploader
            handleChange={handleUploadFile}
            name="file"
            types={fileTypes}
          >
            <UploaderBox />
          </FileUploader>
        </div>
      </Card>
    </>
  );
};

export default PDFUPloader;
