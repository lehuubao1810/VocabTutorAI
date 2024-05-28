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
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from 'src/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const SidebarAddUser = (props: any) => {
  const { open, toggleAdd, fetchDataList, dataList } = props;
  const { control, handleSubmit } = useForm()

  const createUser = async (newData: Omit<{
    email: string,
    username: string,
    password: string
  }, 'id'>) => {
    createUserWithEmailAndPassword(auth, newData.email, newData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        return user;
      })
      .then((user) => {
        updateProfile(user, {
          displayName: newData.username,
        });

        return user;
      })
      .then((user) => {
        setDoc(doc(db, "users", user.uid), {
          username: newData.username,
          email: user.email,
        });
        fetchDataList([
          ...dataList,
          {
            username: newData.username,
            email: user.email,
            uid: user.uid
          }
        ])
        handleClose()
        toast.success('Create User Successfully!')
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage)
      });
  };

  const handleClose = () => {
    toggleAdd();
  };

  const onSubmit = (data: any) => {
    createUser(data);
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
        <Typography variant='h5'>{t('Add New')} {t('User')}</Typography>
        <IconButton size='small' onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ padding: '16px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Username')}
                  onChange={onChange}
                  placeholder='username'
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Email')}
                  onChange={onChange}
                  placeholder='email@gmail.com'
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  type='password'
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Password')}
                  onChange={onChange}
                  placeholder='Text@111'
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

export default SidebarAddUser;
