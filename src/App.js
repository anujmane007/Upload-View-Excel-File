// import { useState } from "react";
// import * as XLSX from 'xlsx';

// // Function to read the Excel file and return parsed data
// const readFile = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       resolve(workbook);
//     };
//     reader.onerror = (error) => reject(error);
//     reader.readAsArrayBuffer(file);
//   });
// };

// function App() {
//   const [excelFile, setExcelFile] = useState(null);
//   const [typeError, setTypeError] = useState(null);
//   const [parsedData, setParsedData] = useState([]);
//   const [currentSheet, setCurrentSheet] = useState(null);
//   const [sheetNames, setSheetNames] = useState([]);
//   const [activeSheet, setActiveSheet] = useState(0);
//   const [inputValues, setInputValues] = useState([]);
//   const [inputColors, setInputColors] = useState([]);

//   // Handle file selection and validation
//   const handleFile = async (e) => {
//     let fileTypes = [
//       'application/vnd.ms-excel',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       'text/csv'
//     ];
//     let selectedFile = e.target.files[0];
//     if (selectedFile) {
//       if (fileTypes.includes(selectedFile.type)) {
//         setTypeError(null);
//         const workbook = await readFile(selectedFile);
//         setExcelFile(workbook);
//         const sheets = workbook.SheetNames;
//         setSheetNames(sheets);
//         const sheetData = sheets.map((name) => {
//           const ws = workbook.Sheets[name];
//           const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
//           return { [name]: dataParse };
//         });
//         setParsedData(sheetData);
//         setCurrentSheet(sheetData[0]);
//         setInputValues(Array(sheetData[0][Object.keys(sheetData[0])[0]].length - 1).fill(''));
//         setInputColors(Array(sheetData[0][Object.keys(sheetData[0])[0]].length - 1).fill(''));
//       } else {
//         setTypeError('Please select only excel file types');
//         setExcelFile(null);
//       }
//     } else {
//       console.log('Please select your file');
//     }
//   };

//   // Update input value for the given row
//   const handleInputChange = (e, index) => {
//     const newValues = [...inputValues];
//     newValues[index] = e.target.value;
//     setInputValues(newValues);
//   };

//   // Handle sheet tab click to change active sheet
//   const handleSheetClick = (e, idx) => {
//     const selectedSheet = parsedData.find(sheet => Object.keys(sheet).includes(e.target.value));
//     setCurrentSheet(selectedSheet);
//     setActiveSheet(idx);
//     setInputValues(Array(Object.values(selectedSheet)[0].length - 1).fill(''));
//     setInputColors(Array(Object.values(selectedSheet)[0].length - 1).fill(''));
//   };

//   // Validate input value on submission
//   // Validate input value on submission
//   const handleSubmit = (index, lastColumnValue) => {
//     const newColors = [...inputColors];
//     const inputValue = parseFloat(inputValues[index]);  // Convert input value to a number
//     const lastValue = parseFloat(lastColumnValue);      // Convert last column value to a number

//     if (!isNaN(inputValue) && !isNaN(lastValue)) {
//       newColors[index] = inputValue === lastValue ? 'lightgreen' : 'lightcoral';
//     } else {
//       newColors[index] = 'lightcoral';  // If any value is not a number, mark it as incorrect
//     }

//     setInputColors(newColors);
//   };


//   return (
//     <div className="wrapper">
//       <h3>Upload & View Excel Sheets</h3>

//       {/* File Upload Form */}
//       <form className="form-group custom-form">
//         <input type="file" className="form-control" onChange={handleFile} />
//         {typeError && <div className="alert alert-danger" role="alert">{typeError}</div>}
//       </form>

