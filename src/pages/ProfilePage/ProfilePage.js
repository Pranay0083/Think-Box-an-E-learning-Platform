import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit2, Mail, LogOut, Trash2, User, Book } from 'lucide-react';
import { deleteUser, getCurrentUser, logout, updateUser } from '../../services/api';
import EditUserModal from './EditModal/Modal';
import './ProfilePage.css'
import Loader from '../../components/common/Loader/Loader';
import { useToast } from '../../components/common/Toast/ToastProvider';
import getErrorMessage from '../../utils/getErrorMessage';
import ConfirmDialog from '../../components/common/Modal/ConfirmDialog';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();

  const authToken = localStorage.getItem("authToken") || sessionStorage.getItem('authToken');
  const userId = localStorage.getItem("userID") || sessionStorage.getItem("userID");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getCurrentUser(authToken);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
        console.log(err);
      }
    };
    fetchUserData();
  }, [authToken]);

  const handleSave = async (formData) => {
    if (!formData || typeof formData !== 'object') {
      toast.error('Invalid form data provided');
      return;
    }

    if (!id) {
      toast.error('User ID is required');
      return;
    }

    if (!authToken) {
      toast.error('Authentication token is missing');
      return;
    }

    try {
      setLoading(true);
      setError(null); // Clear any previous errors

      // Function to remove empty values from an object
      const removeEmptyValues = (obj) => {
        const newObj = {};
        Object.entries(obj).forEach(([key, value]) => {
          // Handle arrays
          if (Array.isArray(value)) {
            if (value.length > 0) {
              // Filter out empty strings from arrays
              const filteredArray = value.filter(item =>
                item !== null &&
                item !== undefined &&
                String(item).trim() !== ''
              );
              if (filteredArray.length > 0) {
                newObj[key] = filteredArray;
              }
            }
          }
          // Handle nested objects
          else if (value && typeof value === 'object') {
            const cleanedNestedObj = removeEmptyValues(value);
            if (Object.keys(cleanedNestedObj).length > 0) {
              newObj[key] = cleanedNestedObj;
            }
          }
          // Handle primitive values
          else if (
            value !== null &&
            value !== undefined &&
            String(value).trim() !== ''
          ) {
            newObj[key] = value;
          }
        });
        return newObj;
      };

      // Process achievements
      const processedFormData = {
        ...formData,
        achievements: formData.achievements
          ? String(formData.achievements)
            .split(',')
            .map(achievement => achievement.trim())
            .filter(achievement => achievement !== '')
          : []
      };

      const cleanedFormData = removeEmptyValues(processedFormData);

      const response = await updateUser(id, cleanedFormData, authToken);

      if (!response || !response.data) {
        throw new Error('Invalid response from server');
      }

      setUserData(response.data);
      setIsEditModalOpen(false);
      toast.success("Profile updated successfully");

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred while saving';
      setError(errorMessage);
      console.error('Save Error:', error);
      toast.error(errorMessage);

    } finally {
      setLoading(false);
    }
  };


  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await deleteUser(userId, authToken);
      toast.success("Account deleted successfully");
      localStorage.clear();
      navigate('/');
      window.location.reload();
    } catch (err) {
      const message = getErrorMessage(err, "Failed to delete account");
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    console.log(error)
  }

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar">
            <img
              src={userData.image || 'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg'}
              alt={userData.name || 'Profile'}
            />
            {/* <button className="camera-btn">
              <Camera size={20} />
            </button> */}
          </div>
        </div>
        <div className="profile-info">
          <div className="info-header">
            <h1>{String(userData.name).charAt(0).toUpperCase() + String(userData.name).slice(1)}</h1>
            <span className="text-sm text-gray-500">{String(userData.role).charAt(0).toUpperCase() + String(userData.role).slice(1)}</span>
            <button
              className="edit-profile-btn"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
            <button
              className="edit-profile-btn"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
            <button
              className="edit-profile-btn"
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: "red" }}
            >
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>
          <div className="basic-info">
            {userData.email && (
              <div className="info-item">
                <Mail size={16} />
                <span>{userData.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} />
            Profile
          </button>
          {userData.role === 'teacher' && (
            <button
              className={`tab-btn ${activeTab === 'teaching' ? 'active' : ''}`}
              onClick={() => setActiveTab('teaching')}
            >
              <Book size={20} />
              Teaching
            </button>
          )}
          {/* <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            Settings
          </button> */}
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="section-card">
                <h2>Bio</h2>
                {userData.bio ? (
                  <p>{userData.bio}</p>
                ) : (<p>Bio not written</p>)
                }
              </div>

              <div className="section-card">
                <h2>About</h2>
                {userData.about ? (
                  <p>{userData.about}</p>
                ) : (
                  <p>About not written</p>
                )}
              </div>


              <div className="section-card">
                <h2>Achievements</h2>
                {userData.achievements && userData.achievements.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {userData.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No achievements listed</p>
                )}
              </div>


              <div className="section-card">
                <h2>Social Links</h2>
                {userData.socialLinks ? (
                  <div className="social-links">
                    {userData.socialLinks.linkedin ? (
                      <a
                        href={userData.socialLinks.linkedin}
                        className="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    ) : null}
                    {userData.socialLinks.twitter ? (
                      <a
                        href={userData.socialLinks.twitter}
                        className="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <p>No social links provided</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'teaching' && userData.role === 'teacher' && (
            <div className="teaching-section">
              <div className="stats-grid">
                {userData.rating !== undefined && (
                  <div className="stat-card">
                    <div className="stat-value">{userData.rating.toFixed(1)}</div>
                    <div className="stat-label">Rating</div>
                  </div>
                )}
                {userData.students !== undefined && (
                  <div className="stat-card">
                    <div className="stat-value">{userData.students}</div>
                    <div className="stat-label">Students</div>
                  </div>
                )}
                {userData.courses !== undefined && (
                  <div className="stat-card">
                    <div className="stat-value">{userData.courses}</div>
                    <div className="stat-label">Courses</div>
                  </div>
                )}
              </div>
              {userData.expertise && (
                <div className="section-card">
                  <h2>Expertise</h2>
                  <p>{userData.expertise}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this Account?"
        confirmText={loading ? "Deleting..." : "Confirm"}
        cancelText="Cancel"
        variant="danger"
        confirmDisabled={loading}
        onConfirm={handleDeleteAccount}
        onClose={() => setIsModalOpen(false)}
      />

      {isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={userData}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProfilePage;