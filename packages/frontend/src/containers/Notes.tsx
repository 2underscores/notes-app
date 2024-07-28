import { useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import { useParams } from "react-router-dom";

export default function Notes() {
    const { id } = useParams()
    const [content, setContent] = useState();
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(()=>{
        const results = API.get("notes", `/notes/${id}`, {})
        results.then(note => {
            setContent(note.content);
            setIsSubmitting(false);
        })
    }, [])
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsDeleting(true);
        ()=>{};
        setIsDeleting(false);
    }

    return (
        <div className="Notes">
            <Form onSubmit={handleSubmit}>
                <Stack>
                    <Form.Group controlId="content">
                        <Form.Control
                            value={content}
                            as="textarea"
                            // onChange={}
                        />
                    </Form.Group>
                    <LoaderButton
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Update
                    </LoaderButton>
                    <LoaderButton
                        isLoading={isDeleting && isSubmitting}
                        variant="danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </LoaderButton>
                </Stack>
            </Form>
        </div>
    )
}