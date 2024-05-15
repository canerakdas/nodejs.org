import { useDetectOS } from '@/hooks';

const useCommandKey = () => {
  const { os } = useDetectOS();
  const osCommandKey = os === 'MAC' ? '⌘' : 'Ctrl';
  const isOSLoading = os === 'LOADING';

  return { osCommandKey, isOSLoading };
};

export default useCommandKey;
