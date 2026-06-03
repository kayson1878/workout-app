import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7PK-jJrIMzmdHagX3Ob3ElC11siEACdA",
    authDomain: "myfit-dcf71.firebaseapp.com",
    projectId: "myfit-dcf71",
    storageBucket: "myfit-dcf71.firebasestorage.app",
    messagingSenderId: "743243929684",
    appId: "1:743243929684:web:a754622513177c744975c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const workoutName = document.querySelector("h1").innerText.replace("\n", " ");
const exercises = [...document.querySelectorAll(".excersise-name")].map(e => e.innerText);

console.log("Workout name:", workoutName);
console.log("Exercises found:", exercises.length);

const doneButton = document.querySelector(".done-button");
doneButton.addEventListener("click", async function(e) {
    e.preventDefault();
    console.log("Done clicked");

    try {
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        console.log("Today:", today);

        const ref = doc(db, "workouts_gabriel", today);
        console.log("Getting doc...");
        const existing = await getDoc(ref);
        console.log("Got doc, exists:", existing.exists());
        let history = existing.exists() ? existing.data().sessions : [];

        history.push({ workout: workoutName, exercises: exercises });

        console.log("Saving...");
        await setDoc(ref, { sessions: history });
        console.log("Saved!");

        window.location.href = "../../history-page-gabriel.html";
    } catch (error) {
        console.error("Error:", error);
    }
});
