import { useCSVReader } from 'react-papaparse';
import { CSSProperties } from 'react';
import { saveAs } from 'file-saver';


const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "right",
    width: "100%",
    marginBottom: 15,
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'Arial, sans-serif',
  } as CSSProperties,
  browseFile: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: '45px',
    lineHeight: '45px',
    width: '10%',
    color: '#333',
    fontSize: '14px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  } as CSSProperties,
  remove: {
    padding: '10px 15px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  } as CSSProperties,
  progressBarBackgroundColor: {
    height: '8px',
    backgroundColor: '#4CAF50',
    borderRadius: '5px',
    marginTop: '10px',
  } as CSSProperties,
};

const CsvToJsonConverter = () => {
  const { CSVReader } = useCSVReader();

  return (

    <CSVReader
      onUploadAccepted={(results: any) => {

        const dataArray = results.data;
        const headers = dataArray[0];

        const jsonData = dataArray.slice(1).map(row => {
          const rowObject: any = {};
          headers.forEach((header: string, index: number) => {
            const value = row[index];
            if (value !== undefined && value !== null && value !== "") {
              rowObject[header] = value;
            }
          });
          return rowObject;
        });
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

        saveAs(blob, 'data.json');
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
            <button type='button' {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader >

  );
};

export default CsvToJsonConverter;
