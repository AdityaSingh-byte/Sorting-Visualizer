import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJsSquare, faPython, faJava } from '@fortawesome/free-brands-svg-icons';
import { faC, faPlay, faRandom, faPause } from '@fortawesome/free-solid-svg-icons';
import codeSnippets from '../../common/snippets/bodySnippet/codeSnippets'; // Adjust the path to your heap sort snippets
import styles from '../../styling/style';

const languages = {
    javascript: faJsSquare,
    python: faPython,
    java: faJava,
    cpp: faC,
    csharp: faC,
};

const HeapSortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeBars, setActiveBars] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [n, setN] = useState(25); // Array size
    const [playButtonIcon, setPlayButtonIcon] = useState(faPlay); // State for play button icon
    const audioCtxRef = useRef(null);

    const playNote = (freq) => {
        if (audioCtxRef.current == null) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const audioCtx = audioCtxRef.current;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);

        osc.frequency.value = freq;
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    };

    const init = () => {
        const initialArray = Array.from({ length: n }, () => Math.random());
        setArray(initialArray);
    };

    useEffect(() => {
        init();
    }, [n]); 

    const heapSort = (arr) => {
        const moves = [];
        const arrayCopy = [...arr];

        const heapify = (arr, n, i) => {
            let largest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest]) largest = left;
            if (right < n && arr[right] > arr[largest]) largest = right;

            if (largest !== i) {
                moves.push({ indices: [i, largest], type: 'swap' });
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                heapify(arr, n, largest);
            }
        };

        const n = arrayCopy.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arrayCopy, n, i);
        }
        for (let i = n - 1; i > 0; i--) {
            moves.push({ indices: [0, i], type: 'swap' });
            [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];
            heapify(arrayCopy, i, 0);
        }
        return moves;
    };

    const play = () => {
        if (isPlaying) return;
        setIsPlaying(true);
        setPlayButtonIcon(faPause); // Change icon to pause when playing

        const moves = heapSort(array);
        animate(moves);
    };

    const animate = (moves) => {
        if (moves.length === 0) {
            setIsPlaying(false);
            setActiveBars([]);
            setPlayButtonIcon(faPlay); // Change back to play icon when done
            return;
        }
        const move = moves.shift();
        const [i, j] = move.indices;

        setActiveBars([i, j]);

        setArray((prevArray) => {
            const newArray = [...prevArray];
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            return newArray;
        });

        playNote(200 + array[i] * 500);
        playNote(200 + array[j] * 500);

        setTimeout(() => {
            animate(moves);
        }, 150);
    };

    const shuffleArray = () => {
        const shuffledArray = [...array].sort(() => Math.random() - 0.5);
        setArray(shuffledArray);
        setActiveBars([]);
    };

    return (
        <div style={{ background: 'linear-gradient(135deg, #1a1a1a, #3f3f3f)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <header style={styles.header}>
                <h1 style={styles.algorithmName}>Heap Sort Visualizer</h1>
                <div style={styles.buttonContainer}>
                    <button onClick={play} disabled={isPlaying} style={styles.iconButton}>
                        <FontAwesomeIcon icon={playButtonIcon} />
                    </button>
                    <button onClick={shuffleArray} disabled={isPlaying} style={styles.iconButton}>
                        <FontAwesomeIcon icon={faRandom} />
                    </button>
                    <div style={styles.sliderContainer}>
                        <label style={styles.sliderLabel}>Array Size: {n}</label>
                        <input
                            type="range"
                            min="25"
                            max="400"
                            value={n}
                            onChange={(e) => setN(Number(e.target.value))}
                            style={styles.slider}
                            disabled={isPlaying}
                        />
                    </div>
                </div>
            </header>
            <div className="bars-container">
                {array.map((value, i) => (
                    <div
                        key={i}
                        className="bar"
                        style={{
                            height: `${value * 100}%`,
                            width: `${(500 / n)}px`,
                            backgroundColor: activeBars.includes(i) ? 'red' : 'white',
                        }}
                    ></div>
                ))}
            </div>
            <div className="info-container" style={styles.infoContainer}>
                <div className="description" style={styles.description}>
                    <h3>Description</h3>
                    <p>
                        Heap Sort is a comparison-based sorting technique based on the binary heap data structure. It first divides the input array into a heap and then sorts it.
                    </p>
                </div>
                <div className="code-snippet" style={styles.codeSnippet}>
                    <h3>Code Snippet</h3>
                    <div className="language-icons" style={styles.languageIcons}>
                        {Object.keys(languages).map((language) => (
                            <button 
                                key={language} 
                                onClick={() => setSelectedLanguage(language)} 
                                style={{
                                    ...styles.languageButton,
                                    ...(selectedLanguage === language ? styles.activeButton : {}),
                                }}
                            >
                                <FontAwesomeIcon icon={languages[language]} size="2x" style={{ color: 'white' }} />
                                {language === 'cpp' && '++'}
                                {language === 'csharp' && '#'}
                            </button>
                        ))}
                    </div>
                    <div style={styles.codeBlockWrapper}>
                        <SyntaxHighlighter 
                            language={selectedLanguage} 
                            style={dracula}
                            customStyle={styles.codeBlock}
                            wrapLines={true}
                        >
                            {codeSnippets.heapSort[selectedLanguage]} {/* Adjust this to your heap sort code snippets */}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeapSortingVisualizer;
