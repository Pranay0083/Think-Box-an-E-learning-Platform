import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Search, Star, Award, Users } from 'lucide-react';
import './InstructorPage.css';
import { getAllInstructors } from '../../services/api';
import Loader from '../../components/common/Loader/Loader';
import { useToast } from '../../components/common/Toast/ToastProvider';
import getErrorMessage from '../../utils/getErrorMessage';

const InstructorPage = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const fetchInstructors = async () => {
      setLoading(true);
      try {
        const response = await getAllInstructors();
        setInstructors(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const message = getErrorMessage(err, "Failed to load instructors");
        setError(err);
        toast.error(message);
      }
    };
    fetchInstructors();
  }, [toast]);

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedExpertise === 'all' || instructor.expertise === selectedExpertise)
  );
  
  if (loading) { return <Loader />; }

  return (
    <div className="instructor-page">
      <div className="page-header">
        <h1>Meet Our Expert Instructors</h1>
        <p>Learn from industry leaders with proven expertise</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="expertise-filters">
          <button
            className={`filter-btn ${selectedExpertise === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedExpertise('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${selectedExpertise === 'Web Development' ? 'active' : ''}`}
            onClick={() => setSelectedExpertise('Web Development')}
          >
            Web Development
          </button>
          <button
            className={`filter-btn ${selectedExpertise === 'Data Science' ? 'active' : ''}`}
            onClick={() => setSelectedExpertise('Data Science')}
          >
            Data Science
          </button>
          <button
            className={`filter-btn ${selectedExpertise === 'UX Design' ? 'active' : ''}`}
            onClick={() => setSelectedExpertise('UX Design')}
          >
            UX Design
          </button>
        </div>
      </div>

      <div className="instructors-grid">
        {filteredInstructors.map((instructor) => (
          <div
            key={instructor._id}
            className="instructor-card"
            onClick={() => navigate(`/instructor/${instructor._id}`)}
          >
            <div className="instructor-image">
              <img src={instructor.image} alt={instructor.name} />
            </div>
            <div className="instructor-content">
              <h3>{instructor.name}</h3>
              <span className="expertise">{instructor.expertise}</span>
              <p>{instructor.bio}</p>
              <div className="instructor-stats">
                <div className="stat">
                  <Star size={16} />
                  <span>{instructor.rating}</span>
                </div>
                <div className="stat">
                  <Users size={16} />
                  {/* {instructor.students.toLocaleString() ? instructor.students.toLocaleString() : 0} students */}
                </div>
                <div className="stat">
                  <Award size={16} />
                  <span>{instructor.courses} courses</span>
                </div>
              </div>
              <button className="view-profile">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorPage;