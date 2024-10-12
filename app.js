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
// دالة لتحديث نتائج المباراة
function updateMatchResult(matchId, result) {
    db.collection("matches").doc(matchId).update({
        result: result
    })
    .then(() => {
        console.log("تم تحديث نتيجة المباراة بنجاح");
        alert("تم تحديث نتيجة المباراة بنجاح!");
    })
    .catch((error) => {
        console.error("خطأ في تحديث نتيجة المباراة: ", error);
        alert("حدث خطأ أثناء تحديث نتيجة المباراة.");
    });
}

// التعامل مع تقديم النموذج
document.getElementById("results-form").addEventListener("submit", function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    const matchId = document.getElementById("matchId").value;
    const result = document.getElementById("result").value;
    updateMatchResult(matchId, result);
});
// دالة لعرض ترتيب الفرق
function displayStandings() {
    const standingsBody = document.getElementById("standings-body");
    standingsBody.innerHTML = ""; // تفريغ المحتوى السابق

    db.collection("teams").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const teamData = doc.data();
            const row = document.createElement("tr");
            row.innerHTML = `<td>${teamData.name}</td><td>${teamData.points}</td>`;
            standingsBody.appendChild(row);
        });
    }).catch((error) => {
        console.error("خطأ في جلب ترتيب الفرق: ", error);
    });
}

// استدعاء الدالة لعرض الترتيب عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    displayStandings();
});

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
