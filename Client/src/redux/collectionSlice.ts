import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "./store";
// import { AxiosError } from "axios";
import { ErrorResponse } from "../type/ErrorResponse";
import {
  CollectionItemData,
  CollectionItemUpload,
  VocabularyItem,
  VocabularyItemUpload,
} from "../type/Collection";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

type collectionState = {
  collections: CollectionItemData[]; // type of the main data
  collection: CollectionItemData;
  loading: boolean;
  error: string | undefined;
};

const initialState: collectionState = {
  collections: [],
  collection: {} as CollectionItemData,
  loading: false,
  error: undefined,
};

const getVocabularyDetails = async (
  vocabIds: string[]
): Promise<VocabularyItem[]> => {
  const vocabPromises = vocabIds.map(async (vocabId) => {
    const vocabDoc = await getDoc(doc(db, "vocabularies", vocabId));
    if (vocabDoc.exists()) {
      return { id: vocabId, ...vocabDoc.data() } as VocabularyItem;
    } else {
      throw new Error(`Vocabulary with id ${vocabId} does not exist`);
    }
  });

  return Promise.all(vocabPromises);
};

export const getCollectionById = createAsyncThunk(
  "getCollection/collection",
  async (id: string, { rejectWithValue }) => {
    try {
      const collectionRef = doc(db, "collections", id);
      const collectionSnapshot = await getDoc(collectionRef);

      if (!collectionSnapshot.exists()) {
        throw new Error("Collection does not exist");
      }

      const collectionData = collectionSnapshot.data();
      console.log("collection data", collectionData);
      const vocabularyDetails = await getVocabularyDetails(
        collectionData.vocabulary
      );

      const collectionD: CollectionItemData =
        collectionData as CollectionItemData;
      return {
        ...collectionD,
        vocabulary: vocabularyDetails,
      };
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue(errorMessage.message);
    }
  }
);

export const getListOfCollections = createAsyncThunk(
  "getList/collection",
  async (_, { rejectWithValue }) => {
    try {
      const collectionRef = collection(db, "collections");
      const collectionSnapshot: QuerySnapshot = await getDocs(collectionRef);
      const collections: CollectionItemData[] = [];

      collectionSnapshot.forEach((doc) => {
        collections.push({ id: doc.id, ...doc.data() } as CollectionItemData);
      });
      console.log("collections", collections);
      return collections;
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue(errorMessage.message);
    }
  }
);

export const addCollection = createAsyncThunk(
  "addCollection/collection",
  async (
    data: {
      collection: CollectionItemUpload;
      vocabularies: VocabularyItemUpload[];
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const collectionRef = collection(db, "collections");
      const docRef = await addDoc(collectionRef, data.collection).then((doc) => {
        dispatch(addVocabulariesToCollection({ vocabularies: data.vocabularies, collectionId: doc.id }));
      })
      console.log("docRef", docRef);

      return docRef;
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue(errorMessage);
    }
  }
);

export const addVocabulariesToCollection = createAsyncThunk(
  "addToCollection/collection",
  async (
    data: { vocabularies: VocabularyItemUpload[]; collectionId: string },
    { rejectWithValue }
  ) => {
    try {
      //
      const vocabulariesRef = collection(db, "vocabularies");
      const newVocabIds: string[] = [];

      for (const vocab of data.vocabularies) {
        const vocabDocRef: DocumentReference = await addDoc(
          vocabulariesRef,
          vocab
        );
        newVocabIds.push(vocabDocRef.id);
      }

      // Cập nhật collection để thêm các ID từ vựng mới
      const collectionRef = doc(db, "collections", data.collectionId);
      await updateDoc(collectionRef, {
        vocabulary: newVocabIds,
      });
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue(errorMessage.message);
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    // optional: add reducer functions
    setCollection: (state, action) => {
      // action type is inferred
      state.collection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // optional: add the thunk function to the reducer
      .addCase(getCollectionById.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.collection = action.payload;
      })
      .addCase(getListOfCollections.fulfilled, (state, action) => {
        // add this when you have fulfilled action
        state.collections = action.payload;
        console.log("get collections fulfilled", action.payload);
      })

      // the below code is for handling the loading and error state of the async thunk (default)
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("collection/pending"),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith("collection/fulfilled"),
        (state) => {
          state.loading = false;
          state.error = undefined;
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith("collection/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          console.log("rejected collection", action.payload);
        }
      );
  },
});

// export the action creators to be used in the components
export const { setCollection } = collectionSlice.actions;

// export the reducer to be used in the store
const collectionReducer = collectionSlice.reducer;
export default collectionReducer;
