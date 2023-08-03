const UserTemplate = ({ user }) => {
    return (
        < div className = "user-template">
            <h4><strong> Email: </strong>{user.email} </h4>
            <p><strong> Name: </strong> {user.name} </p>
        /</div>
    )
}

export default UserTemplate