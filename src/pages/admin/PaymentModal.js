import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, handleSubmit, email }) => {
    const [amount, setAmount] = useState('');

    const onSubmit = () => {
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            alert('Please enter a valid amount');
            return;
        }
        handleSubmit(parsedAmount);
        setAmount('');
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enter Amount</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
