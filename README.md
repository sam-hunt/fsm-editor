# Reactive Finite State Machine Editor

An experimental reactive editor and visualiser for describing directional finite state machine graphs.

Features:
1. Realtime reactive update as states and transitions are added or removed
2. Draggable node graph using d3.js@v6 force simulation
3. Syntax-highlighted code output for creating such an FSM with [javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine)

![Visualizer](screenshot-1.png?raw=true "Visualizer")

![Code Output](screenshot-2.png?raw=true "Code Output")

TODO:
1. Link react to hook on d3 enter/exit events rather than full rerender on change
2. Media queries for mobile responsiveness