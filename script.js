// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9QXVUPhObbf0mWJ24pHDIVTzAjW4FjaQ",
  authDomain: "kuis-29a9b.firebaseapp.com",
  databaseURL: "https://kuis-29a9b-default-rtdb.firebaseio.com", // ← penting!
  projectId: "kuis-29a9b",
  storageBucket: "kuis-29a9b.firebasestorage.app",
  messagingSenderId: "879477573039",
  appId: "1:879477573039:web:e9368951ded947a8975b5a",
  measurementId: "G-THF6SH9210",
};
// Inisialisasi Firebase (versi compat)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fungsi simpan skor
function saveScore(name, score) {
  const timestamp = new Date().toISOString();

  database
    .ref("quizResults")
    .push({
      name: name,
      score: score,
      date: timestamp,
    })
    .then(() => {
      console.log("✅ Skor berhasil disimpan ke Firebase!");
    })
    .catch((error) => {
      console.error("❌ Gagal menyimpan skor:", error);
    });
}

// Get Element Name by Atomic Number
function getElementName(atomicNumber) {
  const elements = [
    "Hidrogen",
    "Helium",
    "Litium",
    "Berilium",
    "Boron",
    "Karbon",
    "Nitrogen",
    "Oksigen",
    "Fluor",
    "Neon",
    "Natrium",
    "Magnesium",
    "Aluminium",
    "Silikon",
    "Fosfor",
    "Sulfur",
    "Klor",
    "Argon",
    "Kalium",
    "Kalsium",
  ];
  return elements[atomicNumber - 1] || "Unsur Tidak Diketahui";
}

// Format Electron Configuration
function formatElectronConfig(shells) {
  return shells
    .map((electrons, index) => `${index + 1}${"KLMN"[index]}${electrons}`)
    .join(" ");
}

// Save Score to Firebase
function saveScore(name, score, quizName = "default") {
  if (typeof database !== "undefined") {
    const scoresRef = database.ref(`scores/${quizName}`);
    scoresRef.push({
      name: name,
      score: score,
      timestamp: new Date().toISOString(),
    });
  }
}

// Save Discussion to Firebase
function saveDiscussion(name, message) {
  if (typeof database !== "undefined") {
    const discussionsRef = database.ref("discussions");
    discussionsRef.push({
      name: name,
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}

// Load Discussions from Firebase
function loadDiscussions(callback) {
  if (typeof database !== "undefined") {
    const discussionsRef = database.ref("discussions");
    discussionsRef.orderByChild("timestamp").on("value", (snapshot) => {
      const discussions = [];
      snapshot.forEach((childSnapshot) => {
        discussions.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      callback(discussions);
    });
  }
}

// Generate Random Quiz Questions
function generateQuizQuestions() {
  return [
    {
      question: "Berapa jumlah maksimum elektron pada kulit K?",
      options: ["2", "8", "18", "32"],
      correct: 0,
    },
    {
      question: "Atom dengan nomor atom 11 memiliki konfigurasi elektron...",
      options: ["2K 8L 1M", "2K 9L", "2K 8L", "2K 7L 2M"],
      correct: 0,
    },
    {
      question: "Atom Cl dengan konfigurasi K2 L8 M7 terletak pada...",
      options: [
        "periode 4 dan golongan VIIA",
        "periode 3 dan golongan VIIA",
        "periode 7 dan golongan IVA",
        "periode 7 dan golongan VIIA",
      ],
      correct: 1,
    },
    {
      question: "Jumlah maksimum elektron pada kulit ke-3 adalah...",
      options: ["8", "18", "32", "2"],
      correct: 1,
    },
    {
      question: "Ion Cl⁻ memiliki konfigurasi elektron...",
      options: ["2K 8L 7M", "2K 8L 8M", "2K 7L 8M", "2K 8L"],
      correct: 1,
    },
    {
      question: "Magnesium (nomor atom 12) terletak pada...",
      options: [
        "Periode 3, Golongan IIA",
        "Periode 2, Golongan IIA",
        "Periode 3, Golongan IA",
        "Periode 2, Golongan IIB",
      ],
      correct: 0,
    },
    {
      question: "Elektron valensi adalah elektron yang terletak pada...",
      options: ["Kulit terluar", "Kulit terdalam", "Kulit K", "Semua kulit"],
      correct: 0,
    },
    {
      question: "Atom dengan konfigurasi 2K 8L 3M memiliki...",
      options: ["13 elektron", "8 elektron", "3 elektron", "2 elektron"],
      correct: 0,
    },
    {
      question: "Golongan alkali tanah terletak pada golongan...",
      options: ["IA", "IIA", "IIIA", "IVA"],
      correct: 1,
    },
    {
      question: "Periode suatu unsur ditentukan oleh...",
      options: [
        "Jumlah kulit elektron",
        "Jumlah elektron valensi",
        "Nomor massa",
        "Jumlah proton",
      ],
      correct: 0,
    },
  ];
}

// Initialize page animations
document.addEventListener("DOMContentLoaded", function () {
  // Add fade-in animation to elements
  const fadeElements = document.querySelectorAll(".animate-fade-in");
  fadeElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Utility function to show notifications
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  } text-white`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Export functions for global use
window.calculateElectronConfig = calculateElectronConfig;
window.getElementName = getElementName;
window.formatElectronConfig = formatElectronConfig;
window.saveScore = saveScore;
window.saveDiscussion = saveDiscussion;
window.loadDiscussions = loadDiscussions;
window.generateQuizQuestions = generateQuizQuestions;
window.showNotification = showNotification;
