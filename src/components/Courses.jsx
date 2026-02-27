import React, { useState } from 'react';
import '../css/Courses.css';

import { useNavigate } from "react-router-dom";




const Courses = () => {
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedStream, setSelectedStream] = useState(null);


  const navigate = useNavigate();

  const subjectsData = {
    'Class 8': [
      { name: 'Science', icon: '🧪' },
      { name: 'Social Science', icon: '🌍' },
      { name: 'Maths', icon: '🔢' },
      { name: 'English', icon: '📚' },
      { name: 'GK', icon: '🧠' },
      { name: 'IT', icon: '💻' },
      { name: 'MIL', icon: '🗣️' }
    ],
    'Class 9': [
      { name: 'Science', icon: '🧪' },
      { name: 'Social Science', icon: '🌍' },
      { name: 'Maths', icon: '🔢' },
      { name: 'English', icon: '📚' },
      { name: 'GK', icon: '🧠' },
      { name: 'MIL', icon: '🗣️' }
    ],
    'Class 10': [
      { name: 'Science', icon: '🧪' },
      { name: 'Social Science', icon: '🌍' },
      { name: 'Maths', icon: '🔢' },
      { name: 'English', icon: '📚' },
      { name: 'MIL', icon: '🗣️' }
    ],
    'Class 11': {
      'Science': [
        { name: 'Physics', icon: '⚛️' },
        { name: 'Chemistry', icon: '🧪' },
        { name: 'Biology', icon: '🧬' },
        { name: 'Maths', icon: '🔢' },
        { name: 'English', icon: '📚' },
        { name: 'MIL', icon: '🗣️' }
      ],
      'Arts': [
        { name: 'History', icon: '📜' },
        { name: 'Geography', icon: '🌍' },
        { name: 'Political Science', icon: '🏛️' },
        { name: 'Sociology', icon: '👥' },
        { name: 'English', icon: '📚' },
        { name: 'MIL', icon: '🗣️' }
      ],
      'Commerce': [
        { name: 'Accountancy', icon: '📊' },
        { name: 'Business Studies', icon: '💼' },
        { name: 'Economics', icon: '💰' },
        { name: 'Maths', icon: '🔢' },
        { name: 'English', icon: '📚' },
        { name: 'MIL', icon: '🗣️' }
      ]
    },
    'Class 12': {
      'Science': [
        { name: 'Physics', icon: '⚛️' },
        { name: 'Chemistry', icon: '🧪' },
        { name: 'Biology', icon: '🧬' },
        { name: 'Maths', icon: '🔢' },
        { name: 'English', icon: '📚' },
        { name: 'MIL', icon: '🗣️' }
      ],
      'Arts': [
        { name: 'History', icon: '📜' },
        { name: 'Geography', icon: '🌍' },
        { name: 'Political Science', icon: '🏛️' },
        { name: 'Sociology', icon: '👥' },
        { name: 'English', icon: '📚' },
        { name: 'MIL', icon: '🗣️' }
      ],
      'Commerce': [
        { name: 'Accountancy', icon: '📊' },
        { name: 'Business Studies', icon: '💼' },
        { name: 'Economics', icon: '💰' },
        { name: 'Maths', icon: '🔢' },
        { name: 'English', icon: '📚' },
        { name: 'MIL', icon: '🗣️' }
      ]
    }
  };

  const handleClassClick = (className) => {
    setSelectedClass(className);
    setSelectedStream(null);
  };

  const handleStreamClick = (stream) => {
    setSelectedStream(stream);
  };

  const handleBackClick = () => {
    setSelectedStream(null);
  };
const handleSubjectClick = (subjectName) => {
  navigate("/payment", {
    state: {
      className: selectedClass,
      stream: selectedStream,
      subject: subjectName,
      price: 1200,
    },
  });
};

  const renderContent = () => {
    if (selectedStream) {
      // Show subjects for the selected stream
      return (
        <div className="courses-content-area">
          <h3>{selectedClass} - {selectedStream}</h3>
          <div className="courses-subjects-grid">
            {subjectsData[selectedClass][selectedStream].map((subject, index) => (
              <div className="courses-subject-card" key={index}>
                <div className="card-icon">{subject.icon}</div>
                <h4>{subject.name}</h4>
              </div>
            ))}
          </div>
          <button className="courses-back-button" onClick={handleBackClick}>Back to Streams</button>
        </div>
      );
    } else if (!Array.isArray(subjectsData[selectedClass]) && typeof subjectsData[selectedClass] === 'object') {
      // Show streams for Class 11 or 12
      return (
        <div className="courses-content-area">
          <h3>{selectedClass}</h3>
          <div className="courses-streams-grid">
            {Object.keys(subjectsData[selectedClass]).map((stream, index) => (
             <div
  className="courses-subject-card"
  key={index}
  onClick={() => handleSubjectClick(subject.name)}>

              onClick={() => handleStreamClick(stream)}
                <h4>{stream}</h4>
                <p>Click to view subjects</p>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Show subjects for Class 8-10
      return (
        <div className="courses-content-area">
          <h3>{selectedClass}</h3>
          <div className="courses-subjects-grid">
            {subjectsData[selectedClass].map((subject, index) => (
              <div
  className="courses-subject-card"
  key={index}
  onClick={() => handleSubjectClick(subject.name)}
>

                <div className="card-icon">{subject.icon}</div>
                <h4>{subject.name}</h4>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="courses-container">
      <div className="courses-canvas">
        <h1 className="courses-title">Our Online Courses</h1>
        <p className="courses-subtitle">Explore subjects for classes 8 to 12, including specialized streams for classes 11 and 12.</p>

        <div className="courses-class-tabs">
          {Object.keys(subjectsData).map((className) => (
            <button
              key={className}
              className={`courses-class-tab ${selectedClass === className ? 'selected' : ''}`}
              onClick={() => handleClassClick(className)}
            >
              {className}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Courses;