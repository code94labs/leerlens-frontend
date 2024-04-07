import { Stack, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../../../../shared/Sidebar/Sidebar'

const NormGroupPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        {/* <AdminHeader /> */}

        <Typography variant="h3">Normgroup content page</Typography>
      </Stack>
    </Stack>
  )
}

export default NormGroupPage