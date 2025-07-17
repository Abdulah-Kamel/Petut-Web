import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6pr6a6y63LvKpauCkonCqyV66WAeJEeg",
  authDomain: "petut-55f40.firebaseapp.com",
  projectId: "petut-55f40",
  storageBucket: "petut-55f40.firebasestorage.app",
  messagingSenderId: "724593819082",
  appId: "1:724593819082:web:7d5ab9881bc9de39c8a333",
  measurementId: "G-JDSBQXNWX0",
};

const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// Firestore cart utility functions

/**
 * Get the cart for a user from Firestore (now at /users/{uid}/cart).
 * @param {string} uid - User ID
 * @returns {Promise<Object|null>} Cart object or null if not found
 */
export async function getUserCart(uid) {
  const cartRef = doc(db, "users", uid, "cart", "cart");
  const cartSnap = await getDoc(cartRef);
  return cartSnap.exists() ? cartSnap.data() : null;
}

/**
 * Set (create/update) the cart for a user in Firestore (now at /users/{uid}/cart).
 * @param {string} uid - User ID
 * @param {Object} cart - Cart object
 * @returns {Promise<void>}
 */
export async function setUserCart(uid, cart) {
  const cartRef = doc(db, "users", uid, "cart", "cart");
  await setDoc(cartRef, cart);
}

/**
 * Delete the cart for a user in Firestore (now at /users/{uid}/cart).
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
export async function deleteUserCart(uid) {
  const cartRef = doc(db, "users", uid, "cart", "cart");
  await deleteDoc(cartRef);
}

/**
 * Place a new order for a user (adds to /users/{uid}/orders).
 * @param {string} uid - User ID
 * @param {Object} orderData - Order data (deliveryInfo, cart, status, etc.)
 * @returns {Promise<string>} The new order's ID
 */
export async function placeOrder(uid, orderData) {
  const ordersRef = collection(db, "users", uid, "orders");
  const docRef = await addDoc(ordersRef, orderData);
  return docRef.id;
}

/**
 * Get all orders for a user from Firestore (/users/{uid}/orders).
 * @param {string} uid - User ID
 * @returns {Promise<Array>} Array of order objects (with id)
 */
export async function getUserOrders(uid) {
  const ordersRef = collection(db, "users", uid, "orders");
  const querySnapshot = await getDocs(ordersRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Update the status of a specific order for a user.
 * @param {string} uid - User ID
 * @param {string} orderId - Order document ID
 * @param {string} status - New status
 * @returns {Promise<void>}
 */
export async function updateOrderStatus(uid, orderId, status) {
  const orderRef = doc(db, "users", uid, "orders", orderId);
  await updateDoc(orderRef, { status });
}
