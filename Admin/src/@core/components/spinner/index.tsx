// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <img src='/images/logos/logo.png' alt='Logo' style={{ width: '50vw' }} />

      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
