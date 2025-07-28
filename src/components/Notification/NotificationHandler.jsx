import { useEffect } from "react";
import { messaging, getToken, onMessage } from "../../firebase";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
const vapidKey =
  "BJejSjl-UmNNovakxHCiW1znkKEgMMrOyIdFDewJkEFNCaM6t4fBKYGm8Ct_fWKGVQmMDJpSp-vEtgSXVgjLMck";


function NotificationHandler() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(" Service Worker Registered");

          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              getToken(messaging, {
                vapidKey,
                serviceWorkerRegistration: registration,
              })
                .then(async (currentToken) => {
                  if (currentToken) {
                    console.log("FCM Token:", currentToken);
                    if (auth.currentUser) {
                      const uid = auth.currentUser.uid;
                      await setDoc(
                        doc(db, "users", uid),
                        { fcmToken: currentToken },
                        { merge: true }
                      );
                      console.log(" تم حفظ التوكن في Firestore");
                    }
                  } else {
                    console.log("مفيش توكن.");
                  }
                })
                .catch((err) => {
                  console.error(" خطأ أثناء جلب التوكن:", err);
                });
            }
          });
        });
    }

    // استقبال الإشعارات أثناء فتح الموقع
    onMessage(messaging, (payload) => {
      console.log("📩 إشعار وصلك:", payload);
      alert(`${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);

  return null;
}

export default NotificationHandler;
