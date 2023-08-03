const ComplaintTemplate = ({ complaint }) => {
    return (
        < div className = "complaint-template">
            <h4><strong> Subject: </strong>{complaint.subject} </h4>
            <p><strong> User's Email: </strong> {complaint.email} </p>
            <p><strong> Message: </strong> {complaint.message} </p>
            <p><strong> Admin Reply: </strong> {complaint.reply} </p>
            <p><strong> Resolved: </strong> {complaint.resolved} </p>
            <p><strong> Resolved Date: </strong> {complaint.resolutionDate} </p>
        </div>
    )
}

export default ComplaintTemplate