const tableData:HTMLDivElement = document.querySelector(".tableData")!;
const btnSearchPlayer:HTMLButtonElement = document.querySelector("#btnSearchPlayer")!;
const towRange:HTMLButtonElement = document.querySelector("#towRange")!;
const threeRange:HTMLButtonElement = document.querySelector("#threeRange")!;
const pointsRange:HTMLButtonElement = document.querySelector("#pointsRange")!;
const towSpan:HTMLSpanElement = document.querySelector("#towSpan")!;
const threeSpan:HTMLSpanElement = document.querySelector("#threeSpan")!;
const pointsSpan:HTMLSpanElement = document.querySelector("#pointsSpan")!;

interface IPlayer     {
    _id?: string;
    playerName?: string;//לא חובה כדי שיהיה אפשר לשלוח בבקשת חיפוש בלי השם
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
};

towRange.addEventListener("change", (e) => {
    towSpan.textContent = towRange.value;
})


//רשימה של כל ההצעות שמתאימות לחיפוש
const listOfOfer:IPlayer[] = [];


//מילון של כל מי שנבחר לקבוצה
const selectedDictionary: Record<string, IPlayer | string> = {
    "PG":{playerName:"", position:"PG", twoPercent:-1, threePercent:-1, points:-1 },
     "SG":{playerName:"", position:"PG", twoPercent:-1, threePercent:-1, points:-1 },
      "SP":{playerName:"", position:"PG", twoPercent:-1, threePercent:-1, points:-1 },
       "PF":{playerName:"", position:"PG", twoPercent:-1, threePercent:-1, points:-1 },
        "C":{playerName:"", position:"PG", twoPercent:-1, threePercent:-1, points:-1 }};


console.log(selectedDictionary);

//פונקצייה שמקבלת אובייקט של שחקן ומוסיפה אותו לרשימת ההצעות
const addOfer = (player:IPlayer):void => {
    listOfOfer.push(player);
    //ומפעילה פונקצייה שעוברת על כל ההצעות ומציגה אותם בטבלה
};

btnSearchPlayer.addEventListener("click", async (e) => {
    
})

//פונקצייה שמקבלת מזהה של שחקן ומעבירה אותו מרשימת ההצעות למילון של הבחירות לפי התפקיד שלו
const selectPlayer = (id:string):void => {
    const player:IPlayer = listOfOfer.find(player => player._id === id)!;
    if(player === undefined) {alert("שגיאה"); return;};
    selectedDictionary[player.position] = player;
    //כאן צריך להפעיל פונקצייה שמנקה את הדיב של הבחירות ועוברת מחדש על המילון וממלאת את הדיב עם הכרטיסייות בהתאם 
};


//פונקצייה שמקבלת אובייקט של הצעה ומייצרת ממנו שורה בטבלה
const createRow = (player:IPlayer):HTMLDivElement => {
    const tableRow:HTMLDivElement = document.createElement("div");
    tableRow.className = "tableRow";
    const tableCube1:HTMLDivElement = document.createElement("div");
    const tableCube2:HTMLDivElement = document.createElement("div");
    const tableCube3:HTMLDivElement = document.createElement("div");
    const tableCube4:HTMLDivElement = document.createElement("div");
    const tableCube5:HTMLDivElement = document.createElement("div");
    const tableCube6:HTMLDivElement = document.createElement("div");
    tableCube1.className = "tableCube";
    tableCube2.className = "tableCube";
    tableCube3.className = "tableCube";
    tableCube4.className = "tableCube";
    tableCube5.className = "tableCube";
    tableCube6.className = "tableCube";
    tableCube1.textContent = player.playerName!;
    tableCube2.textContent = player.position;
    tableCube3.textContent = player.points.toString();
    tableCube4.textContent = player.twoPercent.toString();
    tableCube5.textContent = player.threePercent.toString();
    const btnChoosePlayer:HTMLButtonElement = document.createElement("button");
    btnChoosePlayer.className = "greenBtn";
    btnChoosePlayer.textContent = `Add ${player.playerName} to team`;
    tableCube6.appendChild(btnChoosePlayer);
    tableRow.append(tableCube1, tableCube2, tableCube3, tableCube4, tableCube5, tableCube6);
    return tableRow;
}
// const testPlayer:IPlayer = {
//     _id: "id",
//     playerName: "name",
//     position: "position",
//     twoPercent: 2,
//     threePercent: 2,
//     points: 2
// }

// tableData.appendChild(createRow(testPlayer));



