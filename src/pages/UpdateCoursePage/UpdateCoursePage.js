import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllCourses, updateCourse } from '../../services/api';
import './UpdateCoursePage.css';
import Loader from '../../components/common/Loader/Loader';
import { useToast } from '../../components/common/Toast/ToastProvider';
import getErrorMessage from '../../utils/getErrorMessage';
import EmptyState from '../../components/common/EmptyState/EmptyState';

const UpdateCoursePage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await getAllCourses(courseId);
                setCourse(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                const message = getErrorMessage(err, "Failed to load course");
                setError(err);
                toast.error(message);
            }
        };
        fetchCourse();
    }, [courseId, toast]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleModuleChange = (moduleIndex, field, value) => {
        const newModules = [...course.modules];
        newModules[moduleIndex][field] = value;
        setCourse(prevCourse => ({ ...prevCourse, modules: newModules }));
    };

    const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
        const newModules = [...course.modules];
        newModules[moduleIndex].lessons[lessonIndex][field] = value;
        setCourse(prevCourse => ({ ...prevCourse, modules: newModules }));
    };

    const addModule = () => {
        const newModule = {
            title: '',
            duration: '',
            lessons: []
        };
        setCourse(prevCourse => ({
            ...prevCourse,
            modules: [...prevCourse.modules, newModule]
        }));
    };

    const removeModule = (moduleIndex) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            modules: prevCourse.modules.filter((_, index) => index !== moduleIndex)
        }));
    };

    const addLesson = (moduleIndex) => {
        const newLesson = {
            title: '',
            duration: '',
            videoUrl: '',
            description: ''
        };
        const newModules = [...course.modules];
        newModules[moduleIndex].lessons.push(newLesson);
        setCourse(prevCourse => ({ ...prevCourse, modules: newModules }));
    };

    const removeLesson = (moduleIndex, lessonIndex) => {
        const newModules = [...course.modules];
        newModules[moduleIndex].lessons = newModules[moduleIndex].lessons.filter((_, index) => index !== lessonIndex);
        setCourse(prevCourse => ({ ...prevCourse, modules: newModules }));
    };

    const addLearningObjective = () => {
        setCourse(prevCourse => ({
            ...prevCourse,
            learningObjectives: [...prevCourse.learningObjectives, '']
        }));
    };

    const removeLearningObjective = (index) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            learningObjectives: prevCourse.learningObjectives.filter((_, i) => i !== index)
        }));
    };

    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateCourse(courseId, course, authToken);
            console.log(response.data)
            toast.success("Course updated successfully");
            navigate(`/courses/${courseId}`);
        } catch (err) {
            console.log(err);
            toast.error(getErrorMessage(err, "Failed to update course"));
        }
    };

    if (loading) return <Loader />;
    if (error) return (
        <EmptyState
            variant="error"
            title="Couldn't load course"
            message={error.message || "Something went wrong. Please try again."}
            actionLabel="Go Back"
            actionTo="/courses"
        />
    );
    if (!course) return (
        <EmptyState
            variant="not-found"
            title="Course not found"
            message="The course you're trying to update doesn't exist."
            actionLabel="Browse Courses"
            actionTo="/courses"
        />
    );

    return (
        <div className="update-course-page">
            <h1>Update Course</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={course.title}
                    onChange={handleChange}
                    required
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    required
                />

                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={course.category}
                    onChange={handleChange}
                    required
                />

                <label>Image URL:</label>
                <input
                    type="text"
                    name="image"
                    value={course.image}
                    onChange={handleChange}
                    required
                />

                <label>Duration:</label>
                <input
                    type="text"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                    required
                />

                <label>Students:</label>
                <input
                    type="number"
                    name="students"
                    value={course.students}
                    onChange={handleChange}
                    required
                />

                <label>Rating:</label>
                <input
                    type="number"
                    name="rating"
                    value={course.rating}
                    onChange={handleChange}
                    required
                    min="0"
                    max="5"
                />

                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={course.price}
                    onChange={handleChange}
                    required
                />

                <div className="learning-objectives-section">
                    <div className="section-header">
                        <label>Learning Objectives:</label>
                        <button type="button" onClick={addLearningObjective}>Add Objective</button>
                    </div>
                    {course.learningObjectives.map((objective, index) => (
                        <div key={index} className="objective-item">
                            <input
                                type="text"
                                value={objective}
                                onChange={(e) => handleChange({
                                    target: {
                                        name: `learningObjective${index}`,
                                        value: e.target.value
                                    }
                                })}
                                required
                            />
                            <button type="button" onClick={() => removeLearningObjective(index)}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="modules-section">
                    <div className="section-header">
                        <label>Modules:</label>
                        <button type="button" onClick={addModule}>Add Module</button>
                    </div>
                    {course.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="module-item">
                            <div className="module-header">
                                <h3>Module {moduleIndex + 1}</h3>
                                <button type="button" onClick={() => removeModule(moduleIndex)}>Remove Module</button>
                            </div>

                            <label>Module Title:</label>
                            <input
                                type="text"
                                value={module.title}
                                onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                                required
                            />

                            <label>Module Duration:</label>
                            <input
                                type="text"
                                value={module.duration}
                                onChange={(e) => handleModuleChange(moduleIndex, 'duration', e.target.value)}
                                required
                            />

                            <div className="lessons-section">
                                <div className="section-header">
                                    <label>Lessons:</label>
                                    <button type="button" onClick={() => addLesson(moduleIndex)}>Add Lesson</button>
                                </div>
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex} className="lesson-item">
                                        <div className="lesson-header">
                                            <h4>Lesson {lessonIndex + 1}</h4>
                                            <button type="button" onClick={() => removeLesson(moduleIndex, lessonIndex)}>
                                                Remove Lesson
                                            </button>
                                        </div>

                                        <label>Lesson Title:</label>
                                        <input
                                            type="text"
                                            value={lesson.title}
                                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'title', e.target.value)}
                                            required
                                        />

                                        <label>Lesson Duration:</label>
                                        <input
                                            type="text"
                                            value={lesson.duration}
                                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'duration', e.target.value)}
                                            required
                                        />

                                        <label>Lesson Video URL:</label>
                                        <input
                                            type="text"
                                            value={lesson.videoUrl}
                                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'videoUrl', e.target.value)}
                                            required
                                        />

                                        <label>Lesson Description:</label>
                                        <textarea
                                            value={lesson.description}
                                            onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, 'description', e.target.value)}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button type="submit">Update Course</button>
            </form>
        </div>
    );
};

export default UpdateCoursePage;