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
import { useState } from 'react'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const SidebarAddCollection = (props: any) => {
  const { open, toggleAdd, fetchDataList, dataList } = props
  const { control, handleSubmit, setError, clearErrors } = useForm();

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDescEmpty, setIsDescEmpty] = useState(false);

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
      setIsNameEmpty(true);

      return;
    } else {
      clearErrors('name');
      setIsNameEmpty(false);
    }

    if (!data.desc) {
      setError('desc', { type: 'required', message: 'Description is required' });
      setIsDescEmpty(true);

      return;
    } else {
      clearErrors('desc');
      setIsDescEmpty(false);
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
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Name')}
                  onChange={onChange}
                  placeholder='name'
                  error={isNameEmpty}
                  helperText={isNameEmpty ? t('Name is required') : ''}
                />
              )}
            />
            <Controller
              name='desc'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Description')}
                  onChange={onChange}
                  placeholder='description'
                  error={isDescEmpty}
                  helperText={isDescEmpty ? t('Description is required') : ''}
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
