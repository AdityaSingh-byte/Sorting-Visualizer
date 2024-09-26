import React, { useState, useEffect } from 'react';
import Body from '../../stateless/body/body';

function BodyStateful() {
    const [text, setText] = useState("");
    const [bars, setBars] = useState(generateRandomHeights(30, 50, 450)); // Generate initial bar heights
    const finalText = "Sort Visualizer";
    const scrambleTime = 100;
    const revealTime = 200;

    useEffect(() => {
        scrambleText();
        animateSorting();
    }, []);

    // Generate an array of random heights
    function generateRandomHeights(length, min, max) {
        return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    const scrambleText = () => {
        let currentText = "";
        let revealIndex = 0;

        const scrambleInterval = setInterval(() => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXY';
            const scrambledText = finalText.split('').map(char => char === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)]).join('');
            setText(scrambledText);

            if (revealIndex < finalText.length) {
                currentText += finalText[revealIndex];
                setText(currentText + scrambledText.slice(revealIndex + 1));
                revealIndex++;
            }

            if (revealIndex >= finalText.length) {
                clearInterval(scrambleInterval);
            }
        }, revealTime);
    };

    // Quick Sort function with visualization
    const quickSort = async (array, low, high) => {
        if (low < high) {
            const pi = await partition(array, low, high);
            await quickSort(array, low, pi - 1);
            await quickSort(array, pi + 1, high);
        }
        return array; // Return sorted array
    };

    const partition = async (array, low, high) => {
        const pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
                await updateBars(array); // Update bars on each swap
            }
        }
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        await updateBars(array); // Final swap with pivot
        return i + 1;
    };

    // Function to update bars and introduce delay for visualization
    const updateBars = async (array) => {
        setBars([...array]); // Update the state to reflect the current state of the array
        await new Promise(resolve => setTimeout(resolve, revealTime)); // Pause for visualization
    };

    // Start sorting the bars
    const animateSorting = () => {
        const newBars = [...bars]; // Clone the current bars
        quickSort(newBars, 0, newBars.length - 1); // Start quick sort
    };

    // Render bars for sorting visualizer
    const renderBars = () => (
        bars.map((height, index) => (
            <div key={index} className="bar" style={{ height: `${height}px` }}></div>
        ))
    );

    return (
        <div>
            <Body text={text} />
            <div className="bar-container">
                {renderBars()}
            </div>
        </div>
    );
}

export default BodyStateful;
