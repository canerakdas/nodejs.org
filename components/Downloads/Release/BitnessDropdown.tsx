'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { useEffect, useContext, useMemo } from 'react';
import semVer from 'semver';

import Select from '@/components/Common/Select';
import { useDetectOS } from '@/hooks/react-client';
import { ReleaseContext } from '@/providers/releaseProvider';
import { bitnessItems, formatDropdownItems } from '@/util/downloadUtils';

const parseNumericBitness = (bitness: string) =>
  /^\d+$/.test(bitness) ? Number(bitness) : bitness;

const BitnessDropdown: FC = () => {
  const { bitness: userBitness } = useDetectOS();
  const { bitness, os, release, setBitness } = useContext(ReleaseContext);
  const t = useTranslations();

  // we also reset the bitness when the OS changes, because different OSs have
  // different bitnesses available
  useEffect(() => setBitness(userBitness), [setBitness, os, userBitness]);

  // @TOOD: We should have a proper utility that gives
  // disabled OSs, Platforms, based on specific criteria
  // this can be an optimisation for the future
  // to remove this logic from this component
  const disabledItems = useMemo(() => {
    const disabledItems = [];

    if (os === 'WIN' && semVer.satisfies(release.version, '< 19.9.0')) {
      disabledItems.push('arm64');
    }

    if (os === 'LINUX' && semVer.satisfies(release.version, '< 4.0.0')) {
      disabledItems.push('arm64', 'armv7l');
    }

    if (os === 'LINUX' && semVer.satisfies(release.version, '< 4.4.0')) {
      disabledItems.push('ppc64le');
    }

    if (os === 'LINUX' && semVer.satisfies(release.version, '< 6.6.0')) {
      disabledItems.push('s390x');
    }

    return disabledItems;
  }, [os, release.version]);

  return (
    <Select
      values={formatDropdownItems({
        items: bitnessItems[os],
        disabledItems,
      })}
      defaultValue={String(bitness)}
      onChange={bitness => setBitness(parseNumericBitness(bitness))}
      inline={true}
      className="min-w-20"
      label={t('layouts.download.dropdown.bitness')}
    />
  );
};

export default BitnessDropdown;
