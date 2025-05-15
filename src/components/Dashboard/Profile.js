import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setFormData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), formData);
      setUserData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!userData) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>{userData.role === 'admin' ? 'Admin' : 'Farmer'} Profile</h2>
      
      {/* Common Profile Fields */}
      <div className="profile-section">
        <h3>Basic Information</h3>
        {isEditing ? (
          <>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={auth.currentUser.email} disabled />
            </div>
            <div className="form-group">
              <label>Farm Name</label>
              <input
                type="text"
                name="farmName"
                value={formData.farmName || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            <p><strong>Email:</strong> {auth.currentUser.email}</p>
            <p><strong>Farm Name:</strong> {userData.farmName || 'Not specified'}</p>
            <p><strong>Location:</strong> {userData.location || 'Not specified'}</p>
          </>
        )}
      </div>

      {/* Farmer-Specific Fields */}
      {userData.role === 'farmer' && (
        <div className="profile-section">
          <h3>Farm Details</h3>
          {isEditing ? (
            <>
              <div className="form-group">
                <label>Main Crop</label>
                <input
                  type="text"
                  name="mainCrop"
                  value={formData.mainCrop || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Farm Size (acres)</label>
                <input
                  type="number"
                  name="farmSize"
                  value={formData.farmSize || ''}
                  onChange={handleInputChange}
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Main Crop:</strong> {userData.mainCrop || 'Not specified'}</p>
              <p><strong>Farm Size:</strong> {userData.farmSize ? `${userData.farmSize} acres` : 'Not specified'}</p>
            </>
          )}
        </div>
      )}

      {/* Admin-Specific Fields */}
      {userData.role === 'admin' && (
        <div className="profile-section">
          <h3>Administration</h3>
          <p><strong>Role:</strong> System Administrator</p>
          <p><strong>Access Level:</strong> Full system access</p>
          {isEditing && (
            <div className="form-group">
              <label>Admin Notes</label>
              <textarea
                name="adminNotes"
                value={formData.adminNotes || ''}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
          )}
        </div>
      )}

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn-save">Save Changes</button>
            <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-edit">Edit Profile</button>
        )}
      </div>
    </div>
  );
}