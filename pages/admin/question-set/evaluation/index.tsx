import { Stack, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../../../../shared/Sidebar/Sidebar'

const EvaluationPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        {/* <AdminHeader /> */}

        <Typography variant="h3">Evaluation content page</Typography>
      </Stack>
    </Stack>
  )
}

export default EvaluationPage