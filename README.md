# Hashing Horizons - Visualization Tool

A comprehensive web-based visualization tool for understanding linear hashing with collision resolution techniques. This interactive application demonstrates how hash tables work with different hash functions and probing methods.

## Features

### Hash Functions

- **Division Method**: Uses modulo operation for hash calculation  
- **Folding Method**: Implements digit folding technique for hash generation

### Collision Resolution

- **Linear Probing**: Sequential search for next available slot  
- **Quadratic Probing**: Uses quadratic increments to find open positions

### Interactive Operations

- Insert keys with real-time collision visualization  
- Search for specific keys with highlighted results  
- Delete keys with visual feedback  
- Dynamic table resizing

## Files Structure

### `LinearHashing.js`

Core hash table implementation containing:

- `LinearHashing` class with configurable table size, probing method, and hash function  
- Hash function implementations (division and folding methods)  
- Insert, search, and delete operations with collision handling  
- Error handling for invalid keys and duplicate entries

### `sketch.js`

p5.js-based visualization layer featuring:

- Interactive UI components (input fields, buttons, dropdowns)  
- Real-time visual representation of hash table operations  
- Dynamic positioning system for different table sizes  
- Collision detection and highlighting  
- Status messages and error modal integration

### `index.html`

Web interface structure with:

- Bootstrap-based responsive design  
- Navigation menu with MCQs, Visualize, and References sections  
- Modal dialog for error handling  
- Integration points for p5.js canvas and interactive elements

## Getting Started

- **Setup**: Open `index.html` in a web browser  
- **Configure**: Set table size and select hash function/probing method  
- **Insert**: Add keys to see hash calculation and collision resolution  
- **Explore**: Use search and delete operations to understand hash table behavior

## Usage Examples

### Basic Operations

- Set table size (default: 10)  
- Choose hash function (Division/Folding Method)  
- Select probing technique (Linear/Quadratic)  
- Insert numerical keys to observe hash distribution  
- Search for keys to see lookup process  
- Delete keys to understand tombstone handling

### Collision Scenarios

The tool automatically detects and visualizes collisions, showing how different probing methods resolve conflicts when multiple keys hash to the same index.
