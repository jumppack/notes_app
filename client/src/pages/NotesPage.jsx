import React from 'react';
import { useAuth } from '../context/AuthContext';

const NotesPage = () => {
  const { user, logout } = useAuth() || {};

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', color: '#111827' }}>My Notes</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.875rem' }}>
            Welcome back, <strong>{user?.username || 'user'}</strong>!
          </p>
        </div>
        <button 
          onClick={logout}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: '#9ca3af', padding: '4rem 0', border: '2px dashed #e5e7eb', borderRadius: '12px' }}>
        <p style={{ fontSize: '1.125rem', margin: 0 }}>No notes yet.</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>We will implement the Notes loading and creating layer in the next step!</p>
      </div>
    </div>
  );
};

export default NotesPage;
