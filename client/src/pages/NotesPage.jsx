import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../hooks/useNotes';

const NotesPage = () => {
  const { user, logout } = useAuth();
  const { 
    notes,
    isLoading,
    isError,
    createNote,
    updateNote,
    deleteNote,
    isCreating,
    isUpdating,
    isDeleting
  } = useNotes();

  // Create Note Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Edit Note State
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') return;
    createNote({ title, content });
    setTitle('');
    setContent('');
  };

  // Handle saving an inline edited note
  const handleSaveEdit = (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    updateNote({ id, title: editTitle, content: editContent });
    setEditingId(null);
  };

  // Start inline editing mode for a specific note card
  const handleStartEdit = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '2rem' }}>
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

      {/* Create Note Form */}
      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Create New Note</h3>
        <form onSubmit={handleAddNote}>
          
          <div style={{ marginBottom: '1rem' }}>
            <input 
              type="text" 
              placeholder="Note Title"
              onChange = {(e) => setTitle(e.target.value)}
              value = {title}
              disabled={isCreating}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <textarea 
              placeholder="Write your note content here..."
              rows={4}
              onChange = {(e) => setContent(e.target.value)}
              value = {content}
              disabled={isCreating}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', resize: 'vertical', outline: 'none' }}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isCreating}
            style={{ padding: '0.75rem 1.5rem', backgroundColor: isCreating ? '#9ca3af' : '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: isCreating ? 'not-allowed' : 'pointer', fontWeight: '600' }}
          >
            {isCreating ? 'Adding...' : 'Add Note'}
          </button>
        </form>
      </div>

      {/* Notes List section */}
      <div>
        <h3>Notes List</h3>
        {isLoading && <p>Loading notes...</p>}
        {isError && <p style={{ color: '#ef4444' }}>Failed to load notes.</p>}
        {!isLoading && !isError && notes.length === 0 && (
          <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>No notes found. Create your first note above!</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          {notes.map( (note) => {
            if(note.id == editingId){
              return (
                <div key = {note.id}>
                  <input type = 'text' value = {editTitle} onChange={(e) => setEditTitle(e.target.value)} disabled={isUpdating} />
                  <input type = 'text' value = {editContent} onChange={(e) => setEditContent(e.target.value)} disabled={isUpdating} />
                  <button onClick={() => handleSaveEdit(note.id)} disabled={isUpdating}>
                    {isUpdating ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setEditingId(null)} disabled={isUpdating}>Cancel</button>
                </div>
              )
            }else{
              return (
                <div key = {note.id}>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <button onClick={() => handleStartEdit(note)} disabled={isDeleting || isUpdating}>Edit</button>
                  <button onClick={() => deleteNote(note.id)} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
