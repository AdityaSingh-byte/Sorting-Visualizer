import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJsSquare, faPython, faJava } from '@fortawesome/free-brands-svg-icons';
import { faC } from '@fortawesome/free-solid-svg-icons';

const codeSnippets = {
    javascript: `// Quick Sort in JavaScript
async function quickSort(array, low, high) {
    if (low < high) {
        const pi = await partition(array, low, high);
        await quickSort(array, low, pi - 1);
        await quickSort(array, pi + 1, high);
    }
    return array;
}`,
    python: `# Quick Sort in Python
async def quick_sort(array, low, high):
    if low < high:
        pi = await partition(array, low, high)
        await quick_sort(array, low, pi - 1)
        await quick_sort(array, low, pi + 1, high)
    return array`,
    java: `// Quick Sort in Java
public class QuickSort {
    public static void quickSort(int[] array, int low, int high) {
        if (low < high) {
            int pi = partition(array, low, high);
            quickSort(array, low, pi - 1);
            quickSort(array, pi + 1, high);
        }
    }
}`,
    cpp: `// Quick Sort in C++
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    csharp: `// Quick Sort in C#
void QuickSort(int[] array, int low, int high) {
    if (low < high) {
        int pi = Partition(array, low, high);
        QuickSort(array, low, pi - 1);
        QuickSort(array, pi + 1, high);
    }
}`,
};

const languages = {
    javascript: faJsSquare,
    python: faPython,
    java: faJava,
    cpp: faC,
    csharp: faC,
};

function CodeSnippet() {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Above Sort Code Snippets</h2>
            <div style={styles.languageIcons}>
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
            <div style={styles.codeBlockContainer}>
                <SyntaxHighlighter 
                    language={selectedLanguage} 
                    style={dracula}
                    customStyle={styles.codeBlock}
                    wrapLines={true}
                    wrapLongLines={true}
                >
                    {codeSnippets[selectedLanguage]}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #1a1a1a, #3f3f3f)',
        width: '80%',
        maxWidth: '800px',
        margin: '60px auto',
        
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    },
    heading: {
        color: 'white',
        marginBottom: '20px',
    },
    languageIcons: {
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        paddingBottom: '10px',
    },
    languageButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        transition: 'transform 0.2s, background 0.2s',
    },
    activeButton: {
        transform: 'scale(1.1)',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '5px',
    },
    codeBlockContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center', 
        overflow: 'auto',
        textAlign: 'center',
    },
    codeBlock: {
        background: 'transparent',
        borderRadius: '8px',
        padding: '20px',
        fontSize: '14px',
        lineHeight: '1.5',
        maxWidth: '100%', 
        overflow: 'auto',
    },
};

export default CodeSnippet;
