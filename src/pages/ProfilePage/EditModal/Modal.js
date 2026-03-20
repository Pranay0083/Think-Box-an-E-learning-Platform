import React, { useState, useEffect } from 'react';
import './Modal.css';
import { useToast } from '../../../components/common/Toast/ToastProvider';

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        image: '',
        expertise: '',
        bio: '',
        about: '',
        achievements: [],
        socialLinks: {
            linkedin: '',
            twitter: ''
        },
        email: ''
    });

    // Initialize form data when user prop changes
    useEffect(() => {
        setFormData({
            name: user?.name || '',
            role: user?.role || '',
            image: user?.image || '',
            expertise: user?.expertise || '',
            bio: user?.bio || '',
            about: user?.about || '',
            achievements: user?.achievements || [],
            socialLinks: {
                linkedin: user?.socialLinks?.linkedin || '',
                twitter: user?.socialLinks?.twitter || ''
            },
            email: user?.email || ''
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSocialLinkChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            socialLinks: {
                ...prevData.socialLinks,
                [name]: value
            }
        }));
    };

    const handleAchievementsChange = (e) => {
        const achievementsArray = e.target.value
            .split(',')
            .map(item => item.trim())
            .filter(item => item !== '');
        
        setFormData(prevData => ({
            ...prevData,
            achievements: achievementsArray
        }));
    };

    const validateForm = () => {
        // Basic validation
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return false;
        }

        if (!formData.email.trim()) {
            toast.error('Email is required');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }

        // URL validation for image and social links
        const urlRegex = /^https?:\/\/.+/;
        if (formData.image && !urlRegex.test(formData.image)) {
            toast.error('Please enter a valid image URL');
            return false;
        }

        if (formData.socialLinks.linkedin && !urlRegex.test(formData.socialLinks.linkedin)) {
            toast.error('Please enter a valid LinkedIn URL');
            return false;
        }

        if (formData.socialLinks.twitter && !urlRegex.test(formData.socialLinks.twitter)) {
            toast.error('Please enter a valid Twitter URL');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Image URL:</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://"
                        />
                    </div>

                    {user?.role === "teacher" && (
                        <div className="form-group">
                            <label>Expertise:</label>
                            <input
                                type="text"
                                name="expertise"
                                value={formData.expertise}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Bio:</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>About:</label>
                        <textarea
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Achievements (comma-separated):</label>
                        <textarea
                            name="achievements"
                            value={formData.achievements.join(', ')}
                            onChange={handleAchievementsChange}
                            rows="2"
                            placeholder="Enter achievements separated by commas"
                        />
                    </div>

                    <div className="form-group">
                        <label>LinkedIn URL:</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.socialLinks.linkedin}
                            onChange={handleSocialLinkChange}
                            placeholder="https://"
                        />
                    </div>

                    <div className="form-group">
                        <label>Twitter URL:</label>
                        <input
                            type="url"
                            name="twitter"
                            value={formData.socialLinks.twitter}
                            onChange={handleSocialLinkChange}
                            placeholder="https://"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="modal-buttons">
                        <button type="submit" className="save-btn">
                            Save
                        </button>
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;