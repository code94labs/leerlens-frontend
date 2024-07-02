import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { countryCodes } from './Countrycodes'; // Assume you have this file

interface UserFormProps {
    mode: string;
    userId?: string;
  }

const customStyles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    padding: '20px',
  },
  header: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  formGroup: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  formControl: {
    flex: 1,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  cancelButton: {
    color: '#A879FF',
    border: '2px #A879FF solid',
    borderRadius: '8px',
    padding: '10px 20px',
  },
  submitButton: {
    backgroundColor: '#A879FF',
    color: '#fff',
    borderRadius: '8px',
    padding: '10px 20px',
  },
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  countryCode: Yup.string().required('Country Code is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const UserForm = ({mode,userId}: UserFormProps) => { 
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '',
    contactNumber: '',
    email: '',
  });

  useEffect(() => {
    if (mode === 'edit' && userId) {
    //   async function fetchData() {
    //     // Fetch existing user data using the service class
    //     // const data = await getExistingUser(userId); // Assuming getExistingUser is defined
    //     // setUserData(data);
    //   }

    //   fetchData();
    }
  }, [mode, userId]);
  console.log(mode, userId);
  return (
    <Box sx={customStyles.container}>
      <Typography variant="h5" sx={customStyles.header}>
        Personal Details
      </Typography>

      <Formik
        initialValues={userData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);
        }}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Box sx={customStyles.formGroup}>
        
                <Field
                  as={TextField}
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  style={{width:'40%'}}
                />
                <Field
                  as={TextField}
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  style={{width:'40%'}}
                />
                <ErrorMessage name="lastName" component="div" className="error" />
            </Box>

            <Box sx={customStyles.formGroup}>
                <Field
                  as={TextField}
                  select
                  label="Country Code"
                  variant="outlined"
                  name="countryCode"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  style = {{width: 150}}
                >
                  {countryCodes.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.country} ({option.code})
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="countryCode" component="div" className="error" />
                <Field
                  as={TextField}
                  label="Contact Number"
                  variant="outlined"
                  name="contactNumber"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  style={{width:'26.4%'}}
                />
                <ErrorMessage name="contactNumber" component="div" className="error" />
            </Box>

            <Typography variant="h5" sx={customStyles.header}>
                Account Management
            </Typography>

            <Box sx={customStyles.formGroup}>
              <Box sx={customStyles.formControl}>
                <Field
                  as={TextField}
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  style={{width:'40%'}}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </Box>
            </Box>

            <Box sx={customStyles.buttonGroup}>
              <Button sx={customStyles.cancelButton}>Cancel</Button>
              <Button type="submit" sx={customStyles.submitButton}>
                {mode === 'edit' ? 'Update User' : 'Add User'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserForm;
