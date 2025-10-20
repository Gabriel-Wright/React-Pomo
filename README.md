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
  -Pause, skip and reset buttons
- Warmup round
- Different theming options

## Future Milestones

- Optional Warmup phase ✅
- Settings menu optional apply or cancel settings ✅
- Improved test suite ✅
- Dropdown selection for different visual themes ✅
- ~~Refactor current iterative pomodoro phases approach to a queue system storing upcoming pomodoro phases~~ (feels extensible as is)
- ~~Have a "queue" button, that displays upcoming Pomodoro stores~~ (felt would make the app too distracting)
- Take advantage of local storage more. E.g. Keep track of how far a user is through their Pomdoro if they close tab.
- Add additional sounds, have more of a countdown effect ✅

## Technologies

React 19 + TypeScript – Core framework for building interactive UI components.
Vite – Fast development server and build tool.
CSS – Custom styles with responsive layouts and color-coded phases.

## Audio Notifications

~~Note this project has audio notifications. Currently I am only using .ogg files - I believe these have issues on Safari. I hope to improve them in the future.~~

HTML5 audio is now done with 2 .wav files - I checked with a few browsers and did not find issues. Please report if you encounter any issues.
