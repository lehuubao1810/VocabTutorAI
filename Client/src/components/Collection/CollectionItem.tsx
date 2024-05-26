import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faEdit,
  faEnvelopeOpenText,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setCollection } from "../../redux/collectionSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ModalConfirm } from "../common/ModalConfirm";
import { Modal } from "../../type/Modal";
// import { useAppDispatch } from "../../redux/hooks";
// import { getCollectionById } from "../../redux/collectionSlice";

interface VocabularyItem {
  word: string;
  translation: string;
  mean: string;
  pronunciation: string;
  example: string;
}
interface CollectionItemProps {
  collectionID: string;
  name: string;
  desc: string;
  value: number;
  // date: string;
  isAdmin: boolean;
  vocabulary: VocabularyItem[];
  uid?: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  collectionID,
  name,
  desc,
  value,
  // date,
  vocabulary,
  isAdmin,
  uid,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const transferData = {
    id: collectionID,
    name: name,
    desc: desc,
    value: value,
    // date: date,
    vocabulary: vocabulary,
    isAdmin: isAdmin,
    uid: uid,
  };

  const [modal, setModal] = useState<Modal>({
    isOpen: false,
    title: "",
    content: "",
    onConfirm: () => {},
  });

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  const handleEditCollection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/collection/${transferData.id}/edit`);
  };

  const handleDeleteCollection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModal({
      isOpen: true,
      title: "Delete Collection",
      content: "Are you sure you want to delete this collection?",
      onConfirm: () => {
        // dispatch(deleteCollection(collectionID));
        console.log("Delete collection", collectionID);
        setModal({ ...modal, isOpen: false });
      },
    });
    // dispatch(deleteCollection(collectionID));
  };

  const handleShareCollection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModal({
      isOpen: true,
      title: "Share Collection",
      content: "Are you sure you want to share this collection?",
      onConfirm: () => {
        // dispatch(shareCollection(collectionID));
        console.log("Share collection", collectionID);
        setModal({ ...modal, isOpen: false });
      },
    });

    // dispatch(shareCollection(collectionID));
  };

  const handleClickCollection = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setCollection({}));
    navigate(`/collection/${collectionID}`);
  };

  return (
    <>
      <div onClick={(e) => handleClickCollection(e)} className="cursor-pointer">
        <div
          className="relative w-70 min-h-[140px] bg-white rounded-lg shadow-lg ease-linear z-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!transferData.isAdmin && transferData.uid === user.uid
            ? isHovered && (
                <div className="absolute top-1 right-1 z-10 flex ">
                  <button
                    type="button"
                    title="Edit"
                    className="text-gray-500 hover:text-gray-700 mr-2"
                    onClick={handleEditCollection}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    className="text-red-500 hover:text-red-700 mr-2"
                    onClick={handleDeleteCollection}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    type="button"
                    title="Share"
                    className="text-blue-500 hover:text-red-700"
                    onClick={handleShareCollection}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </div>
              )
            : null}
          <div className="flex flex-col mt-1 p-4 gap-2 min-h-[140px] justify-between">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{desc}</p>
            <div className="flex gap-2 max-lg:flex-col">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelopeOpenText} />
                <span className="">{value}</span>
                <span className="text-gray-500">word</span>
              </div>
              {/* <span className="max-lg:hidden">|</span> */}
              {/* <div className="flex items-center gap-2">
              <span className="text-gray-500">Last access:</span>
              <span className="">{date}</span>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm modal={modal} setModal={setModal} />
    </>
  );
};

export default CollectionItem;
