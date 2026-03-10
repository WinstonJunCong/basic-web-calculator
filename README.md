### Basic Web Calculator
A simple, responsive web-based calculator built with vanilla HTML, CSS, and JavaScript. 
This project provides a functional calculator interface that performs standard arithmetic and handles dynamic display resizing to ensure text remains visible within the interface
## Features
 - Core Arithmetic: Supports addition (+), subtraction (-), multiplication (×), and division (÷)
 - Percentage Logic: Includes a percentage (%) function that can modify the current value or be used within operations
 - Polarity Toggle: Easily switch between positive and negative values using the polarity button
 - Dynamic UI Scaling: The fitText() function automatically reduces the font size of the output as the number of digits increases, ensuring the text never overflows the display area
 - Visual Feedback: The currently selected operator button highlights in orange to indicate the active operation
 - Error Handling: Includes logic to handle division by zero and prevents multiple decimal points in a single value
 - State Management: Features dedicated handlers for Backspace (⌫) and "All Clear" (AC) to reset or edit inputs

## Technologies Used
 - HTML5: Structure of the calculator and display
 - CSS3: Responsive grid-like layout using Flexbox, with media queries to maintain usability on larger screens (breakpoints at 800px)
 -  JavaScript (ES6+): Functional programming approach for mathematical operations and DOM manipulation for real-time display updates

## File Structure
 - index.html: The main entry point containing the calculator's structure
 - styles.css: Contains the global styles, button layouts, and responsive design rules
 - script.js: Contains the logic for mathematical operations, state management, and button event listeners
 
## How to Use
 - Use live demo with https://winstonjuncong.github.io/basic-web-calculator/
 - Use the on-screen buttons to perform calculations.

## Author
WinstonJunCong

--------------------------------------------------------------------------------
Note: This study project was built as a clean, dependency-free implementation of a standard web utility.
