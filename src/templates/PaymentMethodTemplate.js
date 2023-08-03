const PaymentMethodTemplate = ({ paymentMethod }) => {
    return (
        < div className = "paymentMethod-template">
            <h4><strong> Card Owner: </strong>{paymentMethod.nameOnCard} </h4>
            <p><strong> Card Number: </strong> {paymentMethod.cardNumber} </p>
            <p><strong> CCV: </strong> {paymentMethod.ccv} </p>
            <p><strong> Expiration Date: </strong> {paymentMethod.expirationDate} </p>
        </div>
    )
}

export default PaymentMethodTemplate