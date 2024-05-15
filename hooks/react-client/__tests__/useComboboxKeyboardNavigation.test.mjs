import { renderHook, act, fireEvent } from '@testing-library/react';

import useComboboxKeyboardNavigation from '@/hooks/react-client/useComboboxKeyboardNavigation';

describe('useComboboxKeyboardNavigation', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useComboboxKeyboardNavigation({}));

    expect(result.current.cursor[0]).toBeUndefined();
    expect(result.current.navigation).toBeUndefined();
  });

  it('should update cursor on value change', () => {
    const onValueChange = jest.fn();
    const { result } = renderHook(() =>
      useComboboxKeyboardNavigation({ onValueChange })
    );

    act(() => {
      fireEvent.keyDown(document, { key: 'ArrowDown' });
    });

    expect(onValueChange).toHaveBeenCalled();
    expect(result.current.cursor[0]).toBe(0);
  });

  it('should call onPressEnter on "enter" command', () => {
    const onPressEnter = jest.fn();
    renderHook(() => useComboboxKeyboardNavigation({ onPressEnter }));

    act(() => {
      fireEvent.keyDown(document, { key: 'Enter' });
    });

    expect(onPressEnter).toHaveBeenCalled();
  });
});
