import { useState } from "react"
import { Button, Form } from 'react-bootstrap'
import useAuth from './useAuth'
import LandingPage from './LandingPage'

const UpdateBilling = () => {
    const { cardNumber, setCardNumber } = useState(null)
    const { ccv, setCCV } = useState(null)
    const { expirationDate, setExpirationDate } = useState(null)
    const { nameOnCard, setNameOnCard } = useState(null)
    
    const { loading, currentUser } = useAuth()
    // If there is no user logged in, return the LandingPage component
    if (!currentUser) {
        return <LandingPage />
    }

    // Function is called when the user wants to update their billing
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the form from reloading the page
    
        // Define the payment object that will be sent to the server
        let payment = {
            currentUser,
            // These checks ensure any values that are not entered are ignored and are not updated
            cardNumber: cardNumber === null ? undefined : cardNumber,
            ccv: ccv === null ? undefined : ccv,
            expirationDate: expirationDate === null ? undefined : expirationDate,
            nameOnCard : nameOnCard === null ? undefined : nameOnCard
        }
    
        // Make a PATCH request to the server to update billing info
        const response = await fetch('/api/paymentMethod/update-paymentMethod', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' // specify content type as JSON
            },
            body: JSON.stringify(payment) // convert payment object to JSON string
        })
    
        // If the response was successful (status code in the range 200-299), reset the form fields
        if (response.ok) {
            setCardNumber(null)
            setCCV(null)
            setExpirationDate(null)
            setNameOnCard(null)
        }
    }

    return (
        <Form onSubmit = {handleSubmit}>
        <Form.Group className = "updateBilling" controlId = "formCardNumber">
            <Form.Label> Card Number: </Form.Label>
            <Form.Control type = "cardNumber" value = {cardNumber} onChange = {(e) => setCardNumber(e.target.value)} />
        </Form.Group>

        <Form.Group className="updateBilling" controlId = "formCCV">
            <Form.Label> CCV: </Form.Label>
            <Form.Control type = "ccv" value = {ccv} onChange={(e) => setCCV(e.target.value)} />
        </Form.Group>

        <Form.Group className = "updateBilling" controlId = "formExpirationDate">
            <Form.Label> Expiration date: </Form.Label>
            <Form.Control type = "date" value = {expirationDate} onChange = {(e) => setExpirationDate(e.target.value)} />
        </Form.Group>

        <Form.Group className = "updateBilling" controlId = "formNameOnCard">
            <Form.Label> Name on card: </Form.Label>
            <Form.Control type = "text" value = {nameOnCard} onChange = {(e) => setNameOnCard(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
            Update Billing
        </Button>
    </Form>
    )
}
 
export default UpdateBilling;
