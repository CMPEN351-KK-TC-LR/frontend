const MeetingTemplate = ({ meeting }) => {
    return (
        < div className = "meeting-template">
            <h4><strong> Name: </strong>{meeting.name} </h4>
            <p><strong> Time: </strong> {meeting.time} </p>
            <p><strong> Assigned Room: </strong> {meeting.room} </p>
        </div>
    )
}

export default MeetingTemplate