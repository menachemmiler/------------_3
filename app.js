"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const tableData = document.querySelector(".tableData");
const btnSearchPlayer = document.querySelector("#btnSearchPlayer");
const towRange = document.querySelector("#towRange");
const threeRange = document.querySelector("#threeRange");
const pointsRange = document.querySelector("#pointsRange");
const towSpan = document.querySelector("#towSpan");
const threeSpan = document.querySelector("#threeSpan");
const pointsSpan = document.querySelector("#pointsSpan");
;
towRange.addEventListener("change", (e) => {
    towSpan.textContent = towRange.value;
});
//רשימה של כל ההצעות שמתאימות לחיפוש
const listOfOfer = [];
//מילון של כל מי שנבחר לקבוצה
const selectedDictionary = {
    "PG": { playerName: "", position: "PG", twoPercent: -1, threePercent: -1, points: -1 },
    "SG": { playerName: "", position: "PG", twoPercent: -1, threePercent: -1, points: -1 },
    "SP": { playerName: "", position: "PG", twoPercent: -1, threePercent: -1, points: -1 },
    "PF": { playerName: "", position: "PG", twoPercent: -1, threePercent: -1, points: -1 },
    "C": { playerName: "", position: "PG", twoPercent: -1, threePercent: -1, points: -1 }
};
console.log(selectedDictionary);
//פונקצייה שמקבלת אובייקט של שחקן ומוסיפה אותו לרשימת ההצעות
const addOfer = (player) => {
    listOfOfer.push(player);
    //ומפעילה פונקצייה שעוברת על כל ההצעות ומציגה אותם בטבלה
};
btnSearchPlayer.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
}));
//פונקצייה שמקבלת מזהה של שחקן ומעבירה אותו מרשימת ההצעות למילון של הבחירות לפי התפקיד שלו
const selectPlayer = (id) => {
    const player = listOfOfer.find(player => player._id === id);
    if (player === undefined) {
        alert("שגיאה");
        return;
    }
    ;
    selectedDictionary[player.position] = player;
    //כאן צריך להפעיל פונקצייה שמנקה את הדיב של הבחירות ועוברת מחדש על המילון וממלאת את הדיב עם הכרטיסייות בהתאם 
};
//פונקצייה שמקבלת אובייקט של הצעה ומייצרת ממנו שורה בטבלה
const createRow = (player) => {
    const tableRow = document.createElement("div");
    tableRow.className = "tableRow";
    const tableCube1 = document.createElement("div");
    const tableCube2 = document.createElement("div");
    const tableCube3 = document.createElement("div");
    const tableCube4 = document.createElement("div");
    const tableCube5 = document.createElement("div");
    const tableCube6 = document.createElement("div");
    tableCube1.className = "tableCube";
    tableCube2.className = "tableCube";
    tableCube3.className = "tableCube";
    tableCube4.className = "tableCube";
    tableCube5.className = "tableCube";
    tableCube6.className = "tableCube";
    tableCube1.textContent = player.playerName;
    tableCube2.textContent = player.position;
    tableCube3.textContent = player.points.toString();
    tableCube4.textContent = player.twoPercent.toString();
    tableCube5.textContent = player.threePercent.toString();
    const btnChoosePlayer = document.createElement("button");
    btnChoosePlayer.className = "greenBtn";
    btnChoosePlayer.textContent = `Add ${player.playerName} to team`;
    tableCube6.appendChild(btnChoosePlayer);
    tableRow.append(tableCube1, tableCube2, tableCube3, tableCube4, tableCube5, tableCube6);
    return tableRow;
};
// const testPlayer:IPlayer = {
//     _id: "id",
//     playerName: "name",
//     position: "position",
//     twoPercent: 2,
//     threePercent: 2,
//     points: 2
// }
// tableData.appendChild(createRow(testPlayer));
