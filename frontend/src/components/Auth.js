import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', fullName: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/api/auth/login' : '/api/auth/register';
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
            alert(isLogin ? "Welcome back!" : "Registered successfully!");
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="logo" />
                <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input type="text" placeholder="Full Name" onChange={e => setForm({...form, fullName: e.target.value})} required />
                    )}
                    <input type="text" placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} required />
                    <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
                    <button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</button>
                </form>
                <p onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Create an account" : "Have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default Auth;
