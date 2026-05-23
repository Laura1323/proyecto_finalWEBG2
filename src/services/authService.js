import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { DEFAULT_ROLE } from "../utils/constants";

export async function registerUser({ nombre, correo, password }) {
  const credential = await createUserWithEmailAndPassword(auth, correo, password);

  await updateProfile(credential.user, { displayName: nombre });

  const profile = {
    uid: credential.user.uid,
    nombre,
    correo,
    rol: DEFAULT_ROLE,
    fechaRegistro: serverTimestamp(),
  };

  await setDoc(doc(db, "users", credential.user.uid), profile);
  return { ...profile, fechaRegistro: new Date().toISOString() };
}

export async function loginUser({ correo, password }) {
  const credential = await signInWithEmailAndPassword(auth, correo, password);
  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() };
}
