import React, { useState, useEffect, useCallback } from 'react';
import { Clock, Users, Star, PlayCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetails.css';
import { deleteCourse, deleteEnrollments, enrollInCourse, getAllCourses, getEnrollments } from '../../services/api';
import Loader from '../../components/common/Loader/Loader';
import { useToast } from '../../components/common/Toast/ToastProvider';
import getErrorMessage from '../../utils/getErrorMessage';
import ConfirmDialog from '../../components/common/Modal/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState/EmptyState';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canUpdateCourse, setCanUpdateCourse] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { toast } = useToast();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };


  // Check authentication
  const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  const userId = localStorage.getItem("userID") || sessionStorage.getItem("userID");

  const fetchCourseDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCourses(courseId);
      setCourse(response.data);
      // Check if user is instructor after setting course
      if (response.data?.instructor?._id && userId === response.data.instructor._id) {
        setCanUpdateCourse(true);
      }
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load course details");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [courseId, userId, toast]);

  const fetchEnrollments = useCallback(async () => {
    if (!authToken) {
      const message = "Authentication required";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    try {
      const response = await getEnrollments(authToken);
      setEnrolledCourses(response.data);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load enrollments");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [authToken, toast]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  useEffect(() => {
    if (course) {
      fetchEnrollments();
    }
  }, [course, fetchEnrollments]);

  const handleEnroll = async () => {
    if (!authToken) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      await enrollInCourse(courseId, authToken);
      await fetchEnrollments();
      closeModal();
      toast.success("Enrolled successfully");
    } catch (err) {
      const message = getErrorMessage(err, "Failed to enroll in course");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEnrollment = async () => {
    if (!authToken) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await deleteEnrollments(authToken, courseId);
      if (response.status === 200) {
        await fetchEnrollments();
      }
      toast.success("Enrollment removed");
    } catch (err) {
      const message = getErrorMessage(err, "Failed to remove enrollment");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = () => {
    if (!authToken) {
      navigate('/login');
      return;
    }
    navigate(`/course/${courseId}/video`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!authToken) {
    return (
      <div className="course-detail-page">
        <EmptyState
          variant="auth"
          title="Sign in required"
          message="Please log in to view course details and enroll."
          actionLabel="Sign In"
          actionTo="/login"
        />
      </div>
    );
  }

  if (loading && !course) {
    return <div className="course-detail-page"><Loader /></div>;
  }

  if (error) {
    return (
      <div className="course-detail-page">
        <EmptyState
          variant="error"
          title="Couldn't load course"
          message={typeof error === 'string' ? error : "Something went wrong. Please try again."}
          actionLabel="Retry"
          onAction={fetchCourseDetails}
        />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-detail-page">
        <EmptyState
          variant="not-found"
          title="Course not found"
          message="The course you're looking for doesn't exist or has been removed."
          actionLabel="Browse Courses"
          actionTo="/courses"
        />
      </div>
    );
  }

  const enrolledCourseIds = enrolledCourses.map(enrollment => enrollment.course._id);
  const isEnrolled = enrolledCourseIds.includes(courseId);

  const handleDelete = async () => {
    try {
      await deleteCourse(courseId, authToken);
      toast.success("Course deleted successfully");
      navigate('/courses'); // Redirect after deletion
    } catch (err) {
      const message = getErrorMessage(err, "Failed to delete course");
      setError(message);
      toast.error(message);
    }
    closeDeleteModal();
  };


  return (
    <div className="course-detail-page">
      <div className="course-hero">
        <div className="course-hero-content">
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-meta">
            <div className="meta-item">
              <Clock size={20} />
              <span>{course.duration}</span>
            </div>
            <div className="meta-item">
              <Users size={20} />
              <span>{course.students} students</span>
            </div>
            <div className="meta-item">
              <Star size={20} />
              <span>{course.rating} rating</span>
            </div>
          </div>
          <button
            className="enroll-button"
            onClick={isEnrolled ? handleStartCourse : openModal}
            disabled={loading}
          >
            {isEnrolled ? 'Start Learning Now' : 'Enroll Now'}
          </button>
          {isEnrolled && (
            <button
              className="enroll-button"
              onClick={handleRemoveEnrollment}
              disabled={loading}
              style={{ backgroundColor: "red" }}
            >
              Remove Enrollment
            </button>
          )}
          {canUpdateCourse && (
            <>
              <button
                className="enroll-button"
                onClick={() => navigate(`/updatecourse/${courseId}`)}
                disabled={loading}
                style={{ backgroundColor: "green" }}
              >
                Update Course
              </button>
              <button 
              className="enroll-button"
              onClick={openDeleteModal}
              style={{ backgroundColor: "red" }}
              >
                Delete Course
                </button>
            </>

          )}
        </div>
        <div className="course-preview">
          <img src={course.image} alt={course.title} />
          {/* <button className="preview-button"> */}
            {/* <PlayCircle size={48} />
            <span>Watch Preview</span> */}
          {/* </button> */}
        </div>
      </div>

      <div className="course-content">
        <div className="content-section">
          <h2>What you'll learn</h2>
          <ul className="learning-objectives">
            {course.learningObjectives?.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>

        <div className="content-section">
          <h2>Course Content</h2>
          <div className="course-modules">
            {course.modules?.map((module, index) => (
              <div key={index} className="module-card">
                <div className="module-header">
                  <h3>{module.title}</h3>
                  <span>{module.duration}</span>
                </div>
                <ul className="module-lessons">
                  {module.lessons?.map((lesson, lessonIndex) => (
                    <li key={lessonIndex}>
                      <PlayCircle size={16} />
                      <span>{lesson.title}</span>
                      <span>{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isModalOpen}
        title="Confirm Enrollment"
        message="Are you sure you want to enroll in this course?"
        confirmText={loading ? "Enrolling..." : "Confirm"}
        cancelText="Cancel"
        confirmDisabled={loading}
        onConfirm={handleEnroll}
        onClose={closeModal}
      />

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this course?"
        confirmText="Confirm"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onClose={closeDeleteModal}
      />

    </div>
  );
};

export default CourseDetails;