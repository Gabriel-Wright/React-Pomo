# React Pomodoro Timer

A lightweight Pomodoro timer built with React and TypeScript. Designed to be clean, simple and help visualize your productivity.

## Base Features

Fully functional Pomodoro timer with work and break phases.
Automatic phase transitions with optional sound notifications.
Responsive design: works on desktop and mobile.
Customizable settings for:

- Work duration
- Break duration
- Number of rounds
  -Start/pause, skip and reset buttons

## Future Milestones

- Optional Warmup phase ✅
- Settings menu optional apply or cancel settings ✅
- Improved test suite
- Dropdown selection for different visual themes ✅
- ~~Refactor current iterative pomodoro phases approach to a queue system storing upcoming pomodoro phases~~ (adds more complexity)
- ~~Have a "queue" button, that displays upcoming Pomodoro stores~~
- Take advantage of local storage more. E.g. Keep track of how far a user is through their Pomdoro if they close tab.
- Add additional sounds, have more of a countdown effect ✅

## Technologies

React 19 + TypeScript – Core framework for building interactive UI components.
Vite – Fast development server and build tool.
CSS – Custom styles with responsive layouts and color-coded phases.

## Audio Notifications

~~Note this project has audio notifications. Currently I am only using .ogg files - I believe these have issues on Safari. I hope to improve them in the future.~~
HTML5 <audio> is now done with 2 .wav files - I checked with a few browsers and did not find issues. Please feel free to report if any suggestions for improvements.
