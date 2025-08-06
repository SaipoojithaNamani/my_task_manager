import React, { useState, useContext, createContext, useEffect } from 'react';

// Context for state management
const TaskContext = createContext();

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

// Task Provider Component
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Welcome to Your Magical Task Manager! ✨",
      description: "This is your first enchanted sticky note. Watch the magic happen as you complete tasks!",
      completed: false,
      priority: "medium",
      category: "personal",
      dueDate: "2024-08-10",
      createdAt: new Date().toISOString(),
      color: "yellow"
    },
    {
      id: 2,
      title: "Build Something Amazing 🚀",
      description: "Create the most beautiful task manager with stunning animations and smooth interactions.",
      completed: true,
      priority: "high",
      category: "work",
      dueDate: "2024-08-08",
      createdAt: new Date().toISOString(),
      color: "pink"
    },
    {
      id: 3,
      title: "Celebrate Small Wins 🎉",
      description: "Remember to appreciate every completed task - you're making progress!",
      completed: false,
      priority: "low",
      category: "personal",
      dueDate: "2024-08-12",
      createdAt: new Date().toISOString(),
      color: "green"
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('board');

  const addTask = (task) => {
    const colors = ['yellow', 'pink', 'blue', 'green', 'purple', 'orange', 'teal', 'rose'];
    const newTask = {
      ...task,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesFilter = filter === 'all' || 
        (filter === 'completed' && task.completed) ||
        (filter === 'pending' && !task.completed) ||
        (filter === task.priority) ||
        (filter === task.category);
      
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  };

  return (
    <TaskContext.Provider value={{
      tasks: getFilteredTasks(),
      allTasks: tasks,
      filter,
      setFilter,
      searchTerm,
      setSearchTerm,
      currentView,
      setCurrentView,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete
    }}>
      {children}
    </TaskContext.Provider>
  );
};

// Icon Components
const IconPlus = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconEdit = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m18 2 4 4-14 14H4v-4L18 2z"></path>
  </svg>
);

const IconTrash = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"></polyline>
    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
  </svg>
);

const IconCheckCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22,4 12,14.01 9,11.01"></polyline>
  </svg>
);

const IconCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const IconFilter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"></polygon>
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pulse ${3 + Math.random() * 2}s infinite ${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

// Celebration Animation Component
const CelebrationEffect = ({ show, onComplete }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ fontSize: '4rem', animation: 'bounce 1s infinite' }}>🎉</div>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            left: `${50 + (Math.random() - 0.5) * 40}%`,
            top: `${50 + (Math.random() - 0.5) * 40}%`,
            animation: `ping 1s infinite ${Math.random() * 0.5}s`
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
};

