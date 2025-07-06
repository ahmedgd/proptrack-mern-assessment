import { useState } from "react"
import { useDispatch } from "react-redux"
import { createViewing } from "../../store/viewingSlice"
import type { AppDispatch } from "../../store"
import { Form, Button, Alert } from "react-bootstrap"

interface ViewingSchedulerProps {
  propertyId: string
  clientId: string
}

export default function ViewingScheduler({ propertyId, clientId }: ViewingSchedulerProps) {
  const dispatch = useDispatch<AppDispatch>()

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      createViewing({
        propertyId,
        clientId,
        date,
        time,
        notes,
      })
    )
    setSubmitted(true)
    setDate("")
    setTime("")
    setNotes("")
  }

  return (
    <div className="mt-4">
      <h4 className="fw-bold mb-3">Schedule a Viewing</h4>
      {submitted && (
        <Alert variant="success">
          Your viewing request has been scheduled! Our agent will contact you.
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className="shadow-sm p-4 rounded bg-light">
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add any notes or requirements"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" size="lg" className="w-100">
          Schedule Viewing
        </Button>
      </Form>
    </div>
  )
}
