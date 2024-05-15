import { useState } from 'react';

import { useKeyboardCommands } from '@/hooks';

type Navigation = {
  value: string;
  label: string;
};

type ComboboxKeyboardNavigation = {
  onBeforeCommand: () => boolean | void;
  onPressEnter: () => void;
  onValueChange: () => void;
  itemLimit?: number;
  roles?: { [key: string]: Array<Navigation> };
};

const useComboboxKeyboardNavigation = ({
  onBeforeCommand = () => {},
  onPressEnter = () => {},
  onValueChange = () => {},
  itemLimit = Number.MAX_VALUE,
  roles = {},
}: ComboboxKeyboardNavigation) => {
  const cursor = useState<number>();
  const [navigationItems, setNavigationItems] = useState<Array<Navigation>>();

  const [selectedItem, setSelectedItem] = cursor;

  useKeyboardCommands((cmd, event) => {
    // Prevent default behavior for the keyboard commands
    event?.preventDefault();
    onBeforeCommand();

    const hasSelectedItem = typeof selectedItem !== 'undefined';

    if (cmd === 'up' || cmd === 'down' || cmd === 'tab') {
      if (Object.keys(roles).length) {
        // We need to set the navigation items in the next tick to ensure that the
        // roles are set.
        setTimeout(
          () =>
            setNavigationItems(
              roles[
                (document.activeElement?.role as keyof typeof roles) ||
                  'default'
              ]
            ),
          0
        );
      }
    }

    switch (true) {
      // If the user presses the down arrow key and there is no selected item,
      // select the first item.
      case cmd === 'down' && !hasSelectedItem:
        setSelectedItem(0);
        onValueChange();
        break;
      // If the user presses the down arrow key and there is a selected item,
      // and the selected item is less than the item limit, select the next item.
      case cmd === 'down' && hasSelectedItem && selectedItem < itemLimit:
        setSelectedItem(selectedItem + 1);
        onValueChange();
        break;
      // If the user presses the up arrow key and there is a selected item, and
      // the selected item is not the first item, select the previous item.
      case cmd === 'up' && hasSelectedItem && selectedItem !== 0:
        setSelectedItem(selectedItem - 1);
        onValueChange();
        break;
      // If the user presses the enter key, call the onPressEnter callback.
      case cmd === 'enter':
        // If the user is not interacting with the facets, call the onPressEnter
        // callback.
        if (!document.activeElement?.role?.includes('tab')) onPressEnter();
        break;
      case cmd === 'tab':
        onValueChange();
        break;
      default:
    }
  });

  return {
    cursor: cursor,
    navigation: navigationItems,
  };
};

export default useComboboxKeyboardNavigation;
