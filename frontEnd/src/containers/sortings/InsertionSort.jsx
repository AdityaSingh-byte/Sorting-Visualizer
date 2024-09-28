import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJsSquare, faPython, faJava } from '@fortawesome/free-brands-svg-icons';
import { faC, faPlay, faRandom, faPause } from '@fortawesome/free-solid-svg-icons';
import codeSnippets from '../../common/snippets/bodySnippet/codeSnippets';
import styles from '../../styling/style';
const languages = {
    javascript: faJsSquare,
    python: faPython,
    java: faJava,
    cpp: faC,
    csharp: faC,
};

const InsertionSortingVisualizer = () => {
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

    const insertionSort = (arr) => {
        const moves = [];
        const arrayCopy = [...arr];

        for (let i = 1; i < arrayCopy.length; i++) {
            let key = arrayCopy[i];
            let j = i - 1;

            while (j >= 0 && arrayCopy[j] > key) {
                moves.push({ indices: [j, j + 1], type: 'swap' }); // Keep track of the swaps
                arrayCopy[j + 1] = arrayCopy[j]; // Move element to the right
                j--;
            }
            arrayCopy[j + 1] = key; // Place key in its correct position
            moves.push({ indices: [j + 1, i], type: 'insert' }); // Insert the key
        }
        return moves;
    };

    const play = () => {
        if (isPlaying) return;
        setIsPlaying(true);
        setPlayButtonIcon(faPause); // Change icon to pause when playing

        const moves = insertionSort(array);
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
            if (move.type === 'swap') {
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            } 
            // For insertion, we don’t need to swap since we're just placing the key
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
                <h1 style={styles.algorithmName}>Insertion Sort Visualizer</h1>
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
                        Insertion Sort is a simple sorting algorithm that builds a sorted array one element at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.
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
                            {codeSnippets.insertionSort[selectedLanguage]}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsertionSortingVisualizer;
