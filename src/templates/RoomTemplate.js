const RoomTemplate = ({ room }) => {
    return (
        < div className = "room-template">
            <h4><strong> Number: </strong>{room.number} </h4>
            <p><strong> Special Room: </strong> {room.specialRoom} </p>
            <p><strong> Assigned Meetings: </strong> {room.meetings} </p>
        </div>
    )
}

export default RoomTemplate