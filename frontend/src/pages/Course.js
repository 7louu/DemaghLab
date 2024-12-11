import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Course() {
  const { id } = useParams(); // Get the course ID from the URL parameter
  const [course, setCourse] = useState(null); // State to store the course data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [selectedLesson, setSelectedLesson] = useState(null); // State to store selected lesson content
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const navigate = useNavigate(); // For redirecting if not authenticated

  useEffect(() => {
    // Check if user is authenticated by verifying the token in localStorage
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/check-auth', {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`, // Check for token in localStorage
          },
        });

        if (response.data.ok) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
          navigate('/login'); // Redirect to login if not authenticated
        }
      } catch (err) {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login if there's an error
      }
    };

    checkAuth(); // Run auth check when the component mounts
  }, [navigate]);

  useEffect(() => {
    // Fetch course data based on the ID from the backend
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data); // Set the course data to state
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCourse(); // Fetch course only if authenticated
    }
  }, [id, isAuthenticated]); // Run this when the `id` or `isAuthenticated` changes

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson); // Update the state to show the selected lesson's content
  };

  if (loading) {
    return <div>Loading course...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {course && isAuthenticated && (
        <div>
          <h2>{course.title}</h2>
          <img src={course.banner || 'https://via.placeholder.com/500x250'} alt={course.title} style={{ width: '100%', height: 'auto' }} />
          <p>{course.description}</p>

          <h3>Lessons</h3>
          <ul>
            {course.lessons && course.lessons.length > 0 ? (
              course.lessons.map((lesson) => (
                <li
                  key={lesson._id}
                  onClick={() => handleLessonClick(lesson)}
                  style={{ cursor: 'pointer', marginBottom: '10px' }}
                >
                  {lesson.title}
                </li>
              ))
            ) : (
              <p>No lessons available for this course.</p>
            )}
          </ul>

          {/* Show selected lesson content */}
          {selectedLesson && (
            <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '10px' }}>
              <h4>{selectedLesson.title}</h4>
              <p>{selectedLesson.content}</p>
            </div>
          )}
        </div>
      )}
      {/* If not authenticated, show a message */}
      {!isAuthenticated && (
        <div>Please log in to view the course content.</div>
      )}
    </div>
  );
}

export default Course;
