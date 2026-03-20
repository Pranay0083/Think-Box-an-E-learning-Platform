import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import './CourseVideos.css';
import { getAllCourses } from '../../services/api';
import Preloader from '../../components/common/Loader/Loader';
import EmptyState from '../../components/common/EmptyState/EmptyState';

const CourseVideo = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await getAllCourses(courseId);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState({ moduleIndex: 0, lessonIndex: 0 });

  if (loading) {
    return <Preloader />;
  }

  if (!course) {
    return (
      <EmptyState
        variant="not-found"
        title="Course not found"
        message="The course you're looking for doesn't exist or has been removed."
        actionLabel="Browse Courses"
        actionTo="/courses"
      />
    );
  }

  const currentLesson = course.modules[activeLesson.moduleIndex].lessons[activeLesson.lessonIndex];

  return (
    <div className="video-page">
      <div className="video-content">
        <div className="video-player">
          <iframe
            src={currentLesson.videoUrl}
            title={currentLesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="lesson-info">
          <h1>{currentLesson.title}</h1>
          <p>{currentLesson.description}</p>
        </div>
      </div>

      <div className="course-sidebar">
        <h2>{course.title}</h2>
        <div className="modules-list">
          {course.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="module-item">
              <button
                className="module-header"
                onClick={() => setActiveModule(moduleIndex === activeModule ? -1 : moduleIndex)}
              >
                <span>{module.title}</span>
                {moduleIndex === activeModule ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {moduleIndex === activeModule && (
                <ul className="lessons-list">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lessonIndex}
                      className={`lesson-item ${activeLesson.moduleIndex === moduleIndex &&
                        activeLesson.lessonIndex === lessonIndex
                          ? 'active'
                          : ''
                        }`}
                      onClick={() => setActiveLesson({ moduleIndex, lessonIndex })}
                    >
                      <PlayCircle size={16} />
                      <span>{lesson.title}</span>
                      <span>{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;
