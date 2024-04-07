import { Stack, Typography } from '@mui/material'
import React from 'react'
import Sidebar from '../../../../shared/Sidebar/Sidebar'

const PostInterventionPage = () => {
  return (
    <Stack direction="row">
      <Sidebar />

      <Stack width={"100%"}>
        {/* <AdminHeader /> */}

        <Typography variant="h3">Post intervention content page</Typography>
      </Stack>
    </Stack>
  )
}

export default PostInterventionPage