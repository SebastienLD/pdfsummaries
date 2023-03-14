import { type Dispatch, type SetStateAction } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import { Card } from "../ui/card";
import UploaderBox from "./uploader-box";

const FLASK_API_BASE = "https://pdfsummarizer-backend.herokuapp.com";

const fileTypes = ["PDF"];

interface Response {
  summary: string;
}

interface ComponentProps {
  setSummary: Dispatch<SetStateAction<string>>;
  setIsFileUploaded: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const PDFUPloader = (props: ComponentProps) => {
  const { setSummary, setIsFileUploaded, setLoading } = props;

  const axiosUploadHandler = (formData: FormData) => {
    const options = {
      method: "POST",
      url: `${FLASK_API_BASE}/get_text`,
      data: formData,
    };
    axios
      .request(options)
      .then(({ data }: { data: Response }) => {
        setSummary(data.summary);
        setLoading(false);
      })
      .catch((error: Error) => {
        setIsFileUploaded(false);
        setLoading(false);
        alert("Sorry, something went wrong!");
        console.log(error);
      });
  };

  const handleUploadFile = (file: File) => {
    const formData = new FormData();
    if (file) {
      setIsFileUploaded(true);
      setLoading(true);
      formData.append("file", file, file.name);
      console.log("The selected file is ", file);
      axiosUploadHandler(formData);
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
