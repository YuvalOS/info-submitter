import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';

export const AppContainer = styled('div')({
  backgroundColor: '#ffffff',
  color: '#000000',
  minHeight: '100vh',
  padding: '20px',
});

const StyledButton = styled(Button)({
  height: '56px',
});

export const SubmitButton = styled(StyledButton)({
  backgroundColor: '#3400f2ff',
  color: '#ffffffff',
})

export const ResetButton = styled(StyledButton)({
  backgroundColor: '#ffffffff',
  color: '#ff0000ff',
})

export const DeleteButton = styled(StyledButton)({
  backgroundColor: '#ffffffff',
  color: '#883131ff',
  border: '1px solid #883131ff',
})

export const StyledTextField = styled(TextField)({
  width: '300px',
});

export const StyledTable = styled(Table)({
  marginTop: '20px',
  backgroundColor: '#f9f9f9',
});

export const StyledTableHead = styled(TableHead)({
});

export const StyledTableRow = styled(TableRow)({
    backgroundColor: '#f5f5f5',
});

export const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
  padding: '10px',
});