//       {/* Sheet Navigation and Table View */}
//       <div className="viewer">
//         {currentSheet ? (
//           <div>
//             <div>
//               {sheetNames.map((name, idx) => (
//                 <button
//                   key={idx}
//                   value={name}
//                   onClick={(e) => handleSheetClick(e, idx)}
//                   className={`btn btn-sm ${activeSheet === idx ? 'btn-primary' : 'btn-secondary'}`}
//                 >
//                   {name}
//                 </button>
//               ))}
//             </div>
//             {Object.values(currentSheet)[0] && Object.values(currentSheet)[0].length > 0 && (
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     {Object.values(currentSheet)[0][0].map((cell, idx) => (
//                       <th key={idx}>{cell}</th>
//                     ))}
//                     <th>Input</th> 
//                     <th>Submit</th> 
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.values(currentSheet)[0].slice(1).map((row, rowIndex) => (
//                     <tr key={rowIndex}>
//                       {row.map((cell, colIndex) => (
//                         <td key={colIndex}>{cell}</td>
//                       ))}
//                       <td>
//                         {row[row.length - 1] && (
//                           <input
//                             type="text"
//                             value={inputValues[rowIndex] || ''}
//                             onChange={(e) => handleInputChange(e, rowIndex)}
//                             style={{
//                               backgroundColor: inputColors[rowIndex] || '',
//                             }}
//                           />
//                         )}
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => handleSubmit(rowIndex, row[row.length - 1])}
//                           className="btn btn-sm btn-success"
//                         >
//                           Submit
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         ) : (
//           <div>No File is uploaded yet!</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




import { useState } from "react";
import * as XLSX from 'xlsx';

// Function to read the Excel file and return parsed data
const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      resolve(workbook);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// Function to generate objects from the current sheet
const generateObjects = (currentSheet) => {
  const rows = Object.values(currentSheet)[0];
  const keys = rows[0];
  let result = [];
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    result.push(Object.fromEntries(keys.map((_, i) => [keys[i], row[i]])));
  }
  return result;
};

function App() {
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [currentSheet, setCurrentSheet] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [inputColors, setInputColors] = useState([]);

  // Handle file selection and validation
  const handleFile = async (e) => {
    let fileTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        const workbook = await readFile(selectedFile);
        setExcelFile(workbook);
        const sheets = workbook.SheetNames;
        setSheetNames(sheets);
        const sheetData = sheets.map((name) => {
          const ws = workbook.Sheets[name];
          const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
          return { [name]: dataParse };
        });
        setParsedData(sheetData);
        setCurrentSheet(sheetData[0]);

        const rows = Object.values(sheetData[0])[0];
        if (rows && rows.length > 1) {
          const rowCount = rows.length - 1;
          setInputValues(new Array(rowCount).fill(''));
          setInputColors(new Array(rowCount).fill(''));
        }
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  };

  // Update sheet data on cell edit
  const updateSheet = (newValue, row, col) => {
    const sheetRow = Object.values(currentSheet)[0][row];
    sheetRow.splice(col, 1, newValue);
    Object.values(currentSheet)[0].splice(row, 1, sheetRow);
    setCurrentSheet({
      ...currentSheet,
      [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0]
    });
  };

  // Handle sheet tab click to change active sheet
  const handleSheetClick = (e, idx) => {
    const selectedSheet = parsedData.find(sheet => Object.keys(sheet).includes(e.target.value));
    setCurrentSheet(selectedSheet);
    setActiveSheet(idx);
  };

  // Handle input change
  const handleInputChange = (e, index) => {
    const newValues = [...inputValues];
    newValues[index] = e.target.value;
    setInputValues(newValues);
  };

  // Validate input value on submission
  const handleSubmit = (index, lastColumnValue) => {
    const newColors = [...inputColors];
    const inputValue = parseFloat(inputValues[index]);  // Convert input value to a number
    const lastValue = parseFloat(lastColumnValue);      // Convert last column value to a number

    if (!isNaN(inputValue) && !isNaN(lastValue)) {
      newColors[index] = inputValue === lastValue ? 'lightgreen' : 'lightcoral';
    } else {
      newColors[index] = 'lightcoral';  // If any value is not a number, mark it as incorrect
    }

    setInputColors(newColors);
  };

  return (
    <><h3>Upload & View Excel Sheets</h3><div className="wrapper">

      <form className="form-group custom-form">
        <input type="file" className="form-control" onChange={handleFile} />
        {typeError && <div className="alert alert-danger" role="alert">{typeError}</div>}
      </form>

      <div className="viewer">
        {currentSheet ? (
          <div>
            <div>
              {sheetNames.map((name, idx) => (
                <button
                  key={idx}
                  value={name}
                  onClick={(e) => handleSheetClick(e, idx)}
                  className={`btn btn-sm ${activeSheet === idx ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {name}
                </button>
              ))}
            </div>
            {Object.values(currentSheet)[0] && Object.values(currentSheet)[0].length > 0 && (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {Object.values(currentSheet)[0][0].map((cell, idx) => (
                      <th key={idx}>{cell}</th>
                    ))}
                    <th>Input</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(currentSheet)[0].slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex}>{cell}</td>
                      ))}
                      <td>
                        {!isNaN(parseFloat(row[row.length - 1])) ? (
                          <input
                            type="text"
                            value={inputValues[rowIndex]}
                            onChange={(e) => handleInputChange(e, rowIndex)}
                            style={{ backgroundColor: inputColors[rowIndex] }} />
                        ) : null}
                      </td>
                      <td>
                        {!isNaN(parseFloat(row[row.length - 1])) ? (
                          <button
                            onClick={() => handleSubmit(rowIndex, row[row.length - 1])}
                            className="btn btn-success btn-sm"
                          >
                            Submit
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>
    </div></>
  );
}

export default App;
