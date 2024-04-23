import { Stack } from '@mui/material'
import React from 'react'
import Sidebar from '../../../shared/Sidebar/Sidebar'
import AdminHeader from '../../../shared/Header/AdminHeader'
import ResponsesContent from '../../../components/ResponsesContent/ResponsesContent'

const ResponsesPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        <AdminHeader title="Responses" />

        <ResponsesContent />
      </Stack>
    </Stack>
  )
}

export default ResponsesPage