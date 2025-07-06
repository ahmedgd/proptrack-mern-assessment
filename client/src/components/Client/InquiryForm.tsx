import { useState } from "react"
import { useDispatch } from "react-redux"
import { createClientLead } from "../../store/clientSlice"
import type { AppDispatch } from "../../store"
import { Form, Button, Alert } from "react-bootstrap"

interface InquiryFormProps {
  propertyId: string
  className?: string
}

export default function InquiryForm({ propertyId, className }: InquiryFormProps) {
  const dispatch = useDispatch<AppDispatch>()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [budget, setBudget] = useState<number>(0)
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      createClientLead({
        name,
        email,
        phone,
        budget,
        message,
        interestedProperties: [propertyId],
        preferences: {},
      })
    )
    setSubmitted(true)
    // reset
    setName("")
    setEmail("")
    setPhone("")
    setBudget(0)
    setMessage("")
  }

  return (
    <div className={className}>
      <h4>Inquire about this property</h4>
      {submitted && (
        <Alert variant="success">
          Your inquiry has been sent! We will contact you soon.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Send Inquiry
        </Button>
      </Form>
    </div>
  )
}
