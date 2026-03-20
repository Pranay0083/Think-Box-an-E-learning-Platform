import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import CourseCard from '../../components/common/CourseCard/CourseCard';
import CourseCreationModal from './CourseCreationModal/CourseCreationModal';
import Loader from '../../components/common/Loader/Loader';
import { createCourse, getCourses, getCurrentUser } from '../../services/api';
import { useToast } from '../../components/common/Toast/ToastProvider';
import getErrorMessage from '../../utils/getErrorMessage';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import './CoursePage.css';

const categories = ['all', 'Web Development', 'Machine Learning', 'Data Science'];

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUserInstructor, setIsUserInstructor] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  useEffect(() => {
    const checkUserRole = async () => {
      if (authToken) {
        try {
          const response = await getCurrentUser(authToken);
          if (response.data.role === 'teacher') {
            setIsUserInstructor(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    checkUserRole();
  }, [authToken]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (err) {
        const message = getErrorMessage(err, "Failed to load courses");
        setError(err);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'all' || course.category === selectedCategory)
  );

  const handleCreateCourse = async (newCourse) => {
    try {
      await createCourse(newCourse, authToken);
      toast.success("Course created successfully");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to create course"));
    }
  };

  if (error) {
    return (
      <div className="cp-page">
        <EmptyState
          variant="error"
          title="Couldn't load courses"
          message={error.message || "Something went wrong. Please try again later."}
          actionLabel="Retry"
          onAction={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="cp-page">
      <div className="cp-header">
        <h1>Explore Our Courses</h1>
        <p>Discover the perfect course to advance your skills</p>
      </div>

      <div className="cp-toolbar">
        <div className="cp-search">
          <Search size={18} className="cp-search-icon" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isUserInstructor && (
          <button className="cp-create-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> New Course
          </button>
        )}
      </div>

      <div className="cp-tags">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cp-tag ${selectedCategory === cat ? 'cp-tag--active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'all' ? 'All Courses' : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader inline />
      ) : filteredCourses.length === 0 ? (
        <EmptyState
          variant="empty"
          title={searchQuery || selectedCategory !== 'all' ? 'No matches found' : 'No courses yet'}
          message={
            searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Courses will appear here once they are published.'
          }
        />
      ) : (
        <div className="cp-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {isModalOpen && (
        <CourseCreationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateCourse}
        />
      )}
    </div>
  );
};

export default CoursesPage;
