import { useCallback, useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Checkbox, IconButton, Tooltip, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Grid, TextField, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Icon } from '@iconify/react'
import Link from 'next/link';
import { CollectionItemData } from 'src/context/types'
import TableHeader from 'src/views/apps/manageCollection/TableHeader';
import AddDrawer from 'src/views/apps/manageCollection/AddCollectionDrawer';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from 'src/firebase';

// Định nghĩa hàm Component
export default function Collection() {
  const [value, setValue] = useState<string>('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [dataList, setDataList] = useState<CollectionItemData[]>([]);
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { t } = useTranslation();
  const [deleteUserOpen, setDeleteOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState<CollectionItemData | null>(null);

  const toggleAddDrawer = () => setAddUserOpen(!addUserOpen);
  const toggleDeleteDrawer = () => setDeleteOpen(!deleteUserOpen);

  const handleFilter = useCallback((val: string) => {
    setValue(val);
    if (val === '') {
      fetchData();
    } else {
      const filteredData = dataList.filter((data: CollectionItemData) => {
        return data.name.toLowerCase().includes(val.toLowerCase()) || data.desc.toLowerCase().includes(val.toLowerCase());
      });
      setDataList(filteredData);
    }
  }, [dataList]);

  const handleChangePage = (event: any, newPage: number) => {
    setPaginationModel({ ...paginationModel, page: newPage });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaginationModel({ pageSize: parseInt(event.target.value, 10), page: 0 });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setSelectedItems(event.target.checked ? [...selectedItems, id] : selectedItems.filter(itemId => itemId !== id));
  };

  useEffect(() => {
    setSelectedItemsCount(selectedItems.length);
  }, [selectedItems]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'collections'));
    const data = querySnapshot.docs.map(doc => ({ collectionID: doc.id, ...doc.data() } as CollectionItemData));
    setDataList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateCollection = async (updatedData: CollectionItemData | null) => {
    if (!updatedData) return;
    try {
      const docRef = doc(db, 'collections', updatedData.collectionID);
      await updateDoc(docRef, updatedData);
      setDataList(dataList.map(item => (item.collectionID === updatedData.collectionID ? updatedData : item)));
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDeleteSelectedItems = async () => {
    try {
      await Promise.all(selectedItems.map(id => deleteDoc(doc(db, 'collections', id))));
      setDataList(dataList.filter(item => !selectedItems.includes(item.collectionID)));
      setDeleteOpen(false);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error deleting documents: ', error);
    }
  };

  return (
    <>
      <Paper>
        <TableHeader
          value={value}
          handleFilter={handleFilter}
          toggleAdd={toggleAddDrawer}
          toggleDelete={toggleDeleteDrawer}
          deleteCount={selectedItemsCount}
        />
        <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
          <Table sx={{
            "& img": {
              height: "100px !important", width: "auto !important"
            }
          }} aria-label="custom pagination table">
            <TableHead sx={{ backgroundColor: theme => `${theme.palette.customColors.tableHeaderBg}` }}>
              <TableRow>
                <TableCell style={{ fontSize: 15, width: '30%' }}>
                  {t('Name')}
                </TableCell>
                <TableCell style={{ fontSize: 15, width: '30%' }}>
                  {t('Description')}
                </TableCell>
                <TableCell style={{ fontSize: 15, width: '20%', textAlign: 'center' }}>
                  {t('Status')}
                </TableCell>
                <TableCell style={{ width: '20%', textAlign: 'center' }}>
                  {t('Actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {dataList && dataList.length > 0 ? (
                dataList.slice(paginationModel.page * paginationModel.pageSize, (paginationModel.page + 1) * paginationModel.pageSize).map((collection) => (
                  <TableRow key={collection.collectionID}>
                    <TableCell sx={{ fontSize: 15, width: '30%' }}>
                      {collection.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: 15,
                        width: '30%',
                      }}
                    >
                      {collection && (
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                          <Typography
                            noWrap
                            sx={{
                              fontSize: 15,
                              fontWeight: 500,
                              textDecoration: 'none',
                              color: 'text.secondary',
                            }}
                          >
                            <div dangerouslySetInnerHTML={{ __html: collection.desc }}></div>
                          </Typography>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontSize: 15, width: '20%', textAlign: 'center' }}>
                      {collection.isPublish ? 'Public' : 'Private'}
                    </TableCell>
                    <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                      <>
                        <Tooltip title={t("View")}>
                          <IconButton
                            size='small'
                            component={Link}
                            sx={{ color: 'text.secondary', fontSize: 22, mx: 2 }}
                            href={`/apps/manageCollection/${collection.collectionID}`}
                          >
                            <Icon icon='tabler:eye' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t("Edit")}>
                          <IconButton
                            size='small'
                            onClick={() => {
                              setEditedData(collection);
                              setIsEditDialogOpen(true);
                            }}
                            sx={{ color: 'text.secondary', fontSize: 22, mx: 2 }}
                          >
                            <Icon icon='tabler:edit' />
                          </IconButton>
                        </Tooltip>
                        <Checkbox
                          size="small"
                          onChange={(event) => handleCheckboxChange(event, collection.collectionID)}
                        />
                      </>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    {t('No rows')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[{ label: 'All', value: -1 }]}
          count={dataList.length}
          rowsPerPage={paginationModel.pageSize}
          page={paginationModel.page}
          component="div"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddDrawer open={addUserOpen} toggleAdd={toggleAddDrawer} fetchDataList={setDataList} dataList={dataList} />
      </Paper>

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
          {t('Edit Collection Information')}
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
            {t('Updating collection details will receive a privacy audit.')}
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
                    setEditedData(prev => ({
                      ...prev,
                      name: e.target.value
                    } as CollectionItemData))
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  id="desc"
                  name="desc"
                  label={t("Desc")}
                  fullWidth
                  value={editedData?.desc || ''}
                  onChange={(e) => {
                    setEditedData(prev => ({
                      ...prev,
                      desc: e.target.value
                    } as CollectionItemData))
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Select
                    defaultValue={editedData?.isPublish}
                    value={editedData?.isPublish || false}
                    onChange={(e) => {
                      setEditedData(prev => ({
                        ...prev,
                        isPublish: e.target.value === "true"
                      } as CollectionItemData));
                    }}
                  >
                    <MenuItem value='' disabled>{t('Select Status')}</MenuItem>
                    <MenuItem value={'true'}>{t('Public')}</MenuItem>
                    <MenuItem value={'false'}>{t('Private')}</MenuItem>
                  </Select>
                </FormControl>
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
                handleUpdateCollection(editedData);
              }}>
                {t('Save')}
              </Button>
              <Button variant='tonal' color='secondary' onClick={() => setIsEditDialogOpen(false)}>
                {t('Cancel')}
              </Button>
            </DialogActions>
          </DialogContent>
        </DialogContent>
      </Dialog >

      {/* Delete */}
      <Dialog open={deleteUserOpen} onClose={() => setDeleteOpen(false)}>
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
            onClick={() => setDeleteOpen(false)}
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
          <p>{t('Are you sure you want to delete?')}</p>
        </DialogContent>
        <DialogActions>
          <>
            <Button variant='tonal' color='secondary' onClick={() => setDeleteOpen(false)}>
              {t('Cancel')}
            </Button>
            <Button color='error' variant='tonal' onClick={handleDeleteSelectedItems}>
              {t('Delete')}
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}
