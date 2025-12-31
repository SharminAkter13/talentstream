import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getUserInfo } from '../services/auth'; 

const Navbar = () => {
  const [user, setUser] = useState(null); 
  const [notifications, setNotifications] = useState([]);
  const [contacts, setContacts] = useState([]); // Used for message dropdown
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // 1. Fetch Notifications
      const notifRes = await axios.get('/api/notifications');
      if (Array.isArray(notifRes.data)) {
        setNotifications(notifRes.data);
        setUnreadNotifications(notifRes.data.filter(n => !n.is_read).length);
      }

      // 2. Fetch Contacts (Recent Chats)
      // Hits MessageController@getContacts to get people who messaged you
      const contactRes = await axios.get('/api/chat/contacts'); 
      if (Array.isArray(contactRes.data)) {
        setContacts(contactRes.data);
        // Sum unread counts from all contacts
        const totalUnread = contactRes.data.reduce((acc, c) => acc + (c.unread_count || 0), 0);
        setUnreadMessages(totalUnread);
      }
    } catch (error) {
      console.error("Navbar data fetch error:", error);
    }
  };

  useEffect(() => {
    async function init() {
      const userInfo = await getUserInfo();
      setUser(userInfo);
      await fetchData();
    }
    init();

    // Auto-refresh every 60 seconds to keep badges updated
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle clicking a notification
  const handleNotificationClick = async (e, notif) => {
    e.preventDefault();
    try {
      await axios.post(`/api/notifications/${notif.id}/read`);
      fetchData(); // Refresh badges
      navigate(`/notification-detail/${notif.id}`);
    } catch (err) {
      navigate(`/notification-detail/${notif.id}`);
    }
  };

  if (!user) return <div className="header">Loading...</div>; 

  return (
    <div className="header">
      <div className="header-left">
        <div className="menu-icon dw dw-menu"></div>
        {/* You can add a search bar here if needed */}
      </div>

      <div className="header-right">
        
        {/* --- MESSAGES DROPDOWN --- */}
        
        <div className="user-notification">
          <div className="dropdown">
            <a className="dropdown-toggle no-arrow" href="#" data-toggle="dropdown">
              <i className="bi bi-chat-left-dots" />
              {unreadMessages > 0 && (
                <span className="badge badge-primary" style={badgeStyle}>{unreadMessages}</span>
              )}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="notification-list mx-h-350 customscroll">
                <ul>
                  {contacts.length > 0 ? (
                    contacts.slice(0, 5).map((contact) => (
                      <li key={contact.id} className={contact.unread_count > 0 ? "bg-light" : ""}>
                        <Link to={`/messages/${contact.id}`}>
                          <div className="d-flex align-items-center">
                             <img 
                               src={contact.avatar || '/assets/admin/vendors/images/photo1.jpg'} 
                               style={avatarStyle} 
                               alt="" 
                             />
                             <div style={{ flex: 1 }}>
                               <h3 style={titleStyle}>
                                 {contact.name}
                                 {contact.unread_count > 0 && (
                                   <span className="badge badge-primary float-right" style={{fontSize: '10px'}}>
                                     {contact.unread_count}
                                   </span>
                                 )}
                               </h3>
                               <p style={msgStyle}>
                                 {contact.last_message ? contact.last_message.message.substring(0, 35) + '...' : "Start a conversation"}
                               </p>
                             </div>
                          </div>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="p-3 text-center">No recent messages</li>
                  )}
                </ul>
                <div className="text-center pt-2">
                   <Link to="/messages" className="btn btn-sm btn-link text-primary">View All Messages</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- NOTIFICATIONS DROPDOWN --- */}
        <div className="user-notification">
          <div className="dropdown">
            <a className="dropdown-toggle no-arrow" href="#" data-toggle="dropdown">
              <i className="bi bi-bell" />
              {unreadNotifications > 0 && (
                <span className="badge badge-danger" style={badgeStyle}>{unreadNotifications}</span>
              )}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="notification-list mx-h-350 customscroll">
                <ul>
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notif) => (
                      <li key={notif.id} className={!notif.is_read ? "bg-light" : ""}>
                        <a href="#" onClick={(e) => handleNotificationClick(e, notif)}>
                          <h3 style={titleStyle}>{notif.title}</h3>
                          <p style={msgStyle}>{notif.message}</p>
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="p-3 text-center">No new notifications</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* --- USER PROFILE DROPDOWN --- */}
        <div className="user-info-dropdown">
          <div className="dropdown">
            <a className="dropdown-toggle" href="#" data-toggle="dropdown">
              <span className="user-icon">
                <img src={user.avatar || '/assets/admin/vendors/images/photo1.jpg'} alt="" />
              </span>
              <span className="user-name">{user.name}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <Link className="dropdown-item" to="/profile"><i className="dw dw-user1"></i> Profile</Link>
              <Link className="dropdown-item" to="/profile-setting"><i className="dw dw-help"></i> Settings</Link>
              <Link className="dropdown-item" to="/logout"><i className="dw dw-logout"></i> Log Out</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STYLES ---
const badgeStyle = {
  position: 'absolute', top: '-5px', right: '12px', borderRadius: '50%', 
  padding: '2px 6px', fontSize: '10px', fontWeight: 'bold'
};
const avatarStyle = { width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', objectFit: 'cover' };
const titleStyle = { fontSize: '13px', fontWeight: '600', marginBottom: '2px', color: '#333' };
const msgStyle = { fontSize: '12px', color: '#666', margin: 0 };

export default Navbar;