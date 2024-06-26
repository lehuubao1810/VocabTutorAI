import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import AxiosInstance from 'src/configs/axios'

import adminPathName from 'src/configs/endpoints/admin';


const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const SidebarCharacterAI = (props: any) => {
  const { open, toggleAdd, fetchData } = props;
  const { control, handleSubmit } = useForm()

  const createCharacterAI = async (newData: Omit<{
    name: string,
    personality: string,
    firstGreet: string,
    information: string
  }, 'id'>) => {
    try {
      await AxiosInstance.post(`${adminPathName.createCharacterAI}`, newData);
      fetchData()
      handleClose()
    } catch (error: any) {
      toast.error(error)
    }
  };

  const handleClose = () => {
    toggleAdd();
  };

  const onSubmit = (data: any) => {
    createCharacterAI(data);
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
        <Typography variant='h5'>{t('Add New')} {t('CharacterAI')}</Typography>
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
                  placeholder='John'
                />
              )}
            />
            <Controller
              name='personality'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Personality')}
                  onChange={onChange}
                  placeholder='kind, friendly'
                />
              )}
            />
            <Controller
              name='firstGreet'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('FirstGreet')}
                  onChange={onChange}
                  placeholder="Hello, I'm John. Nice to meet you"
                />
              )}
            />
            <Controller
              name='information'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Information')}
                  onChange={onChange}
                  placeholder="Job: Student, Adress: Ho Chi Minh City"
                />
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

export default SidebarCharacterAI;
