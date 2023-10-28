import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  ref,
  push,
  update,
  remove,
} from "firebase/database";
import { firebaseConfig } from "../constants/constants";
import { userStore } from "./user-store";
import { studentStore } from "./student-store";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

onAuthStateChanged(auth, function (user) {
  if (user) {
    userStore.login(user);
  } else {
    userStore.logout();
  }
  database.getStudents();
});

export const database = {
  login({ email, password, isNewUser }) {
    if (isNewUser) {
      return this.register(email, password);
    } else {
      return this.signIn(email, password);
    }
  },

  register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(`User ${userCredential.user.uid} logged in`);
      })
      .catch((error) => {
        throw error;
      });
  },

  signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(`User ${userCredential.user.uid} logged in`);
        // ...
      })
      .catch((error) => {
        throw error;
      });
  },

  logout() {
    signOut(auth)
      .then(() => console.log("sign out successfull"))
      .catch((error) => console.log(error));
  },

  getStudents() {
    const userId = userStore.userUid;
    studentStore.setStudents({});

    if (!userId) {
      return;
    }

    get(child(ref(db, "users/" + userId), "students"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          studentStore.setStudents(snapshot.val());
        } else {
          console.log("No data available");
          studentStore.setStudents({});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  editStudent(studentId, student) {
    const userId = userStore.userUid;
    const updates = {};
    updates["/students/" + studentId] = student;
    update(ref(db, "users/" + userId), updates).then(() =>
      studentStore.editStudent(studentId, student)
    );
  },

  deleteStudent(studentId) {
    const userId = userStore.userUid;
    remove(ref(db, `users/${userId}/students/${studentId}`)).then(() =>
      studentStore.deleteStudent(studentId)
    );
  },

  addStudent(student) {
    const userId = userStore.userUid;
    const newStudentKey = push(
      child(ref(db, "users/" + userId), "students")
    ).key;
    const updates = {};
    updates["/students/" + newStudentKey] = student;
    return update(ref(db, "users/" + userId), updates).then(() =>
      studentStore.addStudent(newStudentKey, student)
    );
  },
};
