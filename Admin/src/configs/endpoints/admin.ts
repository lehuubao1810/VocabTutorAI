const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export default {
  //Admin
  getCharacters: `${API_URL}/character/getCharacters`,
  createCharacterAI: `${API_URL}/character/createCharacter`,
  deleteUsers: `${API_URL}/user/deleteUsersFirebase`,
  deleteCharacterAI: `${API_URL}/character/deleteCharacter`,
  editCharacterAI: `${API_URL}/character/editCharacter`,
}
