import React, { useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faSquarePlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { CollectionItemUpload, VocabularyItemUpload } from "../type/Collection";
import { toast, ToastContainer } from "react-toastify";
import { scrollTop } from "../utils/scrollTop";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addCollection } from "../redux/collectionSlice";
import { Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  // type ....
};

export const AddCollection: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  //   const [numWords, setNumWords] = useState<number>(0);
  const [collectionData, setCollectionData] = useState<CollectionItemUpload>({
    name: "",
    desc: "",
    value: 0,
    vocabulary: [],
    isAdmin: false,
    isPublish: false,
    uid: user.uid,
  });
  const [vocabularies, setVocabularies] = useState<VocabularyItemUpload[]>([]);

  const navigate = useNavigate();

  const handleVocabularyChange = (
    index: number,
    field: keyof VocabularyItemUpload,
    value: string
  ) => {
    const newVocabularies = vocabularies.map((word, i) =>
      i === index ? { ...word, [field]: value } : word
    );
    setVocabularies(newVocabularies);
  };

  const handleAddVocabulary = () => {
    setVocabularies([
      ...vocabularies,
      { word: "", translation: "", mean: "", pronunciation: "", example: "" },
    ]);
    setCollectionData({ ...collectionData, value: vocabularies.length + 1 });
  };

  const handleRemoveVocabulary = (index: number) => {
    const newVocabularies = vocabularies.filter((_, i) => i !== index);
    setVocabularies(newVocabularies);
    setCollectionData({ ...collectionData, value: newVocabularies.length });
  };

  const handleSubmit = async () => {
    try {
      // check empty vocab field required
      const emptyVocabField = vocabularies.find(
        (word) => word.word.trim() === "" || word.translation.trim() === ""
      );

      // check empty collection field required
      const emptyCollectionField =
        collectionData.name.trim() === "" || collectionData.desc.trim() === "";

      //
      if (emptyVocabField || emptyCollectionField) {
        toast.error("Please fill in all required fields.");
        return;
      }

      // check have at least 2 vocabulary
      const lessThanTwoVocab = vocabularies.length < 2;
      if (lessThanTwoVocab) {
        toast.error("Please add at least 2 vocabularies.");
        return;
      }

      await dispatch(
        addCollection({ collection: collectionData, vocabularies })
      )
        .unwrap()
        .then(() => {
          toast.success("Collection created successfully!");
        })
        .then(() => {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    } catch (error) {
      toast.error("Failed to create collection.");
    }
  };

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="bg-gray-100">
        <div className="pt-24 ml-auto mr-auto max-w-screen-xl py-4 px-5">
          <div className="flex flex-col gap-3 py-6">
            <h1 className="text-3xl font-bold text-blue-500">
              <FontAwesomeIcon icon={faFolder} /> Add Collection
            </h1>
            <p className="text-xl text-gray-500">
              This result will show by chart
            </p>
          </div>
          <div className="ml-auto mr-auto h-98 rounded-xl border-1 bg-white">
            <div className="px-5 py-5">
              <h2 className="mb-5 text-blue-500 text-3xl font-bold text-center">
                Collection Information
              </h2>
              <div className="flex flex-col gap-4 px-5">
                <div className="flex gap-4">
                  <h2 className="font-semibold text-lg">
                    Name collection: <span className="text-red-500">*</span>
                  </h2>
                  <input
                    placeholder="Restaurant"
                    type="text"
                    className="border-b-2 text-lg focus:border-blue-500 outline-none w-1/3"
                    value={collectionData.name}
                    onChange={(e) =>
                      setCollectionData({
                        ...collectionData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <h2 className="font-semibold text-lg">
                    Description of this collection:{" "}
                    <span className="text-red-500">*</span>
                  </h2>
                  <input
                    placeholder="This is a collection of Restaurant-related vocabulary"
                    type="text"
                    className="border-b-2 text-lg focus:border-blue-500 outline-none w-2/3"
                    value={collectionData.desc}
                    onChange={(e) =>
                      setCollectionData({
                        ...collectionData,
                        desc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <h2 className="font-semibold text-lg">Publish:</h2>
                  <div>
                    <Switch
                      checked={collectionData.isPublish}
                      onChange={(e) =>
                        setCollectionData({
                          ...collectionData,
                          isPublish: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>

                <p className="ml-4 text-2xl text-blue-500 pt-4">
                  Input Vocabulary part
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {vocabularies.map((word, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col gap-4 border-2 p-4 rounded-lg"
                    >
                      <div className="absolute top-3 right-3 flex items-center justify-center font-semibold w-10 h-10 rounded-full bg-gray-300">
                        {index + 1}
                      </div>
                      <div
                        onClick={() => handleRemoveVocabulary(index)}
                        className="absolute bottom-3 right-6 text-red-400 cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                      <div className="flex gap-4">
                        <h2 className="font-semibold text-base">
                          Word: <span className="text-red-500">*</span>
                        </h2>
                        <input
                          placeholder="Menu"
                          type="text"
                          className="border-b-2 text-base focus:border-blue-500 outline-none w-2/3"
                          value={word.word}
                          onChange={(e) =>
                            handleVocabularyChange(
                              index,
                              "word",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex gap-4">
                        <h2 className="font-semibold text-base">
                          Translation: <span className="text-red-500">*</span>
                        </h2>
                        <input
                          placeholder="Thực đơn"
                          type="text"
                          className="border-b-2 text-base focus:border-blue-500 outline-none w-2/3"
                          value={word.translation}
                          onChange={(e) =>
                            handleVocabularyChange(
                              index,
                              "translation",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex gap-4">
                        <h2 className="font-semibold text-base">Mean:</h2>
                        <input
                          placeholder="A list of dishes available in a restaurant"
                          type="text"
                          className="border-b-2 text-base focus:border-blue-500 outline-none w-2/3"
                          value={word.mean}
                          onChange={(e) =>
                            handleVocabularyChange(
                              index,
                              "mean",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex gap-4">
                        <h2 className="font-semibold text-base">
                          Pronunciation:
                        </h2>
                        <input
                          placeholder="ˈmɛnjuː"
                          type="text"
                          className="border-b-2 text-base focus:border-blue-500 outline-none w-2/3"
                          value={word.pronunciation}
                          onChange={(e) =>
                            handleVocabularyChange(
                              index,
                              "pronunciation",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex gap-4">
                        <h2 className="font-semibold text-base">Example:</h2>
                        <input
                          placeholder="Please take a look at our menu before ordering"
                          type="text"
                          className="border-b-2 text-base focus:border-blue-500 outline-none w-2/3"
                          value={word.example}
                          onChange={(e) =>
                            handleVocabularyChange(
                              index,
                              "example",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddVocabulary}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Add More Vocabulary
                </button>
                <div className="flex justify-end mt-4 gap-4">
                  <button
                    onClick={handleSubmit}
                    className="flex gap-3 items-center px-10 py-4 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faSquarePlus} />
                    Add Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
