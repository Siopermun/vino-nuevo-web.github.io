import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  linkTo: string;
  buttonText: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, text, linkTo, buttonText }) => (
  <Card className="h-100 shadow card-book">
    <Card.Body className="d-flex flex-column text-center">
      {icon}
      <Card.Title className="h5">{title}</Card.Title>
      <Card.Text>{text}</Card.Text>
      <LinkContainer to={linkTo}>
        <Button variant="primary" className="rounded-pill mt-auto btn-sm">
          {buttonText}
        </Button>
      </LinkContainer>
    </Card.Body>
  </Card>
);

export default ActionCard;
