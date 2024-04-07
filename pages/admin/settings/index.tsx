import { Stack, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../../../shared/Sidebar/Sidebar'

const SettingsPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        {/* <AdminHeader /> */}

        <Typography variant="h3">Settings page Content</Typography>
      </Stack>
    </Stack>
  )
}

export default SettingsPage