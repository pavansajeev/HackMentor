import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('hackpilot_project');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 24px',
          margin: '40px auto',
          maxWidth: '600px',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: '16px',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <AlertTriangle size={40} color="#f43f5e" />
          <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Something went wrong loading this stage</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
            A rendering error occurred. You can reset your project state to restore the working default template.
          </p>
          <button
            onClick={this.handleReset}
            className="btn btn-emerald glow-emerald"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            <RefreshCw size={16} /> Reset & Restore Working Template
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
