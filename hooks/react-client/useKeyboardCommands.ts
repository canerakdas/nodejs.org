import { useEffect } from 'react';

type KeyboardCommand = 'cmd-k' | 'escape' | 'down' | 'up' | 'enter' | 'tab';

type KeyboardCommandCallback = (
  key: KeyboardCommand,
  event?: KeyboardEvent
) => void;

const useKeyboardCommands = (fn: KeyboardCommandCallback) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Detect ⌘ + k on Mac, Ctrl + k on Windows
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        fn('cmd-k');
      }

      switch (event.key) {
        case 'Escape':
          fn('escape');
          break;
        case 'Enter':
          fn('enter');
          break;
        case 'ArrowDown':
          fn('down', event);
          break;
        case 'ArrowUp':
          fn('up', event);
          break;
        case 'Tab':
          fn('tab');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fn]);
};

export default useKeyboardCommands;
