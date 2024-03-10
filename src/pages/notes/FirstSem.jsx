import Leftbar from "../../components/Leftbar";
import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
function FirstSem() {
  const query = collection(db, "csenotes/firstsem/subs");
  const [docs, loading, error] = useCollectionData(query);
  console.log(docs);
  return (
    <div className="flex items-start justify-center  p-3">
      <Leftbar />
      <div></div>
    </div>
  );
}

export default FirstSem;
