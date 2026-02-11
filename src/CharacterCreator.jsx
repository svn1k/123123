import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './CharacterCreator.css';

const ASSETS = {
    backgrounds: [
        { id: 1, src: '/images/backgrounds/1.png' },
        { id: 2, src: '/images/backgrounds/2.png' },
        { id: 3, src: '/images/backgrounds/3.png' },
        { id: 4, src: '/images/backgrounds/4.png' },
    ],
    base: [
        { id: 1, src: '/images/base/1.png' },
        { id: 2, src: '/images/base/2.png' },
        { id: 3, src: '/images/base/3.png' },
        { id: 4, src: '/images/base/4.png' }
    ],
    body: [
        { id: 1, src: '/images/body/1.png' },
        { id: 2, src: '/images/body/2.png' },
        { id: 3, src: '/images/body/3.png' },
        { id: 4, src: '/images/body/4.png' }
    ],
    clothes: [
        { id: 1, src: '/images/clothes/1.png' },
        { id: 2, src: '/images/clothes/2.png' },
        { id: 3, src: '/images/clothes/3.png' },
        { id: 4, src: '/images/clothes/4.png' },
        { id: 5, src: '/images/clothes/5.png' },
        { id: 6, src: '/images/clothes/6.png' },
        { id: 7, src: '/images/clothes/7.png' },
        { id: 8, src: '/images/clothes/8.png' }
    ],
    face: [
        { id: 1, src: '/images/face/1.png' },
        { id: 2, src: '/images/face/2.png' },
        { id: 3, src: '/images/face/3.png' },
        { id: 4, src: '/images/face/4.png' }
    ],
    hair: [
        { id: 1, src: '/images/hair/1.png' },
        { id: 2, src: '/images/hair/2.png' },
        { id: 3, src: '/images/hair/3.png' },
        { id: 4, src: '/images/hair/4.png' },
        { id: 5, src: '/images/hair/5.png' },
        { id: 6, src: '/images/hair/6.png' },
        { id: 7, src: '/images/hair/7.png' },
        { id: 8, src: '/images/hair/8.png' },
        { id: 9, src: '/images/hair/9.png' }
    ],
    hat: [
        { id: 1, src: '/images/hat/1.png' },
        { id: 2, src: '/images/hat/2.png' },
        { id: 3, src: '/images/hat/3.png' }
    ],
    hearts: [
        { id: 1, src: '/images/hearts/1.png' },
        { id: 2, src: '/images/hearts/2.png' },
        { id: 3, src: '/images/hearts/3.png' },
        { id: 4, src: '/images/hearts/4.png' }
    ]
};

const CharacterCreator = () => {
    const [selectedBg, setSelectedBg] = useState(ASSETS.backgrounds[0]);
    const [selectedBase, setSelectedBase] = useState(ASSETS.base[0]);
    const [selectedBody, setSelectedBody] = useState(ASSETS.body[0]);
    const [selectedClothes, setSelectedClothes] = useState(ASSETS.clothes[0]);
    const [selectedFace, setSelectedFace] = useState(ASSETS.face[0]);
    const [selectedHair, setSelectedHair] = useState(ASSETS.hair[0]);
    const [selectedHat, setSelectedHat] = useState(ASSETS.hat[0]);
    const [selectedHearts, setSelectedHearts] = useState(ASSETS.hearts[0]);

    const [name, setName] = useState('From:');
    const [description, setDescription] = useState('To:');
    const [message, setMessage] = useState('Happy Valentine\'s Day!');

    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    const previewRef = useRef(null);

    const handleMessageChange = (e) => {
        const newValue = e.target.value;
        const lines = newValue.split('\n');
        if (lines.length > 6 || newValue.length > 45) return;
        setMessage(newValue);
    };

    const randomize = () => {
        setSelectedBg(ASSETS.backgrounds[Math.floor(Math.random() * ASSETS.backgrounds.length)]);
        setSelectedBase(ASSETS.base[Math.floor(Math.random() * ASSETS.base.length)]);
        setSelectedBody(ASSETS.body[Math.floor(Math.random() * ASSETS.body.length)]);
        setSelectedFace(ASSETS.face[Math.floor(Math.random() * ASSETS.face.length)]);
        setSelectedClothes(ASSETS.clothes[Math.floor(Math.random() * ASSETS.clothes.length)]);
        setSelectedHair(ASSETS.hair[Math.floor(Math.random() * ASSETS.hair.length)]);
        setSelectedHat(ASSETS.hat[Math.floor(Math.random() * ASSETS.hat.length)]);
        setSelectedHearts(ASSETS.hearts[Math.floor(Math.random() * ASSETS.hearts.length)]);
    };

    // ИСПРАВЛЕННАЯ функция для захвата с точным позиционированием
    // ИСПРАВЛЕННАЯ функция для захвата с правильным масштабированием текста
    const capturePreview = async () => {
        if (!previewRef.current) return null;

        // 1. Целевое разрешение
        const targetWidth = 1920;
        const targetHeight = 1080;

        // 2. Вычисляем масштаб (насколько нужно увеличить текущее превью, чтобы стало 1920px)
        const originalWidth = previewRef.current.offsetWidth;
        const scaleFactor = targetWidth / originalWidth;

        // 3. Создаём временный контейнер
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'fixed';
        tempContainer.style.top = '-10000px';
        tempContainer.style.left = '-10000px';
        tempContainer.style.width = `${targetWidth}px`;
        tempContainer.style.height = `${targetHeight}px`;
        tempContainer.style.zIndex = '-1000';
        
        // Копируем фон
        tempContainer.style.background = getComputedStyle(previewRef.current).background;
        document.body.appendChild(tempContainer);

        // 4. Клонируем содержимое
        const clone = previewRef.current.cloneNode(true);
        // Растягиваем клон на весь контейнер
        clone.style.width = '100%';
        clone.style.height = '100%';
        clone.style.transform = 'none'; // Сбрасываем лишние трансформации
        clone.style.borderRadius = '0'; // Убираем скругление для сохранения
        clone.style.boxShadow = 'none';
        
        tempContainer.appendChild(clone);

        // 5. МАГИЯ: Заменяем ВСЕ input и textarea на div с точной геометрией
        const previewRect = previewRef.current.getBoundingClientRect();
        const originalInputs = previewRef.current.querySelectorAll('input, textarea');
        const clonedInputs = clone.querySelectorAll('input, textarea');

        const scalePx = (value) => {
            const num = parseFloat(value);
            if (isNaN(num)) return value;
            return `${num * scaleFactor}px`;
        };

        clonedInputs.forEach((clonedInput, index) => {
            const originalInput = originalInputs[index];
            const div = document.createElement('div');
            const computedStyle = window.getComputedStyle(originalInput);
            // ===== SCALE POSITIONS =====
            const scaleValue = (value) => {
                const num = parseFloat(value);
                if (isNaN(num)) return value;
                return `${num * scaleFactor}px`;
            };

            

            // Копируем текст
            div.innerText = originalInput.value;

            // Копируем критические стили позиционирования
            div.style.position = computedStyle.position;
            div.style.left = scaleValue(computedStyle.left);
            div.style.top = scaleValue(computedStyle.top);
            div.style.bottom = scaleValue(computedStyle.bottom);
            div.style.right = scaleValue(computedStyle.right);
            div.style.transform = computedStyle.transform;
            div.style.width = scaleValue(computedStyle.width);
            div.style.minWidth = scaleValue(computedStyle.minWidth);
            div.style.maxWidth = scaleValue(computedStyle.maxWidth);
            div.style.height = scaleValue(computedStyle.height);
            div.style.minHeight = scaleValue(computedStyle.minHeight);
            div.style.maxHeight = scaleValue(computedStyle.maxHeight);
            div.style.textAlign = computedStyle.textAlign;
            div.style.color = computedStyle.color;
            div.style.fontFamily = computedStyle.fontFamily;
            div.style.fontWeight = computedStyle.fontWeight;
            div.style.lineHeight = scalePx(computedStyle.lineHeight);
            div.style.zIndex = computedStyle.zIndex;
            div.style.background = computedStyle.background;
            div.style.border = computedStyle.border;
            div.style.borderBottom = computedStyle.borderBottom;
            div.style.borderRadius = computedStyle.borderRadius;
            div.style.lineHeight = scaleValue(computedStyle.lineHeight);
            div.style.zIndex = computedStyle.zIndex;
            div.style.boxSizing = computedStyle.boxSizing;
            div.style.justifyContent = 'flex-start';
            // Flexbox для вертикального центрирования текста в инпутах
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.justifyContent = 'flex-start';
            if (originalInput.tagName === 'TEXTAREA') {
                div.style.whiteSpace = 'pre-wrap';
                div.style.alignItems = 'flex-start';
                div.style.justifyContent = 'center';
                div.style.overflow = 'hidden';
            } else {
                div.style.whiteSpace = 'nowrap';
            }

            const fontSize = parseFloat(computedStyle.fontSize);
            div.style.fontSize = `${fontSize * scaleFactor}px`;

            const paddingLeft = parseFloat(computedStyle.paddingLeft);
            const paddingRight = parseFloat(computedStyle.paddingRight);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);
            div.style.padding = `${paddingTop * scaleFactor}px ${paddingRight * scaleFactor}px ${paddingBottom * scaleFactor}px ${paddingLeft * scaleFactor}px`;

            clonedInput.parentNode.replaceChild(div, clonedInput);
        });

        try {
            // Ждём загрузки картинок
            const images = tempContainer.querySelectorAll('img');
            await Promise.all(
                Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                })
            );

            // Делаем скриншот
            const canvas = await html2canvas(tempContainer, {
                useCORS: true,
                scale: 1, // Масштаб 1, так как мы сами задали 1920x1080
                width: targetWidth,
                height: targetHeight,
                backgroundColor: null,
                logging: false,
            });

            // Удаляем временный контейнер
            document.body.removeChild(tempContainer);
            return canvas;

        } catch (error) {
            if (document.body.contains(tempContainer)) {
                document.body.removeChild(tempContainer);
            }
            throw error;
        }
    };

    const saveCharacter = async () => {
        if (!previewRef.current) return;

        try {
            const canvas = await capturePreview();
            if (!canvas) {
                alert('Error creating image');
                return;
            }

            const link = document.createElement('a');
            link.download = `valentine_${name.replace(/[^a-z0-9]/gi, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Save error:', error);
            alert('An error occurred while saving the image. Please try again.');
        }
    };

    const shareToTwitter = async () => {
        if (!previewRef.current) return;

        try {
            const canvas = await capturePreview();
            if (!canvas) {
                alert('Error creating image');
                return;
            }

            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                alert('✅ Image copied!\n\nPress Ctrl+V in Twitter.');
                setTimeout(() => {
                    const twitterText = encodeURIComponent('💕 Happy Valentine\'s Day! 💕\n\nMade with Valentine Card Creator');
                    window.open(`https://twitter.com/intent/tweet?text=${twitterText}`, '_blank');
                }, 1000);
            } catch (_err) {
                // Fallback if clipboard didn't work
                saveCharacter();
                alert('📥 Image downloaded! Attach it to Twitter manually.');
            }
        } catch (error) {
            console.error('Error creating image:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const sections = [
        { title: 'Background', data: ASSETS.backgrounds, current: selectedBg, setter: setSelectedBg },
        { title: 'Base', data: ASSETS.base, current: selectedBase, setter: setSelectedBase },
        { title: 'Body', data: ASSETS.body, current: selectedBody, setter: setSelectedBody },
        { title: 'Face', data: ASSETS.face, current: selectedFace, setter: setSelectedFace },
        { title: 'Clothes', data: ASSETS.clothes, current: selectedClothes, setter: setSelectedClothes },
        { title: 'Hair', data: ASSETS.hair, current: selectedHair, setter: setSelectedHair },
        { title: 'Hat', data: ASSETS.hat, current: selectedHat, setter: setSelectedHat },
        { title: 'Hearts', data: ASSETS.hearts, current: selectedHearts, setter: setSelectedHearts },
    ];

    return (
        <div className="character-creator-wrapper">
            {!hasSeenWelcome && (
                <div className="welcome-overlay">
                    <div className="welcome-card">
                        <h2>Welcome to Valentine Card Creator!</h2>
                        <p>Create a sweet valentine card in a minute: choose a character, outfit, background, hearts and write warm words</p>
                        <p>Everything is ready to download!</p>
                        <div className="welcome-creators">
                            <p>Made with love by: Tor00_1 × Wtf4uk</p>
                        </div>
                        <button className="welcome-close-btn" onClick={() => setHasSeenWelcome(true)}>
                            Start Creating
                        </button>
                    </div>
                </div>
            )}

            <div className="creator-container">
                <div className="creator-preview-area" ref={previewRef}>
                    <img src={selectedBg.src} className="creator-character-layer creator-bg-layer" alt="bg" />
                    <img src={selectedBase.src} className="creator-character-layer creator-base-layer" alt="base" />
                    <img src={selectedBody.src} className="creator-character-layer creator-body-layer" alt="body" />
                    <img src={selectedFace.src} className="creator-character-layer creator-face-layer" alt="face" />
                    <img src={selectedClothes.src} className="creator-character-layer creator-clothes-layer" alt="clothes" />
                    <img src={selectedHair.src} className="creator-character-layer creator-hair-layer" alt="hair" />
                    <img src={selectedHat.src} className="creator-character-layer creator-hat-layer" alt="hat" />
                    <div className="creator-hearts-wrapper">
                        <img src={selectedHearts.src} className="creator-character-layer creator-hearts-layer" alt="hearts" />
                    </div>

                    <div className="creator-ui-overlay">
                        <input
                            type="text"
                            className="creator-name-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <input
                        type="text"
                        className="creator-extra-text-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <textarea
                        className="creator-center-textarea"
                        value={message}
                        onChange={handleMessageChange}
                        style={{ overflow: 'hidden', resize: 'none' }}
                    />
                </div>

                <div className="creator-controls-panel">
                    <div className="creator-main-actions">
                        <button className="creator-random-btn" onClick={randomize}>🎲 Random</button>
                        <button className="creator-save-btn" onClick={saveCharacter}>💾 Save</button>
                        <button className="creator-share-btn" onClick={shareToTwitter}>🐦 Share</button>
                    </div>

                    {sections.map((section) => (
                        <div className="creator-section" key={section.title}>
                            <div className="creator-section-title">{section.title}</div>
                            <div className="creator-options-grid">
                                {section.data.map((item) => (
                                    <button
                                        key={item.id}
                                        className={`creator-option-btn ${section.current.id === item.id ? 'active' : ''}`}
                                        onClick={() => section.setter(item)}
                                    >
                                        <img src={item.src} alt={item.id} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="creator-footer">
                <p>Tor00_1 × Wtf4uk</p>
            </div>
        </div>
    );
};

export default CharacterCreator;
