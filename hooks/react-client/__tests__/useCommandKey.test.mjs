import { renderHook } from '@testing-library/react';

import useCommandKey from '@/hooks/react-client/useCommandKey';
import useDetectOS from '@/hooks/react-client/useDetectOS';

jest.mock('../useDetectOS.ts');

describe('useCommandKey', () => {
  it('should return ⌘ for macOS', () => {
    useDetectOS.mockReturnValue({ os: 'MAC' });
    const { result } = renderHook(() => useCommandKey());
    expect(result.current.osCommandKey).toBe('⌘');
    expect(result.current.isOSLoading).toBe(false);
  });

  it('should return Ctrl for Windows and Linux', () => {
    useDetectOS.mockReturnValue({ os: 'WINDOWS' });

    const { result } = renderHook(() => useCommandKey());
    expect(result.current.osCommandKey).toBe('Ctrl');
    expect(result.current.isOSLoading).toBe(false);
  });

  it('should return isOSLoading as true when OS is loading', () => {
    useDetectOS.mockReturnValue({ os: 'LOADING' });

    const { result } = renderHook(() => useCommandKey());
    expect(result.current.isOSLoading).toBe(true);
  });
});
