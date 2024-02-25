import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Email = {
  sender: string;
  subject: string;
  timestamp: string;
};

export default function InboxTable() {
  const [emails, setEmails] = useState<Email[]>([]);

//   useEffect(() => {
//     // Fetch emails from API using Axios
//     axios.get<Email[]>('/api/emails')
//       .then(response => {
//         setEmails(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching emails:', error);
//       });
//   }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="inbox table">
        <TableHead>
          <TableRow>
            <TableCell>Sender</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emails.map((email, index) => (
            <TableRow key={index}>
              <TableCell>{email.sender}</TableCell>
              <TableCell>{email.subject}</TableCell>
              <TableCell>{email.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
