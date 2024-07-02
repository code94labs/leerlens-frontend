import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Delete, AlignHorizontalCenter, AlignVerticalCenter } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Image from "next/image";
// import { getAllUsers, deleteUser } from '../services/userService';


type User = {
  id: string;
  email: string;
  role: string;
};

const customStyles = {
  container: {
    p: 3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  addButton: {
    backgroundColor: '#A879FF',
    color: 'white',
    mb: 2,
    '&:hover': {
      backgroundColor: '#562d9a',
    },
    borderRadius: 2,
    padding: '10px 20px',
    width: '15%',
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
  },
  dialogTitle: {
    backgroundColor: 'white',
    padding: '16px 24px',
    textAlign: 'center',
    textWeight: 'bold',
  },
  dialogContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '480px',
  },
  dialogActions: {
    justifyContent: 'center',
    padding: '16px',
  },
  confirmButton: {
    backgroundColor: '#E55C55',
    color: 'white',
    '&:hover': {
      backgroundColor: '#E40C40',
    },
    borderRadius: 2,
    padding: '10px 20px',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    borderRadius: 2,
    padding: '10px 20px',
    marginRight: '8px',
  },
  dialogImage: {
    width: '100px', 
    height: '100px', 
    marginBottom: '16px',
  },
};

const ManageUsers = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      // const data = await getAllUsers();
      const data: User[] = [
        { id: 'UI0001', email: 'superadmin@remindlearning', role: 'Super Administrator' },
        { id: 'UI0002', email: 'superadmin@remindlearning', role: 'Admin' },
        { id: 'UI0003', email: 'superadmin@remindlearning', role: 'Admin' },
      ];
      setUsers(data);
    }

    fetchData();
  }, []);

  const handleNewUser = () => {
    const mode = 'add';
    router.push({
      pathname: '/admin/settings/AddNewUser',
      query: { mode },
    });
  };

  const handleEdit = (id: string) => {
    const mode = 'edit';
    const userId = id;
    router.push({
      pathname: '/admin/settings/AddNewUser',
      query: { mode, userId },
    });
    console.log('Edit user:', id);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      // await deleteUser(selectedUser.id);
      console.log('User deleted:', selectedUser.id);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setOpen(false);
    }
  };

  return (
    <Box sx={customStyles.container}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Manage Users</Typography>
        <Button onClick={() => handleNewUser()} variant="contained" sx={customStyles.addButton}>Add New User</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={customStyles.tableHeader}>User ID</TableCell>
              <TableCell sx={customStyles.tableHeader}>Email Address</TableCell>
              <TableCell sx={customStyles.tableHeader}>Role</TableCell>
              <TableCell sx={customStyles.tableHeader} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={customStyles.tableRow}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(user.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={customStyles.dialogContent}>
        <img src={'/images/Vector.png'} alt="Delete Confirmation" style={customStyles.dialogImage} />
        <DialogTitle id="alert-dialog-title" sx={customStyles.dialogTitle}>
          {"Delete User"}
        </DialogTitle>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the user
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <strong>{selectedUser?.email}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={customStyles.dialogActions}>
          <Button onClick={() => setOpen(false)} sx={customStyles.cancelButton}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} sx={customStyles.confirmButton} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
