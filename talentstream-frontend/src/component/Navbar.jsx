import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getUserInfo, getNotifications, getMessages } from '../services/auth'; // example service functions

const NavIcon = ({ className }) => (
  <i className={`${className} pe-4`} />
);

const Navbar = () => {
  const [user, setUser] = useState(null); // stores user info & role
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch user info on mount
  useEffect(() => {
    async function fetchUserData() {
      const userInfo = await getUserInfo(); // fetch user info (name, role, avatar)
      setUser(userInfo);

      const notifs = await getNotifications();
      setNotifications(notifs);
      setUnreadNotifications(notifs.filter(n => !n.read).length);

      const msgs = await getMessages();
      setMessages(msgs);
      setUnreadMessages(msgs.filter(m => !m.read).length);
    }
    fetchUserData();
  }, []);

  if (!user) return null; // or a loader

  return (
    <div className="header">
      {/* Left: Menu + Search */}
      <div className="header-left">
        <div className="menu-icon">
          <i className="bi bi-list" />
        </div>

        <div className="search-toggle-icon" data-toggle="header_search">
          <i className="bi bi-search" />
        </div>

        <div className="header-search">
          <form>
            <div className="form-group mb-0">
              <i className="bi bi-search search-icon" />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search Here"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Right: Settings, Notifications, Messages, User */}
      <div className="header-right">
        {/* Settings */}
        <div className="dashboard-setting user-notification">
          <div className="dropdown">
            <a className="dropdown-toggle no-arrow" href="#" data-toggle="right-sidebar">
              <i className="bi bi-gear" />
            </a>
          </div>
        </div>

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
                  {notifications.map((notif, index) => (
                    <li key={index}>
                      <a href={notif.link || '#'}>
                        <h3>{notif.title}</h3>
                        <p>{notif.message}</p>
                      </a>
                    </li>
                  ))}
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
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <a href={`/messages/${msg.id}`}>
                        <img src={msg.avatar} alt="" />
                        <h3>{msg.sender}</h3>
                        <p>{msg.text}</p>
                      </a>
                    </li>
                  ))}
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
                <img src={user.avatar} alt="" />
              </span>
              <span className="user-name">{user.name}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <Link to="/my-account" className="dropdown-item">
                <NavIcon className="bi bi-key" /> <span style={{ marginLeft: 17 }}>My Account</span>
              </Link>
              <Link to="/profile" className="dropdown-item">
                <NavIcon className="bi bi-person" /><span style={{ marginLeft: 17 }}>Profile</span>
              </Link>
              <Link to="/profile-setting" className="dropdown-item">
                <NavIcon className="bi bi-gear" /><span style={{ marginLeft: 17 }}>Setting</span>
              </Link>
              {user.role === 'admin' && (
                <Link to="/reports" className="dropdown-item">
                  <NavIcon className="bi bi-bar-chart-line" /><span style={{ marginLeft: 17 }}>Reports</span>
                </Link>
              )}
              <Link to="/help" className="dropdown-item">
                <NavIcon className="bi bi-question-circle" /><span style={{ marginLeft: 17 }}>Help</span>
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
