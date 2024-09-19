import more from "../img/more.svg";
export const ChatHistoryPrefab = () => {
    return (
        <div style={{paddingTop: "10px", width: "100%"}}>
            <div className="ChatHistoryPrefabContainer">
                <div className="rowContainer" style={{justifyContent: "space-between", width: "100%", height:"100%"}}>
                    
                    <div className="ColumnContainer" style={{paddingLeft: "10px", paddingTop: "5px", alignItems: "flex-start", height:"100%", justifyContent:"center"}}>
                        <p className="ChatHistoryText">Tiktok Trends 2024</p>
                        <p className="ChatHistoryText">1 Month Ago</p>
                    </div>
                    <img src={more} alt="more" style={{paddingRight: "10px"}}></img>
                </div>
                
            </div>
        </div>
    )
}