import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Icon from 'src/@core/components/icon'
import { CollectionItemData } from 'src/context/types'
import { addDoc, collection } from 'firebase/firestore'
import { db } from 'src/firebase'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const SidebarAddCollection = (props: any) => {
  const { open, toggleAdd, fetchDataList, dataList } = props
  const { control, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

  const createCollection = async (newData: Omit<CollectionItemData, 'collectionID'>) => {
    try {
      const data = {
        ...newData,
        isAdmin: true,
      }
      const docRef = await addDoc(collection(db, 'collections'), data)
      const newDocData = { collectionID: docRef.id, ...data }
      fetchDataList([...dataList, newDocData])
      handleClose()
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleClose = () => {
    toggleAdd()
  }

  const onSubmit = (data: any) => {
    if (!data.name) {
      setError('name', { type: 'required', message: 'Name is required' });

      return;
    } else {
      clearErrors('name');
    }

    if (!data.desc) {
      setError('desc', { type: 'required', message: 'Description is required' });

      return;
    } else {
      clearErrors('desc');
    }

    createCollection({
      ...data,
      isPublish: false
    });
  };


  const { t } = useTranslation()

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 700 } } }}
    >
      <Header>
        <Typography variant='h5'>{t('Add New')} {t('Collection')}</Typography>
        <IconButton size='small' onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ padding: '16px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: t('Name Is Required') || 'Name Is Required' }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  {...field}
                  sx={{ marginBottom: '16px' }}
                  label={t('Name')}
                  placeholder='name'
                  error={!!errors.name}
                  helperText={errors.name ? String(errors.name.message) : ''}
                />
              )}
            />
            <Controller
              name='desc'
              control={control}
              rules={{ required: t('Description Is Required') || 'Description Is Required' }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  {...field}
                  sx={{ marginBottom: '16px' }}
                  label={t('Description')}
                  placeholder='description'
                  error={!!errors.desc}
                  helperText={errors.desc ? String(errors.desc.message) : ''}
                />
              )}
            />
            <TextField
              fullWidth
              disabled
              value={'Private'}
              sx={{ marginBottom: '16px' }}
              label={t('Status')}
            />
          </Box>
          <Box sx={{ mt: 8 }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {t('Submit')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddCollection
