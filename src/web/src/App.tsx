import { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  StyledTable,
  StyledTableHead,
  StyledTableRow,
  StyledTableCell,
  StyledTextField,
  AppContainer,
  SubmitButton,
  ResetButton,
  DeleteButton,
} from './App.styles';
import TableBody from '@mui/material/TableBody';
import { getUserDataEntities, submitNewDataEntity, deleteDataEntity, resetUserData } from './serverFunctions';
import '@mui/material';

function App() {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const parseData = (rawData: Record<string, string>[]) => {
    const parsed = rawData.map((item) => {
      try {
        const parsedData = JSON.parse(item.data);
        return { id: item.id, ...parsedData };
      } catch {
        return { id: item.id };
      }
    });
    return parsed;
  };

  const fetchData = async () => {
    try {
      const result = await getUserDataEntities();
      const parsedResult = parseData(result);
      setData(parsedResult);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitNewDataEntity(input);
      toast.success('Data submitted successfully');
      setInput('');
      fetchData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDataEntity(id);
        toast.success('Data deleted successfully');
        fetchData();
      } catch (error) {
        toast.error(error.message);
      }
  }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      try {
        await resetUserData();
        toast.success('All data has been reset');
        fetchData();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const columns = useMemo(
      () => Array.from(new Set(data.flatMap((item) => Object.keys(item)))),
      [data]
  );

  return (
    <AppContainer>
      <ToastContainer />
      <h1>Data Submitter</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <StyledTextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter data"
            variant="outlined"
          />
          <SubmitButton onClick={handleSubmit} disabled={loading} variant="contained">
            {loading ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </div>
        <div>
          <ResetButton
            onClick={handleReset}
            variant="contained"
            disabled={loading || data.length === 0}
          >
            Reset All Data
          </ResetButton>
        </div>
      </div>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            {columns.map((column) => (
              <StyledTableCell key={column}>{column}</StyledTableCell>
            ))}
            <StyledTableCell>Actions</StyledTableCell>
          </StyledTableRow>
        </StyledTableHead>
        <TableBody>
          {data.map((item, index) => (
            <StyledTableRow key={index}>
              {columns.map((column) => (
                <StyledTableCell key={column}>{item[column]}</StyledTableCell>
              ))}
              <StyledTableCell>
                <DeleteButton
                  onClick={() => handleDelete(item.id)}
                  variant="outlined"
                  size="small"
                >
                  Delete
                </DeleteButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTable>
    </AppContainer>
  );
}

export default App;
