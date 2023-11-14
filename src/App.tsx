import { useEffect, useState } from "react";
import DirectoryPicker from "./components/File/DirectoryPicker";
import { FileList } from "./components/File/FileList";
import { FileEditor } from "./components/File/FileEditor";
import LLM from "./components/LLM/LLM";

function App() {
  const [directory, setDirectory] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    const initialDirectory = window.electronStore.getUserDirectory();

    if (initialDirectory) {
      setDirectory(initialDirectory);
    }
  }, []);

  const handleDirectorySelected = (path: string) => {
    setDirectory(path);
    // so here we need to trigger some kind of setup vector db on directory:
  };

  useEffect(() => {
    console.log("selected file: ", selectedFile);
  }, [selectedFile]);

  return (
    <div className="min-h-screen min-w-full mt-0">
      {/* <FileViewer directory="/Users/sam/Desktop/electron-forge-react-typescript-tailwind" /> */}
      {directory ? (
        <div className="flex">
          <div className="w-[300px]">
            {" "}
            {/* Replace 300px with the desired fixed width */}
            <FileList onFileSelect={(path) => setSelectedFile(path)} />
          </div>
          {selectedFile && (
            <div className="flex-grow">
              <FileEditor filePath={selectedFile} />
            </div>
          )}
        </div>
      ) : (
        <DirectoryPicker onDirectorySelected={handleDirectorySelected} />
      )}
      {/* <LLM /> */}
    </div>
  );
}
export default App;
