// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types Imports
import AxiosInstance from 'src/configs/axios'
import adminPathName from 'src/configs/endpoints/admin';
import { CollectionItemData, QuizQuestionStore } from 'src/context/types'
import { addDoc, collection } from 'firebase/firestore'
import { db } from 'src/firebase'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { boolean } from 'yup'


// ** Define Header component using styled function
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const SidebarAddCollection = (props: any) => {
  const { open, toggleAdd, fetchDataList, dataList } = props;
  const { control, handleSubmit } = useForm()

  const createCollection = async (newData: Omit<CollectionItemData, 'collectionID'>) => {
    try {
      const data = {
        ...newData,
        isAdmin: true,
      }
      const docRef = await addDoc(collection(db, 'collections'), data);
      const newDocData = { collectionID: docRef.id, ...data };
      fetchDataList([...dataList, newDocData]);
      handleClose()
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleClose = () => {
    toggleAdd();
  };

  const onSubmit = (data: any) => {
    createCollection({
      ...data,
      isPublish: data.isPublish === "1"
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
      <Header sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
        <Typography variant='h5'>{t('Add New Collection')}</Typography>
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Name')}
                  onChange={onChange}
                  placeholder='name'
                />
              )}
            />
            <Controller
              name='desc'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Description')}
                  onChange={onChange}
                  placeholder='description'
                />
              )}
            />
            <Controller
              name='isPublish'
              control={control}
              rules={{ required: true }}
              defaultValue=''
              render={({ field: { value, onChange } }) => (
                <Select
                  sx={{ mb: 8 }}
                  value={value}
                  onChange={(e: SelectChangeEvent<string>) => onChange(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  fullWidth
                >
                  <MenuItem value='' disabled>{t('Select Status')}</MenuItem>
                  <MenuItem value={'1'}>{t('Public')}</MenuItem>
                  <MenuItem value={'0'}>{t('Private')}</MenuItem>
                </Select>
              )}
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
    </Drawer >
  );
};

export default SidebarAddCollection;
