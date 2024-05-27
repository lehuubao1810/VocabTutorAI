import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { CollectionItemData, VocabularyItem } from "../type/Collection";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCollectionById } from "../redux/collectionSlice";
import { scrollTop } from "../utils/scrollTop";
import { Skeleton, Switch } from "@mui/material";

export const EditCollection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { collection, loading } = useAppSelector(
    (state) => state.collectionReducer
  );

  const { idCollection } = useParams();
  console.log("idCollection", idCollection);

  useEffect(() => {
    scrollTop();
    dispatch(getCollectionById(idCollection ?? "")).then((res) => {
      const data = res.payload as CollectionItemData;
      setCollectionData(data);
      setNumWords(data.vocabulary.length);
    });
  }, []);

  const [numWords, setNumWords] = useState<number>(0);

  const [collectionData, setCollectionData] =
    useState<CollectionItemData>(collection);

  const handleNumWordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    setNumWords(num);
    setCollectionData({
      ...collectionData,
      vocabulary: Array.from(
        { length: num },
        (_, i) =>
          collectionData.vocabulary[i] || {
            word: "",
            translation: "",
            mean: "",
            pronunciation: "",
            example: "",
          }
      ),
    });
  };

  const handleVocabularyChange = (
    index: number,
    field: keyof VocabularyItem,
    value: string
  ) => {
    setCollectionData({
      ...collectionData,
      vocabulary: collectionData.vocabulary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  const handleSubmit = () => {
    console.log(collectionData);
    toast.success("Collection updated successfully!");
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <main className="bg-gray-100">
        <div className="pt-24 ml-auto mr-auto max-w-screen-xl px-5 py-4">
          <div className="flex flex-col gap-3 py-6 ">
            <h1 className="text-3xl font-bold text-blue-500">
              <FontAwesomeIcon icon={faFilePen} /> Edit Collection
            </h1>
            <p className="text-xl text-gray-500">
              This result will show by chart
            </p>
          </div>
          <div className=" ml-auto mr-auto w-full h-98 rounded-xl border-1 bg-white">
            <div className="px-5 py-5">
              <h2 className="mb-5 text-3xl font-bold text-center">
                Collection Information
              </h2>
              {loading || !collectionData.name ? (
                <div className="flex flex-col gap-4 px-5">
                  <div className="flex gap-4">
                    <h2 className="font-semibold text-lg">Name collection :</h2>
                    <Skeleton variant="rounded" width={"40%"} height={30} />
                  </div>
                  <div className="flex gap-4">
                    <h2 className="font-semibold text-lg">
                      Description of this collection :
                    </h2>
                    <Skeleton variant="rounded" width={"40%"} height={30} />
                  </div>
                  <div className="flex gap-4 items-center">
                    <h2 className="font-semibold text-lg">Publish :</h2>
                    <Skeleton variant="rounded" width={"10%"} height={30} />
                  </div>
                  <div className="flex gap-4">
                    <h2 className="font-semibold text-lg">Number of Words:</h2>
                    <Skeleton variant="rounded" width={"40%"} height={30} />
                  </div>
                  <p className="text-xl text-blue-500 font-bold pt-4">
                    Input Vocabulary part
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton variant="rounded" width={"100%"} height={140} />
                    <Skeleton variant="rounded" width={"100%"} height={140} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 px-5">
                  <div className="flex gap-4">
                    <h2 className="font-semibold text-lg">Name collection :</h2>
                    <input
                      placeholder="..."
                      type="text"
                      className="border-b-2 text-lg focus:border-blue-500 outline-none"
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
                      Description of this collection :
                    </h2>
                    <input
                      placeholder="..."
                      type="text"
                      className="border-b-2 text-lg focus:border-blue-500 outline-none"
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
                    <h2 className="font-semibold text-lg">Publish :</h2>
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
                  <div className="flex gap-4">
                    <h2 className="font-semibold text-lg">Number of Words:</h2>
                    <input
                      placeholder="..."
                      type="number"
                      min="0"
                      className="border-b-2 text-lg focus:border-blue-500 outline-none"
                      value={numWords}
                      onChange={handleNumWordsChange}
                    />
                  </div>
                  <p className="text-xl text-blue-500 font-bold pt-4">
                    Input Vocabulary part
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {collectionData.vocabulary.map((word, index) => (
                      <div
                        key={index}
                        className="relative flex flex-col gap-4 border-2 p-4 rounded-lg"
                      >
                        <div className="absolute top-3 right-3 flex items-center justify-center font-semibold w-10 h-10 rounded-full bg-gray-300">
                          {index + 1}
                        </div>
                        <div className="flex gap-4">
                          <h2 className="font-semibold text-base">Word:</h2>
                          <input
                            placeholder="..."
                            type="text"
                            className="border-b-2 text-base focus:border-blue-500 outline-none"
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
                            Translation:
                          </h2>
                          <input
                            placeholder="..."
                            type="text"
                            className="border-b-2 text-base focus:border-blue-500 outline-none"
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
                          <h2 className="font-semibold text-base">Example:</h2>
                          <input
                            placeholder="..."
                            type="text"
                            className="border-b-2 text-base focus:border-blue-500 outline-none"
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
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
