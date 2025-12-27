import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getUserInfo, getNotifications, getMessages } from '../services/auth'; 

const NavIcon = ({ className }) => (
  <i className={`${className} pe-4`} />
);

const Navbar = () => {
  const [user, setUser] = useState(null); 
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // 1. Fetch User Info
        const userInfo = await getUserInfo();
        setUser(userInfo);

        // 2. Fetch Notifications with Error Handling
        const notifs = await getNotifications();
        // Check if notifs is a valid array before filtering
        if (Array.isArray(notifs)) {
          setNotifications(notifs);
          setUnreadNotifications(notifs.filter(n => !n.read_at).length);
        } else {
          setNotifications([]);
        }

        // 3. Fetch Messages with Error Handling
        const msgs = await getMessages();
        // Check if msgs is a valid array before filtering
        if (Array.isArray(msgs)) {
          setMessages(msgs);
          setUnreadMessages(msgs.filter(m => !m.read).length);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Data fetching error:", error);
        // Set default values to prevent crashes if the server returns 500
        setNotifications([]);
        setMessages([]);
      }
    }
    fetchUserData();
  }, []);

  // Return a simple loader or empty div instead of null to prevent layout shifts
  if (!user) return <div className="header">Loading...</div>; 

  return (
    <div className="header">
      {/* ... Left side remains the same ... */}
      <div className="header-left">
         {/* ... search content ... */}
      </div>

      <div className="header-right">
        {/* Notifications */}
        <div className="user-notification">
          <div className="dropdown">
            <a className="dropdown-toggle no-arrow" href="#" data-toggle="dropdown">
              <i className="bi bi-bell" />
              {unreadNotifications > 0 && <span className="badge notification-active" />}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="notification-list mx-h-350 customscroll">
                <ul>
                  {/* Safely map notifications */}
                  {notifications.length > 0 ? (
                    notifications.map((notif, index) => (
                      <li key={index}>
                        <a href={notif.link || '#'}>
                          <h3>{notif.data?.title || "Notification"}</h3>
                          <p>{notif.data?.message || "No details available"}</p>
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

        {/* Messages */}
        <div className="user-messages">
          <div className="dropdown">
            <a className="dropdown-toggle no-arrow" href="#" data-toggle="dropdown">
              <i className="bi bi-chat-left-text" />
              {unreadMessages > 0 && <span className="badge message-active" />}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="notification-list mx-h-350 customscroll">
                <ul>
                  {/* Safely map messages */}
                  {messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <li key={index}>
                        <a href={`/messages/${msg.id}`}>
                          <img src={msg.avatar || 'default-avatar.png'} alt="" />
                          <h3>{msg.sender}</h3>
                          <p>{msg.text}</p>
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="p-3 text-center">No new messages</li>
                  )}
                </ul>
                <div className="text-center pt-2 pb-0">
                  <Link to="/messages" className="btn btn-sm btn-primary">View All Messages</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="user-info-dropdown">
          <div className="dropdown">
            <a className="dropdown-toggle" href="#" data-toggle="dropdown">
              <span className="user-icon">
                <img src={user.avatar || 'default-avatar.png'} alt="" />
              </span>
              <span className="user-name">{user.name}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <Link to="/login" className="dropdown-item">
                <NavIcon className="bi bi-key" /> <span style={{ marginLeft: 17 }}>My Account</span>
              </Link>
              <Link to="/logout" className="dropdown-item">
                <NavIcon className="bi bi-box-arrow-right" /><span style={{ marginLeft: 17 }}>Log Out</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;