import React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Search, Star, Award, Users, ArrowRight, User } from 'lucide-react';
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

      <div className="ip-toolbar">
        <div className="ip-search">
          <Search size={18} className="ip-search-icon" />
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="ip-tags">
        {['all', 'Web Development', 'Data Science', 'UX Design'].map((tag) => (
          <button
            key={tag}
            className={`ip-tag ${selectedExpertise === tag ? 'ip-tag--active' : ''}`}
            onClick={() => setSelectedExpertise(tag)}
          >
            {tag === 'all' ? 'All' : tag}
          </button>
        ))}
      </div>

      <div className="ip-grid">
        {filteredInstructors.map((instructor) => (
          <div
            key={instructor._id}
            className="ip-card"
            onClick={() => navigate(`/instructor/${instructor._id}`)}
          >
            <div className="ip-card-image">
              {instructor.image ? (
                <img src={instructor.image} alt={instructor.name} />
              ) : (
                <div className="ip-card-placeholder">
                  <User size={48} />
                  <span>{instructor.name?.charAt(0)?.toUpperCase()}</span>
                </div>
              )}
            </div>
            <div className="ip-card-body">
              <h3 className="ip-card-name">{instructor.name}</h3>
              <p className="ip-card-bio">{instructor.bio}</p>
              <div className="ip-card-stats">
                <div className="ip-stat">
                  <Star size={14} fill="currentColor" className="ip-stat-star" />
                  <span>{instructor.rating}</span>
                </div>
                <div className="ip-stat">
                  <Award size={14} />
                  <span>{instructor.courses} courses</span>
                </div>
                <div className="ip-stat">
                  <Users size={14} />
                  <span>Students</span>
                </div>
              </div>
              <button className="ip-card-btn">
                View Profile <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorPage;