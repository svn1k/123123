import React, { useState, useEffect } from 'react';
import './HallOfFame.css';

const HallOfFame = () => {
    const isRussian = true;

    const categories = [
        {
            id: 'first-complete',
            icon: '⚡',
            title: isRussian ? 'Первые завершившие' : 'First to Complete',
            subtitle: isRussian ? 'Скорость и решительность' : 'Speed and Determination',
            color: '#FF6B6B',
            winners: [
                { rank: 1, username: '@wtf4uk', avatar: '/avatars/wtf4uk.jpg', score: '✅', date: '10.02.2026', time: '14:30' },
                { rank: 2, username: '@beamnxw', avatar: '/avatars/beamnxw.jpg', score: '✅', date: '10.02.2026', time: '15:45' },
                { rank: 3, username: '@0xIrina', avatar: '/avatars/0xIrina.jpg', score: '✅', date: '10.02.2026', time: '16:20' }
            ]
        },
        {
            id: 'score-10',
            icon: '💎',
            title: isRussian ? 'Идеальный счёт' : 'Perfect Score',
            subtitle: isRussian ? '10 из 10 баллов' : '10 out of 10 points',
            color: '#4ECDC4',
            winners: [
                { rank: 1, username: '@Purson77', avatar: '/avatars/Purson77.jpg', score: '10/10', date: '10.02.2026', time: '14:30' },
                { rank: 2, username: '@0xCryptoViktor_', avatar: '/avatars/0xCryptoViktor_.jpg', score: '10/10', date: '10.02.2026', time: '15:00' },
                { rank: 3, username: '@6mirra6', avatar: '/avatars/6mirra6.jpg', score: '10/10', date: '10.02.2026', time: '16:00' }
            ]
        },
        {
            id: 'score-9',
            icon: '⭐',
            title: isRussian ? 'Отличный результат' : 'Excellent Score',
            subtitle: isRussian ? '9 из 10 баллов' : '9 out of 10 points',
            color: '#FFE66D',
            winners: [
                { rank: 1, username: '@wtf4uk', avatar: '/avatars/wtf4uk.jpg', score: '9/10', date: '10.02.2026', time: '14:30' },
                { rank: 2, username: '@beamnxw', avatar: '/avatars/beamnxw.jpg', score: '9/10', date: '10.02.2026', time: '15:45' },
                { rank: 3, username: '@0xIrina', avatar: '/avatars/0xIrina.jpg', score: '9/10', date: '10.02.2026', time: '16:20' }
            ]
        },
        {
            id: 'score-8',
            icon: '🔥',
            title: isRussian ? 'Сильный показатель' : 'Great Score',
            subtitle: isRussian ? '8 из 10 баллов' : '8 out of 10 points',
            color: '#A8E6CF',
            winners: [
                { rank: 1, username: '@kudrichonchain', avatar: '/avatars/kudrichonchain.jpg', score: '8/10', date: '10.02.2026', time: '14:30' },
                { rank: 2, username: '@aleksander_100', avatar: '/avatars/aleksander_100.jpg', score: '8/10', date: '10.02.2026', time: '15:00' },
                { rank: 3, username: '@agrobaks', avatar: '/avatars/agrobaks.jpg', score: '8/10', date: '10.02.2026', time: '16:00' }
            ]
        }
    ];

    const allParticipants = [
        { username: '@wtf4uk', avatar: '/avatars/wtf4uk.jpg' },
        { username: '@beamnxw', avatar: '/avatars/beamnxw.jpg' },
        { username: '@0xIrina', avatar: '/avatars/0xIrina.jpg' },
        { username: '@Purson77', avatar: '/avatars/Purson77.jpg' },
        { username: '@0xCryptoViktor_', avatar: '/avatars/0xCryptoViktor_.jpg' },
        { username: '@6mirra6', avatar: '/avatars/6mirra6.jpg' },
        { username: '@kudrichonchain', avatar: '/avatars/kudrichonchain.jpg' },
        { username: '@aleksander_100', avatar: '/avatars/aleksander_100.jpg' },
        { username: '@agrobaks', avatar: '/avatars/agrobaks.jpg' },
        { username: '@qubbleX', avatar: 'https://pbs.twimg.com/profile_images/qubbleX_400x400.jpg' },
        { username: '@pN01ennn', avatar: 'https://pbs.twimg.com/profile_images/N01ennn_400x400.jpg' },
        { username: '@lyx0or', avatar: 'https://pbs.twimg.com/profile_images/lyx0or_400x400.jpg' },
        { username: '@participant13', avatar: '/avatars/participant13.jpg' },
        { username: '@participant14', avatar: '/avatars/participant14.jpg' },
        { username: '@participant15', avatar: '/avatars/participant15.jpg' },
        { username: '@participant16', avatar: '/avatars/participant16.jpg' },
        { username: '@participant17', avatar: '/avatars/participant17.jpg' },
        { username: '@participant18', avatar: '/avatars/participant18.jpg' },
        { username: '@participant19', avatar: '/avatars/participant19.jpg' },
        { username: '@participant20', avatar: '/avatars/participant20.jpg' },
        { username: '@participant21', avatar: '/avatars/participant21.jpg' },
        { username: '@participant22', avatar: '/avatars/participant22.jpg' },
        { username: '@participant23', avatar: '/avatars/participant23.jpg' },
        { username: '@participant24', avatar: '/avatars/participant24.jpg' },
        { username: '@participant25', avatar: '/avatars/participant25.jpg' },
        { username: '@participant26', avatar: '/avatars/participant26.jpg' },
        { username: '@participant27', avatar: '/avatars/participant27.jpg' },
        { username: '@participant28', avatar: '/avatars/participant28.jpg' },
        { username: '@participant29', avatar: '/avatars/participant29.jpg' },
        { username: '@participant30', avatar: '/avatars/participant30.jpg' },
        { username: '@participant31', avatar: '/avatars/participant31.jpg' },
        { username: '@participant32', avatar: '/avatars/participant32.jpg' },
        { username: '@participant33', avatar: '/avatars/participant33.jpg' },
        { username: '@participant34', avatar: '/avatars/participant34.jpg' },
        { username: '@participant35', avatar: '/avatars/participant35.jpg' },
        { username: '@participant36', avatar: '/avatars/participant36.jpg' },
        { username: '@participant37', avatar: '/avatars/participant37.jpg' }
    ];

    const getMedalEmoji = (rank) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return rank;
        }
    };

    return (
        <div className="hall-of-fame-container">
            <div className="floating-avatars">
                {allParticipants.map((participant, index) => (
                    <div
                        key={index}
                        className="floating-avatar"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    >
                        <img 
                            src={participant.avatar} 
                            alt={participant.username}
                            onError={(e) => {
                                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzJBMkEyQSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn46vPC90ZXh0Pjwvc3ZnPg==";
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="particles">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>

            <div className="hof-content">
                <div className="hof-hero">
                    <div className="hero-badge">
                        <span className="badge-icon">🏆</span>
                        <span className="badge-text">HALL OF FAME</span>
                    </div>
                    <h1 className="hero-title">
                        {isRussian ? 'Зал Славы' : 'Hall of Fame'}
                    </h1>
                    <p className="hero-subtitle">
                        {isRussian 
                            ? 'Легенды MagicBlock Quiz Challenge'
                            : 'Legends of MagicBlock Quiz Challenge'}
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">37</div>
                            <div className="stat-label">{isRussian ? 'Участников' : 'Participants'}</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">12</div>
                            <div className="stat-label">{isRussian ? 'Победителей' : 'Winners'}</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">4</div>
                            <div className="stat-label">{isRussian ? 'Категории' : 'Categories'}</div>
                        </div>
                    </div>
                </div>

                <div className="categories-wrapper">
                    {categories.map((category, catIndex) => (
                        <div 
                            key={category.id} 
                            className="category-card"
                            style={{ 
                                animationDelay: `${catIndex * 0.1}s`,
                                '--category-color': category.color
                            }}
                        >
                            <div className="category-header">
                                <div className="category-icon-wrapper">
                                    <span className="category-icon">{category.icon}</span>
                                </div>
                                <div className="category-text">
                                    <h2 className="category-title">{category.title}</h2>
                                    <p className="category-subtitle">{category.subtitle}</p>
                                </div>
                            </div>

                            <div className="winners-list">
                                {category.winners.map((winner, index) => (
                                    <div 
                                        key={`${winner.username}-${winner.rank}`}
                                        className={`winner-item rank-${winner.rank}`}
                                        style={{ animationDelay: `${catIndex * 0.1 + index * 0.05}s` }}
                                    >
                                        <div className="winner-rank">
                                            <span className="rank-medal">{getMedalEmoji(winner.rank)}</span>
                                        </div>

                                        <div className="winner-avatar">
                                            <div className="avatar-ring"></div>
                                            <img
                                                src={winner.avatar}
                                                alt={winner.username}
                                                onError={(e) => {
                                                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzJBMkEyQSIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn46vPC90ZXh0Pjwvc3ZnPg==";
                                                }}
                                            />
                                        </div>

                                        <div className="winner-details">
                                            <div className="winner-name">{winner.username}</div>
                                            <div className="winner-meta">
                                                <span className="meta-item">
                                                    <span className="meta-icon">📅</span>
                                                    {winner.date}
                                                </span>
                                                <span className="meta-item">
                                                    <span className="meta-icon">⏰</span>
                                                    {winner.time}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="winner-score">
                                            <div className="score-badge">{winner.score}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HallOfFame;