import React from "react";
import CollectionItem from "./CollectionItem";
// import { dummyData } from "../../dataTest/dataVocab";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Skeleton } from "@mui/material";

type CollectionProps = {
  //
};

export const CollectionList: React.FC<CollectionProps> = () => {
  const { collections, loading } = useAppSelector(
    (state) => state.collectionReducer
  );
  const { user } = useAppSelector((state) => state.authReducer);

  const collectionAdmin = collections.filter((item) => item.isAdmin);
  // collection user is not admin and have uid === user.uid
  const collectionUser = collections.filter(
    (item) => !item.isAdmin && item.uid === user.uid
  );

  // const data = dummyData;
  const Navigate = useNavigate();
  const HandleAddCollection = () => {
    Navigate(`/add-collection`);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1>
          <Link
            to="#!"
            className="text-3xl font-semibold"
          >
            Your Collection
          </Link>
        </h1>
        <button
          onClick={HandleAddCollection}
          className="w-60 border-2 rounded-lg bg-blue-400 text-white 
						font-medium py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 
						focus:ring-blue-600 focus:ring-opacity-75
						max-sm:w-40"
        >
          Add Collection
        </button>
      </div>
      {/* Collection list */}
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
      ) : collectionUser.length === 0 ? (
        <div className="flex justify-center items-center h-80">
          <h1 className="text-2xl font-semibold">No collection found</h1>
        </div>
      ) : (
        <div className="relative z-0 grid grid-cols-4 gap-4 my-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {collectionUser.map((item) => (
            <CollectionItem
              key={item.name}
              name={item.name}
              desc={item.desc}
              value={item.value}
              // date={item.date}
              collectionID={item.id}
              vocabulary={item.vocabulary}
              isAdmin={item.isAdmin}
            />
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1>
          <Link
            to="#!"
            className="text-3xl font-semibold"
          >
            Collection
          </Link>
        </h1>
      </div>
      {/* Collection list */}
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
      ) : collectionAdmin.length === 0 ? (
        <div className="flex justify-center items-center h-80">
          <h1 className="text-2xl font-semibold">No collection found</h1>
        </div>
      ) : (
        <div className="relative z-0 grid grid-cols-4 gap-4 my-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {collectionAdmin.map(
            (item) =>
              item.isPublish && (
                <CollectionItem
                  key={item.name}
                  name={item.name}
                  desc={item.desc}
                  value={item.value}
                  // date={item.date}
                  collectionID={item.id}
                  vocabulary={item.vocabulary}
                  isAdmin={item.isAdmin}
                />
              )
          )}
        </div>
      )}
    </>
  );
};
