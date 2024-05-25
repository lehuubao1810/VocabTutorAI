// ** React Imports
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';

// ** Third Party Components
import AxiosInstance from 'src/configs/axios';

// ** Custom Table Components Imports
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import adminPathName from 'src/configs/endpoints/admin';
import { CharacterAIType } from 'src/context/types';
import CardInfluencerEssay from './characterCard';
import TableHeader from 'src/views/apps/manageCharactersAI/TableHeader';
import AddDrawer from 'src/views/apps/manageCharactersAI/AddUserDrawer';
import { Icon } from '@iconify/react';


export default function ManageCharactersAI() {
  const { t } = useTranslation();
  const [data, setData] = useState<CharacterAIType[]>([]);
  const [characterAI, setCharacterAI] = useState<CharacterAIType[]>([]);
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)


  const [value, setValue] = useState<string>('')

  const handleFilter = useCallback((val: string) => {
    const temp = [...data]
    setValue(val);
    if (val === "") {
      setCharacterAI(temp);
    } else {
      const filteredData = temp.filter((character: CharacterAIType) => {
        const name = character.name.toLowerCase();
        const result = name.includes(val.toLowerCase())

        return result
      });
      setCharacterAI(filteredData);
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(`${adminPathName.getCharacters}`);
      setCharacterAI(response.data.characters);
      setData(response.data.characters)
    } catch (error: any) {
      if (error && error.response) {
        toast.error(error.response.data.message)
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAddDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <>
      <Paper>
        <TableHeader
          value={value}
          handleFilter={handleFilter}
          toggleAdd={toggleAddDrawer}
        />
      </Paper>
      {characterAI.length > 0 ? (
        <Grid container spacing={3}>
          {characterAI.map((characterAI) => (
            <Grid item key={characterAI._id} xs={12} sm={3} md={3}>
              <CardInfluencerEssay
                characterAI={characterAI}
                fetchData={fetchData}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 3 }}>
          {t('No characterAI available')}
        </Typography>
      )}
      <AddDrawer open={addUserOpen} toggleAdd={toggleAddDrawer} fetchData={fetchData} data={data} />
    </>
  );
}
