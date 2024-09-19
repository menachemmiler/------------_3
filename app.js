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
const selectPosition = document.querySelector("#selectPosition");
const paragraphPG = document.querySelector("#PG");
const paragraphSG = document.querySelector("#SG");
const paragraphSF = document.querySelector("#SF");
const paragraphPF = document.querySelector("#PF");
const paragraphC = document.querySelector("#C");
;
towSpan.textContent = towRange.value;
threeSpan.textContent = threeRange.value;
pointsSpan.textContent = pointsRange.value;
towRange.addEventListener("change", (e) => {
    towSpan.textContent = towRange.value;
});
threeRange.addEventListener("change", (e) => {
    threeSpan.textContent = threeRange.value;
});
pointsRange.addEventListener("change", (e) => {
    pointsSpan.textContent = pointsRange.value;
});
//מילון של כל מי שנבחר לקבוצה
const selectedDictionary = {
    "PG": { playerName: "", position: "PG", twoPercent: -1, threePercent: -1, points: -1 },
    "SG": { playerName: "", position: "SG", twoPercent: -1, threePercent: -1, points: -1 },
    "SP": { playerName: "", position: "SP", twoPercent: -1, threePercent: -1, points: -1 },
    "PF": { playerName: "", position: "PF", twoPercent: -1, threePercent: -1, points: -1 },
    "C": { playerName: "", position: "C", twoPercent: -1, threePercent: -1, points: -1 }
};
//מחפש את השחקנים שהפרטים שלהם תואמים לבחירה שלו
btnSearchPlayer.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    const positionSearch = selectPosition.value;
    const twoPercentSearch = parseInt(towRange.value);
    const threePercentSearch = parseInt(threeRange.value);
    const pointsSearch = parseInt(pointsRange.value);
    if (positionSearch == "") {
        alert("Please Choose Position To The Player");
        return;
    }
    ;
    const newPlayer = {
        position: positionSearch,
        twoPercent: twoPercentSearch,
        threePercent: threePercentSearch,
        points: pointsSearch
    };
    console.log(newPlayer);
    try {
        const res = yield fetch("https://nbaserver-q21u.onrender.com/api/filter", {
            method: "POST",
            body: JSON.stringify(newPlayer),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        console.log("res.status= ", res.status);
        const listPlayers = yield res.json();
        console.log(`listPlayers= `, listPlayers);
        if (res.status != 200) {
            alert("שגיאה");
        }
        ;
        if (listPlayers.length == 0) {
            tableData.textContent = "no resoulte";
            return;
        }
        const between2022To2024 = yield listPlayers.filter((p) => { var _a, _b, _c; return ((_a = p.season) === null || _a === void 0 ? void 0 : _a.includes(2022)) || ((_b = p.season) === null || _b === void 0 ? void 0 : _b.includes(2023)) || ((_c = p.season) === null || _c === void 0 ? void 0 : _c.includes(2024)); });
        if (between2022To2024.length == 0) {
            tableData.textContent = "no resoulte";
            return;
        }
        ;
        tableData.textContent = "";
        for (const player of between2022To2024) {
            tableData.appendChild(createRow(player));
        }
        ;
        window.location.href = "index.html#table";
        console.log(`between2022To2024= `, between2022To2024);
    }
    catch (err) {
        console.log("err= ", err);
    }
}));
//פונקצייה שמקבלת אובייקט של הצעה ומייצרת ממנו שורה בטבלה
const createRow = (player) => {
    var _a;
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
    const listFirstName = player.playerName.split(" ");
    const lastName = listFirstName === null || listFirstName === void 0 ? void 0 : listFirstName.splice(listFirstName.length - 1, 1)[0];
    btnChoosePlayer.textContent = `Add ${(_a = player.playerName) === null || _a === void 0 ? void 0 : _a.replace(lastName, "")} to team`;
    btnChoosePlayer.addEventListener("click", (e) => {
        selectedDictionary[player.position] = player;
        showSelected();
    });
    tableCube6.appendChild(btnChoosePlayer);
    tableRow.append(tableCube1, tableCube2, tableCube3, tableCube4, tableCube5, tableCube6);
    return tableRow;
};
//עובר על המילון של השחקנים הנבחרים ןממלא את הערכים שלהם בכרטסייה המתאימה לפי התפקיד שלהם
const showSelected = () => {
    paragraphC.textContent, paragraphPF.textContent, paragraphPG.textContent, paragraphSF.textContent, paragraphSG.textContent = "";
    for (let key in selectedDictionary) {
        const current = selectedDictionary[key];
        const twoPercentPlayer = current.twoPercent;
        if (twoPercentPlayer !== -1) { //בודק שיש שחקן בתפקיד הנוכחי
            const details = `
            name: ${current.playerName}<br>
            points: ${current.points}<br>
            three Percent: ${current.threePercent}<br>
            two Percent: ${current.twoPercent}`;
            switch (selectedDictionary[key].position) {
                case "PG":
                    paragraphPG.innerHTML = details;
                    break;
                case "SG":
                    paragraphSG.innerHTML = details;
                    break;
                case "SF":
                    paragraphSF.innerHTML = details;
                    break;
                case "PF":
                    paragraphPF.innerHTML = details;
                    break;
                case "C":
                    paragraphC.innerHTML = details;
                    break;
            }
            ;
            //זה עוזר לנוחות של המשתמש 
            window.location.href = "index.html#head";
        }
    }
};
