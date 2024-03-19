import Leftbar from "../components/Leftbar";
import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
function Bunkmate() {
  const [documents, setDocuments] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [Totalclasses, setTotalClasses] = useState();
  const [attendedClasses, setAttendedClasses] = useState();
  useEffect(() => {
    const fetchSubjectInfo = async () => {
      try {
        const uid = localStorage.getItem("uid");
        const subjectsQuery = query(
          collection(db, "bunkmate", uid, "subjects")
        );

        const unsubscribe = onSnapshot(subjectsQuery, (snapshot) => {
          const subjectData = [];
          snapshot.forEach((doc) => {
            subjectData.push({ id: doc.id, ...doc.data() });
          });
          setDocuments(subjectData);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchSubjectInfo();
  }, []);

  const handleYesClick = async (subjectId) => {
    const uid = localStorage.getItem("uid");
    try {
      const subRef = doc(db, "bunkmate", uid, "subjects", subjectId);
      await updateDoc(subRef, {
        totalclasses:
          documents.find((subject) => subject.id === subjectId).totalclasses +
          1,
        classesattended:
          documents.find((subject) => subject.id === subjectId)
            .classesattended + 1,
      });
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };
  const handleNoClick = async (subjectId) => {
    const uid = localStorage.getItem("uid");
    try {
      const subRef = doc(db, "bunkmate", uid, "subjects", subjectId);
      await updateDoc(subRef, {
        totalclasses:
          documents.find((subject) => subject.id === subjectId).totalclasses +
          1,
      });
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };
  // subjectName = subjectId
  const handleAddSubject = async (subjectId) => {
    const uid = localStorage.getItem("uid");
    try {
      const subRef = doc(db, "bunkmate", uid, "subjects", subjectId);
      await setDoc(subRef, {
        totalclasses: +Totalclasses,
        classesattended: +attendedClasses,
      });
      setSubjectName("");
      setToggleModal(!toggleModal);
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };
  const handleDeleteSubject = async (subjectId) => {
    const uid = localStorage.getItem("uid");
    const result = confirm("Are You Sure You Want To Delete", subjectId, " ?");
    try {
      if (result) {
        const subRef = doc(db, "bunkmate", uid, "subjects", subjectId);
        await deleteDoc(subRef);
        console.log("Document successfully deleted!");
      } else {
        return;
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };
  const handleBunkTip = (totalNoOfclasses, classesattended) => {
    const remainingClassesToBunk = showBunkTip(
      totalNoOfclasses,
      classesattended
    );
    if (remainingClassesToBunk > 0) {
      toast(`You Can Still Bunk ${remainingClassesToBunk} Classes`);
    } else {
      toast.error("Attendance is less than 75%");
    }
  };
  const showBunkTip = (totalNoOfclasses, classesattended) => {
    console.log(totalNoOfclasses, classesattended);
    let remainingClassesToBunk = 0;
    let attendancePercentage = (classesattended / totalNoOfclasses) * 100;

    while (attendancePercentage > 75 && classesattended > 0) {
      classesattended--;
      remainingClassesToBunk++;
      attendancePercentage = (classesattended / totalNoOfclasses) * 100;
    }

    console.log(remainingClassesToBunk);
    return remainingClassesToBunk;
  };

  return (
    <>
      <div className="flex items-start justify-center gap-[5rem] p-3">
        <Leftbar />
        <div>
          <div className="flex items-center justify-start gap-10 pt-10">
            <button
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setToggleModal(!toggleModal)}
            >
              Add Subject
            </button>
            {/* <button className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Delete Subject
            </button> */}
          </div>
          <section className="bg-white dark:bg-dark py-10 lg:pb-[120px]">
            <div className="container">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full ">
                  <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead className="text-center bg-primary ">
                        <tr className="bg-[#3758f9]">
                          <th className="w-1/6 min-w-[160px] text-white border-l border-transparent py-4 px-3 text-lg font-medium  lg:py-7 lg:px-4">
                            Subjects
                          </th>
                          <th className="w-1/6 min-w-[160px] text-white border-l border-transparent py-4 px-3 text-lg font-medium  lg:py-7 lg:px-4">
                            Attended Today ?
                          </th>
                          <th className="w-1/6 min-w-[160px] text-white border-l border-transparent py-4 px-3 text-lg font-medium  lg:py-7 lg:px-4">
                            No. of classes attended
                          </th>
                          <th className="w-1/6 min-w-[160px] text-white border-l border-transparent py-4 px-3 text-lg font-medium  lg:py-7 lg:px-4">
                            Total no. of classes
                          </th>
                          <th className="w-1/6 min-w-[160px] text-white border-l border-transparent py-4 px-3 text-lg font-medium  lg:py-7 lg:px-4">
                            Attendence percentage
                          </th>
                          {/* <th className="w-1/6 min-w-[160px] text-white border-l border-transparent py-4 px-3 text-lg font-medium  lg:py-7 lg:px-4">
                            Register
                          </th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {documents.map((doc) => (
                          <tr key={doc.id}>
                            <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                              {doc.id}
                            </td>
                            <td className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium ">
                              <button
                                className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7  text-center text-base font-medium inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary active:bg-[#5cb85c] active:text-white transition-colors"
                                onClick={() => handleYesClick(doc.id)}
                              >
                                Yes
                              </button>
                              <button
                                className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7  text-center text-base font-medium inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary ml-2 active:bg-[#ff0000]  active:text-white transition-colors"
                                onClick={() => handleNoClick(doc.id)}
                              >
                                No
                              </button>
                            </td>
                            <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                              {doc.classesattended}
                            </td>
                            <td className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium ">
                              {doc.totalclasses}
                            </td>
                            <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                              {(
                                (doc.classesattended / doc.totalclasses) *
                                100
                              ).toFixed(2)}
                              %
                            </td>
                            <td className="text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium cursor-pointer flex flex-col gap-1">
                              <span
                                className="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary  font-medium active:bg-[#3758f9]  active:text-white transition-colors"
                                onClick={() => handleDeleteSubject(doc.id)}
                              >
                                Delete Subject
                              </span>
                              <span
                                className="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary  font-medium active:bg-[#3758f9]  active:text-white transition-colors"
                                onClick={() =>
                                  handleBunkTip(
                                    doc.totalclasses,
                                    doc.classesattended
                                  )
                                }
                              >
                                Bunk Tip
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <div className="w-full h-screen bg-transparent flex items-center justify-center  absolute top-0 left-0">
            <div className=" mx-auto my-0 w-[30rem] bg-gray-300 h-[30rem]">
              <div>
                <h1>Add Subject</h1>
              </div>
              <h1>Enter Subject Name</h1>
              <input type="text" />
              <h1>Enter Total Classes Done So Far</h1>
              <input type="text" />
              <h1>Enter Classes Attended So Far </h1>
              <input type="text" />
            </div>
          </div> */}
          {toggleModal && (
            <div
              id="authentication-modal"
              aria-hidden="true"
              className=" overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/30"
            >
              <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                  <div className="flex justify-end p-2">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-toggle="authentication-modal"
                      onClick={() => setToggleModal(!toggleModal)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <form
                    className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
                    action="#"
                  >
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      Add Subjects
                    </h3>
                    <div>
                      <label
                        htmlFor="subjectname"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                      >
                        Enter Subject Name
                      </label>
                      <input
                        type="subjectname"
                        name="subjectname"
                        id="subjectname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 uppercase block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="ex : DBMS"
                        onChange={(e) =>
                          setSubjectName(e.target.value.toUpperCase())
                        }
                        value={subjectName}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="number"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                      >
                        Enter Total Classes Done So Far
                      </label>
                      <input
                        type="number"
                        name="number"
                        id="number"
                        min="0"
                        max="100"
                        placeholder="ex : 10"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                        value={Totalclasses}
                        onChange={(e) => setTotalClasses(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                      >
                        Enter Total Classes Attended So Far
                      </label>
                      <input
                        type="number"
                        name="number"
                        id="number"
                        min="0"
                        max="100"
                        placeholder="ex : 5"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required=""
                        value={attendedClasses}
                        onChange={(e) => setAttendedClasses(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleAddSubject(subjectName)}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Bunkmate;
