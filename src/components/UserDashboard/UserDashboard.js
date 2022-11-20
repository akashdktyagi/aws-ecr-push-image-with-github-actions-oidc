import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideHeaderComponent from '../../commonlayout/SideHeaderComponent';

function UserDashboard() {
  return (
    <>
      <h1>Dashboard content</h1>
      <Container fluid className='w-75 my-5'>
        <Row>
          <h1>Welcome to find doctor every where. Press the left side button and find the information what you want</h1>
        </Row>
      </Container>
    </>
  );
}

export default UserDashboard
