import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Tab, Tabs, MenuItem } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { getUserProfile } from '../services/userService';
import ManageUsers from './ManageUsers';
import {countryCodes} from './Countrycodes';

const customStyles = {
  container: {
    // pl:3,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    backgroundColor: '#673ab7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 32,
  },
  headerText: {
    color: '#333',
  },
  subheaderText: {
    color: '#888',
  },
  inputField: {
    backgroundColor: 'white',
  },
  sectionTitle: {
    color: '#333',
    fontWeight: 'bold',
  },
  sectionText: {
    color: '#555',
  },
  outlinedButton: {
    mt: 1,
    borderColor: '#673ab7',
    color: '#673ab7',
  },
  tabContainer: {
    borderBottom: 1,
    borderColor: 'divider',
  },
  tab: {
    minWidth: 100,
    width: 150,
  },
  contact: {
    mt: 4,
    display: "flex", 
    gap: 2,
    pl: 3
  },
  countryCodeField: {
    backgroundColor: 'white',
    width: 150
  },
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  countryCode: Yup.string().required('Country Code is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
});

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    countryCode: '+31',
    contactNumber: '12345678',
    email: 'Johndeo@remindlearninggmail.com',
    role: true,
  });
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    async function fetchData() {
      // const data = await getUserProfile();
      // setUserData(data);
    }

    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={customStyles.container}>
      <Box sx={customStyles.tabContainer}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="user profile tabs">
          <Tab label="User Profile" sx={customStyles.tab} />
          {userData.role && <Tab label="Manage Users" sx={customStyles.tab} />}
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <Formik
          initialValues={{
            firstName: userData.firstName,
            lastName: userData.lastName,
            countryCode: userData.countryCode,
            contactNumber: userData.contactNumber,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Handle form submission
            console.log(values);
          }}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Box display="flex" alignItems="center" sx={{ mb: 4 , mt: 4, pl:3}}>
                <Box mr={2}>
                  <Box sx={customStyles.avatar}>{userData.firstName.charAt(0).toUpperCase()}</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={customStyles.headerText}>
                    JOHN DOE
                  </Typography>
                  <Typography variant="subtitle1" sx={customStyles.subheaderText}>Super admin</Typography>
                </Box>
              </Box>

              <Box mt={4} pl={3} display="flex" gap={2}>
                <Field
                  as={TextField}
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={customStyles.inputField}
                />
                <ErrorMessage name="firstName" component="div"/>

                <Field
                  as={TextField}
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={customStyles.inputField}
                />
                <ErrorMessage name="lastName" component="div" />
              </Box>

              <Box sx={customStyles.contact}>
                <Field
                  as={TextField}
                  select
                  label="Country Code"
                  variant="outlined"
                  name="countryCode"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={customStyles.countryCodeField}
                >
                  {countryCodes.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.country} ({option.code})
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage name="countryCode" component="div" />

                <Field
                  as={TextField}
                  label="Contact Number"
                  variant="outlined"
                  name="contactNumber"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={customStyles.inputField}
                />
                <ErrorMessage name="contactNumber" component="div" />
              </Box>

              <Box mt={4} pl={3}>
                <Typography variant="h6" sx={customStyles.sectionTitle}>ACCOUNT MANAGEMENT</Typography>
                  <Box display={'flex'}>
                    <Typography sx={customStyles.sectionText}>Your current admin email address is </Typography>
                    <Typography color={'purple'} ml={1}> {userData.email}</Typography>
                  </Box>
                <Button variant="outlined" sx={customStyles.outlinedButton}>Change Email</Button>
              </Box>

              <Box mt={4} pl={3}>
                <Typography variant="h6" sx={customStyles.sectionTitle}>SECURITY</Typography>
                <Button variant="outlined" sx={customStyles.outlinedButton}>Change Password</Button>
              </Box>

              <Box mt={4} pl={3} mb={4}>
                <Button type="submit" variant="contained" color="primary">Save Changes</Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {selectedTab === 1 && <ManageUsers />}
    </Box>
  );
};

export default UserProfile;
