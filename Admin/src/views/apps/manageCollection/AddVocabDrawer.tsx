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
import { VocabularyItem } from 'src/context/types'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'
import { useRouter } from 'next/router'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const SidebarAddVocab = (props: any) => {
  const { open, toggleAdd, fetchDataList } = props;
  const { control, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const router = useRouter();

  const createVocabulary = async (newData: Omit<VocabularyItem, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'vocabularies'), newData);
      const newDocData = { id: docRef.id, ...newData };

      const collectionRef = doc(db, 'collections', router.query.id as string);
      const collectionDoc = await getDoc(collectionRef);
      const collectionData = collectionDoc.data();
      const existingVocabIds = collectionData?.vocabulary || [];
      const currentValue = collectionData?.value || 0;

      await updateDoc(collectionRef, {
        vocabulary: [...existingVocabIds, docRef.id],
        value: currentValue + 1
      });

      fetchDataList((prevDataList: VocabularyItem[]) => [...prevDataList, newDocData]);

      handleClose();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleClose = () => {
    toggleAdd();
  };

  const onSubmit = (data: any) => {
    if (!data.word) {
      setError('word', { type: 'required', message: 'Word Is Required' });

      return;
    } else {
      clearErrors('word');
    }

    if (!data.translation) {
      setError('translation', { type: 'required', message: 'Translation Is Required' });

      return;
    } else {
      clearErrors('translation');
    }

    createVocabulary(data);
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
        <Typography variant='h5'>{t('Add New Vocabulary')}</Typography>
        <IconButton size='small' onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ padding: '16px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Controller
              name='word'
              control={control}
              rules={{ required: t('Word Is Required') || 'Word Is Required' }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  {...field}
                  sx={{ marginBottom: '16px' }}
                  label={t('Word')}
                  placeholder='word'
                  error={!!errors.word}
                  helperText={errors.word ? String(errors.word.message) : ''}
                />
              )}
            />
            <Controller
              name='mean'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Mean')}
                  onChange={onChange}
                  placeholder='mean'
                />
              )}
            />
            <Controller
              name='translation'
              control={control}
              rules={{ required: t('Translation Is Required') || 'Translation Is Required' }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  sx={{ marginBottom: '16px' }}
                  label={t('Translation')}
                  placeholder='translation'
                  error={!!errors.translation}
                  helperText={errors.translation ? String(errors.translation.message) : ''}
                />
              )}
            />
            <Controller
              name='example'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  autoFocus
                  fullWidth
                  value={value}
                  sx={{ marginBottom: '16px' }}
                  label={t('Example')}
                  onChange={onChange}
                  placeholder='example'
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
    </Drawer>
  );
};

export default SidebarAddVocab;
