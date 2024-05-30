import { useCallback, useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Checkbox, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, Grid, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import { updateDoc, deleteDoc, getDoc, doc } from 'firebase/firestore';
import { db } from 'src/firebase';
import { VocabularyItem } from 'src/context/types';
import TableHeader from 'src/views/apps/manageCollection/TableHeaderDetail';
import AddDrawer from 'src/views/apps/manageCollection/AddVocabDrawer';
import { useTranslation } from 'react-i18next';

export default function CollectionDetail() {
    const router = useRouter();
    const { t } = useTranslation();
    const [value, setValue] = useState<string>('');
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [selectedItemsCount, setSelectedItemsCount] = useState(0);
    const [selectedQuizStoreName, setSelectedQuizStoreName] = useState('');
    const [dataList, setDataList] = useState<VocabularyItem[]>([]);
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [deleteUserOpen, setDeleteOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedData, setEditedData] = useState<VocabularyItem | null>(null);

    const toggleAddDrawer = () => setAddUserOpen(!addUserOpen);
    const toggleDeleteDrawer = () => setDeleteOpen(!deleteUserOpen);

    const handleFilter = useCallback((val: string) => {
        setValue(val);
        if (val === '') {
            fetchData();
        } else {
            const filteredData = dataList.filter((data: VocabularyItem) => {
                return data.word.toLowerCase().includes(val.toLowerCase()) ||
                    data.translation.toLowerCase().includes(val.toLowerCase()) ||
                    data.mean.toLowerCase().includes(val.toLowerCase()) ||
                    data.example.toLowerCase().includes(val.toLowerCase());
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

    const getVocabularyDetails = async (vocabIds: string[]): Promise<VocabularyItem[]> => {
        if (!Array.isArray(vocabIds)) {
            console.error("Expected an array of vocabulary IDs");

            return [];
        }

        const vocabPromises = vocabIds.map(async (vocabId) => {
            try {
                const vocabDoc = await getDoc(doc(db, "vocabularies", vocabId));
                if (vocabDoc.exists()) {
                    return { id: vocabId, ...vocabDoc.data() } as VocabularyItem;
                } else {
                    throw new Error(`Vocabulary with id ${vocabId} does not exist`);
                }
            } catch (error) {
                console.error('Error retrieving vocabulary:', error);

                return null;
            }
        });

        const vocabDetails = await Promise.all(vocabPromises);

        return vocabDetails.filter(item => item !== null) as VocabularyItem[];
    };


    const fetchData = async () => {
        const collectionRef = doc(db, "collections", router.query.id as string);
        const collectionSnapshot = await getDoc(collectionRef);

        if (!collectionSnapshot.exists()) {
            console.error("Collection does not exist");

            return;
        }

        const collectionData = collectionSnapshot.data();

        const vocabIds = collectionData.vocabulary || [];
        if (!Array.isArray(vocabIds)) {
            console.error("Vocabulary data is not an array");

            return;
        }

        const vocabularyDetails = await getVocabularyDetails(vocabIds);
        setDataList(vocabularyDetails);
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateVocabulary = async (updatedData: VocabularyItem | null) => {
        if (!updatedData) return;
        try {
            const docRef = doc(db, 'vocabularies', updatedData.id);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                await updateDoc(docRef, updatedData);
                setDataList(dataList.map(item => (item.id === updatedData.id ? updatedData : item)));
                setIsEditDialogOpen(false);
            } else {
                console.error(`Document with ID ${updatedData.id} does not exist`);
            }
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const handleDeleteSelectedItems = async () => {
        try {
            await Promise.all(selectedItems.map(id => deleteDoc(doc(db, 'vocabularies', id))));

            const collectionRef = doc(db, "collections", router.query.id as string);
            const collectionSnapshot = await getDoc(collectionRef);

            if (!collectionSnapshot.exists()) {
                console.error("Collection does not exist");

                return;
            }

            const collectionData = collectionSnapshot.data();
            const vocabularyArray = collectionData.vocabulary || [];
            const updatedVocabularyArray = vocabularyArray.filter((id: string) => !selectedItems.includes(id));
            await updateDoc(collectionRef, { vocabulary: updatedVocabularyArray });

            const newDataList = dataList.filter(item => !selectedItems.includes(item.id));
            setDataList(newDataList);

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
                    selectedQuizStoreName={selectedQuizStoreName}
                    setSelectedQuizStoreName={setSelectedQuizStoreName}
                    toggleAdd={toggleAddDrawer}
                    toggleDelete={toggleDeleteDrawer}
                    deleteCount={selectedItemsCount}
                />
                <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
                    <Table aria-label="custom pagination table">
                        <TableHead sx={{ backgroundColor: theme => `${theme.palette.customColors.tableHeaderBg}` }}>
                            <TableRow>
                                <TableCell style={{ fontSize: 15, width: '20%' }}>{t('Word')}</TableCell>
                                <TableCell style={{ fontSize: 15, width: '20%' }}>{t('Mean')}</TableCell>
                                <TableCell style={{ fontSize: 15, width: '20%' }}>{t('Translation')}</TableCell>
                                <TableCell style={{ fontSize: 15, width: '20%' }}>{t('Example')}</TableCell>
                                <TableCell style={{ fontSize: 15, width: '20%', textAlign: 'center' }}>{t('Actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataList && dataList.length > 0 ? (
                                dataList.slice(paginationModel.page * paginationModel.pageSize, (paginationModel.page + 1) * paginationModel.pageSize).map((vocabulary) => (
                                    <TableRow key={vocabulary.id}>
                                        <TableCell sx={{ width: '20%', fontSize: 15 }}>{vocabulary.word}</TableCell>
                                        <TableCell sx={{ width: '20%', fontSize: 15 }}>{vocabulary.mean}</TableCell>
                                        <TableCell sx={{ width: '20%', fontSize: 15 }}>{vocabulary.translation}</TableCell>
                                        <TableCell sx={{ width: '20%', fontSize: 15 }}>{vocabulary.example}</TableCell>
                                        <TableCell style={{ width: '20%', textAlign: 'center' }}>
                                            <>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        size='small'
                                                        onClick={() => {
                                                            setEditedData(vocabulary);
                                                            setIsEditDialogOpen(true);
                                                        }}
                                                        sx={{ color: 'text.secondary', fontSize: 22, mx: 2 }}
                                                    >
                                                        <Icon icon='tabler:edit' />
                                                    </IconButton>
                                                </Tooltip>
                                                <Checkbox
                                                    size="small"
                                                    checked={selectedItems.includes(vocabulary.id)}
                                                    onChange={(event) => handleCheckboxChange(event, vocabulary.id)}
                                                />
                                            </>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} style={{ textAlign: 'center' }}>{t('No rows')}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[{ label: 'All', value: -1 }]}
                    count={dataList?.length || 0}
                    rowsPerPage={paginationModel.pageSize}
                    page={paginationModel.page}
                    component="div"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <AddDrawer open={addUserOpen} toggleAdd={toggleAddDrawer} fetchDataList={setDataList} dataList={dataList} />
            </Paper>

            {/* Edit Dialog */}
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
                                    id="word"
                                    name="word"
                                    label={t("Word")}
                                    fullWidth
                                    value={editedData?.word || ''}
                                    onChange={(e) => {
                                        setEditedData((prev: any) => ({ ...prev, word: e.target.value }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    id="mean"
                                    name="mean"
                                    label={t("Mean")}
                                    fullWidth
                                    value={editedData?.mean || ''}
                                    onChange={(e) => {
                                        setEditedData((prev: any) => ({ ...prev, mean: e.target.value }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    id="translation"
                                    name="translation"
                                    label={t("Translation")}
                                    fullWidth
                                    value={editedData?.translation || ''}
                                    onChange={(e) => {
                                        setEditedData((prev: any) => ({ ...prev, translation: e.target.value }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    id="example"
                                    name="example"
                                    label={t("Example")}
                                    fullWidth
                                    value={editedData?.example || ''}
                                    onChange={(e) => {
                                        setEditedData((prev: any) => ({ ...prev, example: e.target.value }));
                                    }}
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
                            <Button variant='contained' type='submit' onClick={() => handleUpdateVocabulary(editedData)}>
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
                    <DialogContentText variant='body2' id='delete-description' sx={{ textAlign: 'center', mb: 7 }}>
                        {t('Are you sure you want to delete these items?')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                        gap: 2,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
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
