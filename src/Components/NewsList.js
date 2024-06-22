import { useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination";
import "./NewsList.css"

const NewsList = (props) => {
  const { category, searchTerm } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData, loading, error } = useNewsData(category, searchTerm);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center my-5 text-danger">
        <h4>Error: {error}</h4>
        <p>Please try again later.</p>
      </div>
    );
  }

  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData.slice(startIndex, endIndex);

  return (
    <Container>
      <Row>
        {currentArticles.map((article) => (
          <Col xs={12} md={6} lg={4} key={article.url} className="mb-4">
            <Card className="cards" >
              <Card.Img src={article.image} variant="top" />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Link href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <Row className="mt-4">
          <Col>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default NewsList;