// Enhanced Sticky Note Component
const StickyNote = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const getColorGradient = (color) => {
    const gradients = {
      yellow: 'linear-gradient(135deg, #FEF3C7, #FDE047, #FACC15)',
      pink: 'linear-gradient(135deg, #FCE7F3, #F9A8D4, #EC4899)',
      blue: 'linear-gradient(135deg, #DBEAFE, #60A5FA, #3B82F6)',
      green: 'linear-gradient(135deg, #D1FAE5, #6EE7B7, #10B981)',
      purple: 'linear-gradient(135deg, #E9D5FF, #C4B5FD, #8B5CF6)',
      orange: 'linear-gradient(135deg, #FED7AA, #FB923C, #EA580C)',
      teal: 'linear-gradient(135deg, #CCFBF1, #5EEAD4, #14B8A6)',
      rose: 'linear-gradient(135deg, #FFE4E6, #FB7185, #E11D48)'
    };
    return gradients[color] || gradients.yellow;
  };

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    if (!task.completed) {
      setIsCompleting(true);
      setShowCelebration(true);
      setTimeout(() => {
        onToggleComplete(task.id);
        setIsCompleting(false);
      }, 800);
    } else {
      onToggleComplete(task.id);
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const rotationAngle = Math.random() * 8 - 4;

  const noteStyle = {
    position: 'relative',
    padding: '24px',
    borderRadius: '16px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    background: getColorGradient(task.color),
    transform: `rotate(${rotationAngle}deg) ${isHovered ? 'scale(1.1) translateY(-8px)' : 'scale(1)'} ${isCompleting ? 'scale(1.25) rotate(12deg)' : ''}`,
    transition: 'all 0.5s ease',
    cursor: 'pointer',
    minHeight: '224px',
    maxWidth: '288px',
    boxShadow: isHovered 
      ? '0 25px 50px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.5)' 
      : '0 15px 30px rgba(0,0,0,0.1)',
    opacity: task.completed ? 0.8 : 1,
    filter: isCompleting ? 'blur(2px)' : 'none'
  };

  return (
    <>
      <CelebrationEffect 
        show={showCelebration} 
        onComplete={() => setShowCelebration(false)} 
      />
      <div
        style={noteStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tape effect */}
        <div style={{
          position: 'absolute',
          top: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '32px',
          background: 'linear-gradient(to bottom, white, #f3f4f6)',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          opacity: 0.8
        }} />
        
        {/* Corner fold */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '24px',
          height: '24px',
          background: 'rgba(255, 255, 255, 0.2)',
          transform: 'rotate(45deg) translateX(12px) translateY(-12px)',
          borderRadius: '2px'
        }} />
        
        {/* Priority indicator */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          fontSize: '18px'
        }}>
          {getPriorityIcon(task.priority)}
        </div>

        {/* Sparkle for completed */}
        {task.completed && (
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            fontSize: '20px',
            animation: 'spin 2s linear infinite'
          }}>
            ✨
          </div>
        )}

        {/* Task content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <button
              onClick={handleToggleComplete}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginRight: '12px',
                marginTop: '4px',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                position: 'relative',
                zIndex: 20
              }}
            >
              {task.completed ? (
                <div style={{ position: 'relative' }}>
                  <div style={{ color: '#10B981', animation: 'pulse 2s infinite' }}>
                    <IconCheckCircle />
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '24px',
                    height: '24px',
                    background: '#34D399',
                    borderRadius: '50%',
                    animation: 'ping 1s infinite',
                    opacity: 0.3
                  }} />
                </div>
              ) : (
                <div style={{ color: isHovered ? '#10B981' : '#6B7280', transition: 'color 0.3s' }}>
                  <IconCircle />
                </div>
              )}
            </button>
            <h3 style={{
              fontWeight: 'bold',
              color: '#1F2937',
              fontSize: '14px',
              lineHeight: '1.4',
              margin: 0,
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.7 : 1,
              transform: task.completed ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
              {task.title}
            </h3>
          </div>

          <p style={{
            fontSize: '12px',
            color: '#374151',
            lineHeight: '1.5',
            margin: 0,
            textDecoration: task.completed ? 'line-through' : 'none',
            opacity: task.completed ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}>
            {task.description}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#4B5563'
          }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.6)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontWeight: '500',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              {task.category === 'personal' ? '👤' : task.category === 'work' ? '💼' : task.category === 'shopping' ? '🛒' : task.category === 'health' ? '🏥' : task.category === 'finance' ? '💰' : task.category === 'learning' ? '📚' : '🎨'} {task.category}
            </span>
            {task.dueDate && (
              <span style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.4)',
                padding: '4px 8px',
                borderRadius: '20px'
              }}>
                <IconCalendar />
                <span style={{ marginLeft: '4px' }}>{new Date(task.dueDate).toLocaleDateString()}</span>
              </span>
            )}
          </div>
        </div>

        {/* Action buttons overlay */}
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  color: '#3B82F6'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <IconEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  color: '#EF4444'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <IconTrash />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Task Modal Component
const TaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    dueDate: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        category: task.category || 'personal',
        dueDate: task.dueDate || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: 'personal',
        dueDate: ''
      });
    }
  }, [task, isOpen]);

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '512px',
        transform: 'scale(1)',
        border: '1px solid #f3f4f6'
      }}>
        <div style={{
          padding: '32px',
          borderBottom: '1px solid #f3f4f6',
          background: 'linear-gradient(to right, #eff6ff, #f3e8ff)',
          borderRadius: '24px 24px 0 0'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            margin: 0
          }}>
            <div style={{ marginRight: '12px', color: task ? '#2563eb' : '#7c3aed' }}>
              {task ? <IconEdit /> : <IconPlus />}
            </div>
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
        </div>
        
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What needs to be done? ✨"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = '#d1d5db';
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add some magical details... 🪄"
              rows="4"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                resize: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = '#d1d5db';
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  background: 'white',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#d1d5db';
                }}
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  background: 'white',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = '#d1d5db';
                }}
              >
                <option value="personal">👤 Personal</option>
                <option value="work">💼 Work</option>
                <option value="shopping">🛒 Shopping</option>
                <option value="health">🏥 Health</option>
                <option value="finance">💰 Finance</option>
                <option value="learning">📚 Learning</option>
                <option value="creative">🎨 Creative</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = '#d1d5db';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', paddingTop: '24px' }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px 24px',
                border: '2px solid #d1d5db',
                borderRadius: '12px',
                background: 'white',
                color: '#374151',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f9fafb';
                e.target.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#d1d5db';
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: '12px 24px',
                border: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #1d4ed8, #6d28d9)';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {task ? '✨ Update Task' : '🚀 Create Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = () => {
  const { searchTerm, setSearchTerm, filter, setFilter, allTasks } = useTaskContext();
  
  const completedCount = allTasks.filter(task => task.completed).length;
  const totalCount = allTasks.length;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      borderRadius: '24px',
      padding: '32px',
      marginBottom: '40px',
      border: '1px solid rgba(255, 255, 255, 0.5)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: window.innerWidth < 1024 ? 'column' : 'row',
        alignItems: window.innerWidth < 1024 ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '2.5rem', animation: 'bounce 1s infinite' }}>📋</div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #2563eb, #7c3aed, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              Task Manager
            </h1>
            <div style={{ fontSize: '2.5rem', animation: 'pulse 2s infinite' }}>✨</div>
          </div>
          <p style={{
            color: '#4b5563',
            fontSize: '1.125rem',
            fontWeight: '500',
            margin: '0 0 12px 0'
          }}>
            {completedCount} of {totalCount} magical tasks completed 🎯
          </p>
          <div style={{
            width: '100%',
            background: '#e5e7eb',
            borderRadius: '9999px',
            height: '12px'
          }}>
            <div style={{
              background: 'linear-gradient(to right, #22c55e, #3b82f6)',
              height: '12px',
              borderRadius: '9999px',
              width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%`,
              transition: 'width 1s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 640 ? 'column' : 'row',
          gap: '12px'
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}>
              <IconSearch />
            </div>
            <input
              type="text"
              placeholder="Search your tasks... 🔍"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: '48px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                width: window.innerWidth < 640 ? '100%' : '320px',
                fontSize: '16px',
                color: '#1f2937',
                background: 'rgba(255, 255, 255, 0.9)',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = '#e5e7eb';
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }}>
              <IconFilter />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                paddingLeft: '48px',
                paddingRight: '40px',
                paddingTop: '12px',
                paddingBottom: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '16px',
                fontSize: '16px',
                color: '#1f2937',
                background: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500',
                outline: 'none',
                appearance: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.borderColor = '#e5e7eb';
              }}
            >
              <option value="all">🌟 All Tasks</option>
              <option value="pending">⏳ Pending</option>
              <option value="completed">✅ Completed</option>
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="low">🟢 Low Priority</option>
              <option value="work">💼 Work</option>
              <option value="personal">👤 Personal</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Component
const StatsCard = () => {
  const { allTasks } = useTaskContext();
  
  const stats = {
    total: allTasks.length,
    completed: allTasks.filter(task => task.completed).length,
    pending: allTasks.filter(task => !task.completed).length,
    high: allTasks.filter(task => task.priority === 'high').length
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      value: stats.total,
      label: 'Total Tasks',
      icon: '🎯',
      gradient: 'linear-gradient(135deg, #3b82f6, #1e40af, #1e3a8a)',
      bgGradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)'
    },
    {
      value: stats.completed,
      label: 'Completed',
      icon: '🏆',
      gradient: 'linear-gradient(135deg, #10b981, #059669, #047857)',
      bgGradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)'
    },
    {
      value: stats.pending,
      label: 'In Progress',
      icon: '⏳',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
      bgGradient: 'linear-gradient(135deg, #fef3c7, #fde68a)'
    },
    {
      value: `${completionRate}%`,
      label: 'Success Rate',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed, #6d28d9)',
      bgGradient: 'linear-gradient(135deg, #ede9fe, #ddd6fe)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${window.innerWidth < 768 ? '2' : '4'}, 1fr)`,
      gap: '24px',
      marginBottom: '40px'
    }}>
      {statCards.map((stat, index) => (
        <div 
          key={index}
          style={{
            background: stat.bgGradient,
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(4px)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
          }}
        >
          <div style={{
            display: 'inline-flex',
            padding: '12px',
            borderRadius: '12px',
            background: stat.gradient,
            color: 'white',
            marginBottom: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '1.5rem'
          }}>
            {stat.icon}
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '4px'
          }}>
            {stat.value}
          </div>
          <div style={{
            color: '#4b5563',
            fontWeight: '500'
          }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main App Component
const App = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      addTask(taskData);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0e7ff, #f3e8ff, #fce7f3, #fed7aa)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <FloatingParticles />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px',
        position: 'relative',
        zIndex: 10
      }}>
        <Header />
        <StatsCard />
        
        {/* Add Task Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'linear-gradient(to right, #2563eb, #7c3aed, #ec4899)',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '24px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }}
          >
            <IconPlus />
            <span>Create Magic Task</span>
            <span style={{ fontSize: '1.5rem', animation: 'pulse 2s infinite' }}>✨</span>
          </button>
        </div>

        {/* Tasks Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
          gap: '32px',
          gridAutoRows: 'max-content'
        }}>
          {tasks.map((task, index) => (
            <div
              key={task.id}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`
              }}
            >
              <StickyNote
                task={task}
                onEdit={handleEditTask}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 0'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '24px', animation: 'bounce 1s infinite' }}>🎯</div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #4b5563, #1f2937)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px'
            }}>
              No tasks found
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '1.125rem' }}>
              Ready to create something amazing? ✨
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              🚀 Create Your First Task
            </button>
          </div>
        )}

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          task={editingTask}
          onSave={handleSaveTask}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
};

// Root Component
const TaskManager = () => {
  return (
    <TaskProvider>
      <App />
    </TaskProvider>
  );
};

export default TaskManager;