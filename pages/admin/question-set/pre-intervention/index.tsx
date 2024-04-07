import { Stack, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../../../../shared/Sidebar/Sidebar'
import AdminHeader from '../../../../shared/Header/AdminHeader'

const PreInterventionPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Pre-Intervention" />

      </Stack>
    </Stack>
  )
}

export default PreInterventionPage