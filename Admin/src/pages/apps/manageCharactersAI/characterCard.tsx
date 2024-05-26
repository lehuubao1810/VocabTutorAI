import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { CharacterAIType } from 'src/context/types';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next'
import AxiosInstance from 'src/configs/axios';
import adminPathName from 'src/configs/endpoints/admin';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Grid } from '@mui/material';

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import ButtonsFab from 'src/views/components/buttons/ButtonsFab';

interface CardInfluencerProps {
  characterAI: CharacterAIType;
  fetchData: () => void;
}

const CharacterCard = (props: CardInfluencerProps) => {
  const { characterAI, fetchData } = props;
  const { t } = useTranslation()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState(characterAI);
  const { control, setValue } = useForm()
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const handleDeleteCharacterAI = async () => {
    try {
      await AxiosInstance.delete(`${adminPathName.deleteCharacterAI}/${characterAI._id}`);
      fetchData()
      toast.success(`Delete Successfully`);
    } catch (error: any) {
      if (error && error.response) {
        toast.error(error.response.data.message)
      }
    }
  };

  const handleUpdate = async () => {
    if (!editedData) return;
    try {
      const formData = new FormData();
      formData.append('name', editedData.name);
      formData.append('personality', editedData.personality);
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      const response = await AxiosInstance.put(`${adminPathName.editCharacterAI}/${editedData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      toast.success('Update Successfully')
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleChooseFile = async () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.click();
      fileInput.addEventListener('change', async event => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const binaryString = event.target?.result as string;
            setEditedData(prevData => ({
              ...prevData!,
              image: binaryString
            }));
            setValue('image', binaryString);
            setSelectedFile(file);
          };
          reader.readAsDataURL(file);
        }
      });
    } catch (error) {
      console.error('Error choosing file:', error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Card>
        <CardHeader
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mr: 0
          }}
          title={`AI ${characterAI.name}`}
          action={
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <Icon icon='tabler:dots-vertical' fontSize={20} />
            </IconButton>
          }
        />
        <Menu
          id="long-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              setIsEditDialogOpen(true);
              handleMenuClose();
            }}
          >
            {t('Edit')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsDeleteDialogOpen(true);
              handleMenuClose();
            }}
          >
            {t('Delete')}
          </MenuItem>
        </Menu>
        <CardContent>
          {/* Edit */}
          <Dialog
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            aria-labelledby='user-view-edit'
            aria-describedby='user-view-edit-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
            <DialogTitle
              id='user-view-edit'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              {t('Edit Vocabulary Information')}
              <IconButton
                size='small'
                onClick={() => setIsEditDialogOpen(false)}
                sx={{
                  p: '0.438rem',
                  borderRadius: 1,
                  color: 'text.primary',
                  top: '5%',
                  position: 'absolute',
                  right: '5%',
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
                  }
                }}
              >
                <Icon icon='tabler:x' fontSize='1.125rem' />
              </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                {t('Updating vocabulary details will receive a privacy audit.')}
              </DialogContentText>
              <DialogContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      name="name"
                      label={t("Name")}
                      fullWidth
                      value={editedData?.name || ''}
                      onChange={(e) => {
                        setEditedData((prev: any) => ({ ...prev, name: e.target.value }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      id="personality"
                      name="personality"
                      label={t("Personality")}
                      fullWidth
                      value={editedData?.personality || ''}
                      onChange={(e) => {
                        setEditedData((prev: any) => ({ ...prev, personality: e.target.value }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='image'
                      control={control}
                      defaultValue={editedData?.image || ''}
                      render={({ field }) => (
                        <Grid
                          container
                          alignItems='end'
                          spacing={2}
                          sx={{ display: 'flex', gap: 1 }}
                        >
                          <Grid item sx={{ position: 'relative', flex: 1 }} >
                            <TextField
                              fullWidth
                              label={t('Image')}
                              placeholder='/images/'
                              value={field.value}
                              onChange={e => {
                                field.onChange(e)
                                setValue('image', e.target.value)
                              }}
                              sx={{ mt: 2 }}
                            />
                            <Grid item className='buttonAvatar' onClick={handleChooseFile}
                              sx={{ position: 'absolute', top: '35%', right: 3 }}
                            >
                              <ButtonsFab />
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    />
                  </Grid>
                </Grid>
                <DialogActions
                  sx={{
                    justifyContent: 'center',
                    marginTop: 8,
                    gap: 2,
                    px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                    pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                  }}
                >
                  <Button variant='contained' type='submit' onClick={() => {
                    handleUpdate()
                    setIsEditDialogOpen(false);
                  }}>
                    {t('Save')}
                  </Button>
                  <Button variant='tonal' color='secondary' onClick={() => setIsEditDialogOpen(false)}>
                    {t('Cancel')}
                  </Button>
                </DialogActions>
              </DialogContent>
            </DialogContent>
          </Dialog>

          {/* Delete */}
          <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
            <DialogTitle
              id='delete'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              {t('Confirm Deletion')}
              <IconButton
                size='small'
                onClick={() => setIsDeleteDialogOpen(false)}
                sx={{
                  p: '0.438rem',
                  borderRadius: 1,
                  color: 'text.primary',
                  top: '5%',
                  position: 'absolute',
                  right: '5%',
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
                  }
                }}
              >
                <Icon icon='tabler:x' fontSize='1.125rem' />
              </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <p>{t('Are you sure you want to delete this category?')}</p>
            </DialogContent>
            <DialogActions>
              <>
                <Button variant='tonal' color='secondary' onClick={() => setIsDeleteDialogOpen(false)}>
                  {t('Cancel')}
                </Button>
                <Button color='error' variant='tonal' onClick={() => { handleDeleteCharacterAI(); setIsDeleteDialogOpen(false); }}>
                  {t('Delete')}
                </Button>
              </>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>

    </>
  );
}

export default CharacterCard;
