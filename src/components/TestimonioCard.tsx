import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { FaQuoteLeft } from 'react-icons/fa';

interface Testimony {
  id: number;
  name: string;
  story: string;
  image: string;
}

interface TestimonioCardProps {
  testimony: Testimony;
}

const TestimonioCard: React.FC<TestimonioCardProps> = ({ testimony }) => {
  return (
    <Col>
      <Card className="h-100 shadow text-center p-3 card-book">
        <Card.Body>
          <FaQuoteLeft size={40} className="mb-3 text-primary" />
          <Card.Text className="fst-italic mb-3">"{testimony.story}"</Card.Text>
          <Card.Img variant="top" src={testimony.image} alt={testimony.name} className="mx-auto rounded-circle mb-2" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
          <Card.Title className="mb-0">{testimony.name}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TestimonioCard;