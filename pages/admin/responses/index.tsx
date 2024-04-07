import { Stack, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../../../shared/Sidebar/Sidebar'
import AdminHeader from '../../../shared/Header/AdminHeader'

const ResponsesPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Responses" />

      </Stack>
    </Stack>
  )
}

export default ResponsesPage