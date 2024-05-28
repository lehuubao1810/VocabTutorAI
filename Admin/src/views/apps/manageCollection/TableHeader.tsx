// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { useTranslation } from 'react-i18next'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface TableHeaderDetailProps {
  value: string;
  handleFilter: (val: string) => void;
  toggleAdd: () => void
  toggleDelete: () => void
  deleteCount: number
}

const TableHeader = (props: TableHeaderDetailProps) => {
  // ** Props
  const { handleFilter, value, toggleAdd, toggleDelete, deleteCount } = props;
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'end',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ fontSize: 20 }}>{t('Collection')}</Typography>
      </Box>
      <Box sx={{ gap: 4, rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 3 }}
          placeholder={`${t('Search')} ${t('Collections')}` ?? ''}
          onChange={e => handleFilter(e.target.value)}
        />
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={toggleAdd} variant='contained' sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            {t('Add New')}
          </Button>
          <Button onClick={toggleDelete} variant='contained' sx={{ '& svg': { mx: 1 } }}>
            <Icon fontSize='1.125rem' icon='tabler:trash' />
            {t('Delete')}: {deleteCount}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default TableHeader
