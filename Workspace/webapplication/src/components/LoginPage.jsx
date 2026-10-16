import { useState } from 'react';

const DEMO_EMAIL = 'student@example.com';
const DEMO_PASSWORD = 'password123';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('That email and password don’t match. Please try again.');
      return;
    }
    setError('');
    onLogin();
  }

  return (
    <main className="login-layout">
      <section className="login-card" aria-labelledby="login-title">
        <a className="brand" href="#home" aria-label="Daylist home">
          <span className="brand-mark" aria-hidden="true">d</span>
          <span>daylist</span>
        </a>
        <div className="login-heading">
          <p className="eyebrow">A calmer kind of productive</p>
          <h1 id="login-title">Make room for<br />what matters.</h1>
          <p className="muted">Sign in to pick up where your day left off.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby={error ? 'login-error' : undefined}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="form-error" id="login-error" role="alert">{error}</p>}
          <button className="primary-button login-button" type="submit">
            Sign in <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="demo-hint">Demo access <span>student@example.com</span> · <span>password123</span></p>
      </section>
      <aside className="login-art" aria-label="A peaceful illustration of the day">
        <div className="art-sun" />
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-caption">
          <span className="caption-dot" />
          <p>One thing at a time.<br /><strong>You’re right where you need to be.</strong></p>
        </div>
        <span className="art-spark spark-one">✳</span>
        <span className="art-spark spark-two">✦</span>
      </aside>
    </main>
  );
}
