import { useEffect, useState } from "react";
import { RagnoteDBEntry } from "electron/main/database/Table";
interface SimilarEntriesComponentProps {
  filePath: string;
  onFileSelect: (path: string) => void;
}

const SimilarEntriesComponent: React.FC<SimilarEntriesComponentProps> = ({
  filePath,
  onFileSelect,
}) => {
  const [similarEntries, setSimilarEntries] = useState<RagnoteDBEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNewFileOpen = async (path: string) => {
    setLoading(true);
    try {
      const searchResults = await performSearch(path);
      setSimilarEntries(searchResults);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (path: string): Promise<RagnoteDBEntry[]> => {
    const fileContent: string = await window.files.readFile(path);
    if (!fileContent) {
      console.error("File content is empty");
      return [];
    }
    const searchResults: RagnoteDBEntry[] = await window.database.search(
      fileContent,
      20
    );
    // filter out the current file:
    const filteredSearchResults = searchResults.filter(
      (result) => result.notepath !== path
    );
    return filteredSearchResults;
  };

  useEffect(() => {
    if (filePath) {
      handleNewFileOpen(filePath);
    }
  }, [filePath]);

  useEffect(() => {
    const listener = async () => {
      console.log("received vector-database-update event");
      const searchResults = await performSearch(filePath);
      setSimilarEntries(searchResults);
    };

    window.ipcRenderer.receive("vector-database-update", listener);
    return () => {
      window.ipcRenderer.removeListener("vector-database-update", listener);
    };
  }, [filePath]);

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden space-y-4">
      {similarEntries.map((entry, index) => (
        <div
          key={index}
          className="pr-2 pb-1 bg-white shadow-md rounded-lg cursor-pointer hover:scale-104 hover:shadow-lg transition-transform duration-300"
          onClick={() => onFileSelect(entry.notepath)}
        >
          <p className="text-gray-700">
            <span className="text-gray-500">{entry.content}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default SimilarEntriesComponent;
