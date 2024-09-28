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

const MergeSortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeBars, setActiveBars] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [n, setN] = useState(25); // Array size
    const [playButtonIcon, setPlayButtonIcon] = useState(faPlay);
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

    const mergeSort = (arr, start = 0, end = arr.length - 1) => {
        const moves = [];
        if (start >= end) return moves;

        const mid = Math.floor((start + end) / 2);
        moves.push(...mergeSort(arr, start, mid));
        moves.push(...mergeSort(arr, mid + 1, end));
        moves.push(...merge(arr, start, mid, end));

        return moves;
    };

    const merge = (arr, start, mid, end) => {
        const moves = [];
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                moves.push({ index: k, value: left[i] });
                arr[k++] = left[i++];
            } else {
                moves.push({ index: k, value: right[j] });
                arr[k++] = right[j++];
            }
        }

        while (i < left.length) {
            moves.push({ index: k, value: left[i] });
            arr[k++] = left[i++];
        }

        while (j < right.length) {
            moves.push({ index: k, value: right[j] });
            arr[k++] = right[j++];
        }

        return moves;
    };

    const play = () => {
        if (isPlaying) return;
        setIsPlaying(true);
        setPlayButtonIcon(faPause);

        const moves = mergeSort([...array]);
        animate(moves);
    };

    const animate = (moves) => {
        if (moves.length === 0) {
            setIsPlaying(false);
            setActiveBars([]);
            setPlayButtonIcon(faPlay);
            return;
        }
        const move = moves.shift();

        setActiveBars([move.index]);

        setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[move.index] = move.value;
            return newArray;
        });

        playNote(200 + move.value * 500);

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
                <h1 style={styles.algorithmName}>Merge Sort Visualizer</h1>
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
                        Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm. It works by dividing the unsorted list into n sublists, each containing one element, then repeatedly merging sublists to produce new sorted sublists until there is only one sublist remaining.
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
                            {codeSnippets.mergeSort[selectedLanguage]}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MergeSortVisualizer;