import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserProfileComponent = () => {

    const [userdata, setuserdata] = useState(null);

    const userdatamanupulate = (data) => {
        setuserdata(data)
    }

    useEffect(() => {
        let fetchdata = sessionStorage.getItem("userdetails");
        if (fetchdata.length > 0) {
            userdatamanupulate(JSON.parse(fetchdata));
        }
        return () => {
        };
    }, []);

    return (
        <>
            <Container fluid className='w-50 my-5 userprofile'>
                <h2>My profile</h2>
                {userdata &&
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="" value={userdata.id} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="" value={userdata.name} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" placeholder="" value={userdata.age} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="" value={userdata.email} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>New field</Form.Label>
                            <Form.Control type="text" placeholder="" value={userdata.email} disabled />
                        </Form.Group>
                    </Form>
                }

            </Container>
        </>
    );
}

export default UserProfileComponent;
