import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]); // State to store the courses
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses',{referrerPolicy: 'no-referrer-when-downgrade'});
        setCourses(response.data.courses); // Assuming response has a 'courses' field
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', padding: '1rem' }}>
      {courses.map(course => (
        <Link className='courseCard' to={`/course/${course._id}`}>
        <img
          src={course.banner || 'https://via.placeholder.com/300x150'} // Use a placeholder if no image
          alt={course.title}
          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
        />
        <label>{course.title}</label>
        <p>{course.description}</p>
        <Link to={`/course/${course._id}`}>Start Now</Link>
      </Link>
      ))}
    </div>
  );
}

export default Courses;
