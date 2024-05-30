import React, { useEffect } from "react";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getListOfCollections } from "../redux/collectionSlice";
import { scrollTop } from "../utils/scrollTop";
import CollectionItem from "../components/Collection/CollectionItem";
import { Skeleton } from "@mui/material";
import { faWpexplorer } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Quote from "../components/main/Quote";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

type Props = {
  //
};

export const Explore: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { collections, loading } = useAppSelector(
    (state) => state.collectionReducer
  );

  useEffect(() => {
    scrollTop();
    dispatch(getListOfCollections());
  }, []);

  // isAdmin === false && isPublish === true
  const collectionExplore = collections.filter(
    (item) => !item.isAdmin && item.isPublish
  );

  return (
    <>
      <Header />
      <main className="bg-slate-100 min-h-screen">
        <div className="pt-20 ml-auto mr-auto max-w-screen-xl px-5 py-4">
          <div className="py-6">
            <h1 className="text-4xl font-bold text-blue-500 mb-6">
              <FontAwesomeIcon icon={faBookOpenReader} /> Quote
            </h1>
            <Quote />
          </div>
          <div className="py-6">
            <h1 className="text-4xl font-bold text-blue-500 mb-4">
              <FontAwesomeIcon icon={faWpexplorer} /> Explore Collections
            </h1>
            {loading ? (
              <div className="relative z-0 grid grid-cols-4 gap-4 my-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                <Skeleton variant="rounded" width={"100%"} height={140} />
                <Skeleton variant="rounded" width={"100%"} height={140} />
                <Skeleton variant="rounded" width={"100%"} height={140} />
                <Skeleton variant="rounded" width={"100%"} height={140} />
                <Skeleton variant="rounded" width={"100%"} height={140} />
                <Skeleton variant="rounded" width={"100%"} height={140} />
                <Skeleton variant="rounded" width={"100%"} height={140} />
                <Skeleton variant="rounded" width={"100%"} height={140} />
              </div>
            ) : collectionExplore.length === 0 ? (
              <div className="flex justify-center items-center h-80">
                <h1 className="text-2xl font-semibold">No collection found</h1>
              </div>
            ) : (
              <div className="relative z-0 grid grid-cols-4 gap-4 my-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {collectionExplore.map((item) => (
                  <CollectionItem
                    key={item.id}
                    name={item.name}
                    desc={item.desc}
                    value={item.value}
                    collectionID={item.id}
                    vocabulary={item.vocabulary}
                    isAdmin={item.isAdmin}
                    uid={item.uid}
                    isPublish={item.isPublish}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
