const tableData:HTMLDivElement = document.querySelector(".tableData")!;
const btnSearchPlayer:HTMLButtonElement = document.querySelector("#btnSearchPlayer")!;
const towRange:HTMLButtonElement = document.querySelector("#towRange")!;
const threeRange:HTMLButtonElement = document.querySelector("#threeRange")!;
const pointsRange:HTMLButtonElement = document.querySelector("#pointsRange")!;
const towSpan:HTMLSpanElement = document.querySelector("#towSpan")!;
const threeSpan:HTMLSpanElement = document.querySelector("#threeSpan")!;
const pointsSpan:HTMLSpanElement = document.querySelector("#pointsSpan")!;
const selectPosition:HTMLSelectElement = document.querySelector("#selectPosition")!;
const paragraphPG:HTMLParagraphElement = document.querySelector("#PG")!;
const paragraphSG:HTMLParagraphElement = document.querySelector("#SG")!;
const paragraphSF:HTMLParagraphElement = document.querySelector("#SF")!;
const paragraphPF:HTMLParagraphElement = document.querySelector("#PF")!;
const paragraphC:HTMLParagraphElement = document.querySelector("#C")!;





interface IPlayer     {
    _id?: string;
    playerName?: string;//לא חובה כדי שיהיה אפשר לשלוח בבקשת חיפוש בלי השם
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
    season?: number[];
};


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
const selectedDictionary: Record<string, IPlayer> = {
    "PG":{playerName:"", position:"PG", twoPercent:-1, threePercent:-1, points:-1 },
     "SG":{playerName:"", position:"SG", twoPercent:-1, threePercent:-1, points:-1 },
      "SP":{playerName:"", position:"SP", twoPercent:-1, threePercent:-1, points:-1 },
       "PF":{playerName:"", position:"PF", twoPercent:-1, threePercent:-1, points:-1 },
        "C":{playerName:"", position:"C", twoPercent:-1, threePercent:-1, points:-1 }};





btnSearchPlayer.addEventListener("click", async (e) => {
    const positionSearch:string = selectPosition.value;
    const twoPercentSearch: number = parseInt(towRange.value); 
    const threePercentSearch:number = parseInt(threeRange.value); 
    const pointsSearch:number = parseInt(pointsRange.value); 
    if(positionSearch == ""){
        alert("Please Choose Position To The Player");
        return;
    };
    const newPlayer:IPlayer = {
        position:positionSearch,
        twoPercent:twoPercentSearch,
        threePercent:threePercentSearch,
        points:pointsSearch
    }
    console.log(newPlayer);
    try{
        const res:Response = await fetch("https://nbaserver-q21u.onrender.com/api/filter", {
            method: "POST",
            body: JSON.stringify(
                    newPlayer
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        console.log("res.status= ", res.status);
        const listPlayers:IPlayer[] = await res.json();
        console.log(`listPlayers= `, listPlayers);
        if(res.status != 200){
            alert("שגיאה");
        };
        if(listPlayers.length == 0){
            tableData.textContent = "no resoulte";
            return;
        }
        const between2022To2024:IPlayer[] = await listPlayers.filter((p) => {return p.season?.includes(2022) || p.season?.includes(2023) || p.season?.includes(2024)});
        if(between2022To2024.length == 0){
            tableData.textContent = "no resoulte";
            return;
        };
        tableData.textContent = "";
        for(const player of between2022To2024){
            tableData.appendChild(createRow(player));
        };
        console.log(`between2022To2024= `, between2022To2024);
    }catch (err){
        console.log("err= ", err);
    }

})



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
    const listFirstName:string[] = player.playerName!.split(" ");
    const lastName:string = listFirstName?.splice(listFirstName.length -1, 1)[0];
    btnChoosePlayer.textContent = `Add ${player.playerName?.replace(lastName, "")} to team`;
    btnChoosePlayer.addEventListener("click", (e) => {
        selectedDictionary[player.position] = player;
        //עובר על המילון של השחקנים הנבחרים ןממלא את הערכים שלהם בכרטסייה המתאימה לפי התפקיד שלהם
        paragraphC.textContent, paragraphPF.textContent, paragraphPG.textContent, paragraphSF.textContent, paragraphSG.textContent = "";
        for (let key in selectedDictionary) {
            const current:IPlayer = selectedDictionary[key];
            const twoPercentPlayer = current.twoPercent;
            if(twoPercentPlayer !== -1){//בודק שיש שחקן בתפקיד הנוכחי
                const details:string =  `
                name: ${current.playerName}<br>
                points: ${current.points}<br>
                three Percent: ${current.threePercent}<br>
                two Percent: ${current.twoPercent}`;
                switch(selectedDictionary[key].position){
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
            }
        }
    })
    tableCube6.appendChild(btnChoosePlayer);
    tableRow.append(tableCube1, tableCube2, tableCube3, tableCube4, tableCube5, tableCube6);
    return tableRow;
}






