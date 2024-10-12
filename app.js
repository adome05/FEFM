// إعداد Firebase
// استبدل القيم بـ إعدادات مشروع Firebase الخاص بك
const firebaseConfig = {
    apiKey: "AIzaSyCySgQvLSJM9y-ltBlBY0H4h8yOCHHJJos",
    authDomain: "fefm-1100f.firebaseapp.com",
    projectId: "fefm-1100f",
    storageBucket: "fefm-1100f.appspot.com",
    messagingSenderId: "731902423927",
    appId: "1:731902423927:web:bea2461acafebc1a24e772"
};

// تهيئة Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // الاتصال بقاعدة البيانات Firestore

// مثال لإضافة مباراة جديدة إلى Firestore
function addMatch(team1, team2, date) {
    db.collection("matches").add({
        team1: team1,
        team2: team2,
        date: date,
        result: "Not Played" // النتيجة الافتراضية
    })
    .then((docRef) => {
        console.log("تم إضافة المباراة بنجاح، معرف المباراة: ", docRef.id);
    })
    .catch((error) => {
        console.error("خطأ في إضافة المباراة: ", error);
    });
}

// استخدام الدالة لإضافة مباراة
addMatch("فريق أ", "فريق ب", "2024-10-12");
