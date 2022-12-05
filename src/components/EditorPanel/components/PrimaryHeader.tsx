import React from 'react';
import { BsBuilding as BuildingIcon } from 'react-icons/bs';
import {
  GiTempleGate as LandMarkIcon,
  GiStripedSun as SkyExposureIcon
  // GiTwoShadows as ShadowIcon
} from 'react-icons/gi';
import { MdAutoGraph as LightIcon } from 'react-icons/md';
import { VscChromeClose as CloseIcon } from 'react-icons/vsc';
import { clsx as cx } from 'clsx';
import useStore from '../../../store';

function PrimaryHeader(): JSX.Element {
  const editMode = useStore((state) => state.editMode);
  const setIsMenuOpen = useStore((state) => state.setIsMenuOpen);
  const setEditMode = useStore((state) => state.setEditMode);

  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-2">
        <button
          onClick={() => setEditMode('buildings')}
          className={cx(
            'flex items-center justify-center w-10 h-10  rounded-full outline -outline-offset-1 outline-1',
            editMode === 'buildings' ? 'outline-sky-400 bg-sky-100' : 'outline-gray-300'
          )}>
          <BuildingIcon
            size={18}
            className={cx(editMode === 'buildings' ? 'fill-sky-500' : 'fill-gray-400')}
          />
        </button>
        <button
          onClick={() => setEditMode('light')}
          className={cx(
            'flex items-center justify-center w-10 h-10  rounded-full outline -outline-offset-1 outline-1',
            editMode === 'light' ? 'outline-sky-400 bg-sky-100' : 'outline-gray-300'
          )}>
          <LightIcon
            size={18}
            className={cx(editMode === 'light' ? 'fill-sky-500' : 'fill-gray-400')}
          />
        </button>
        <button
          onClick={() => setEditMode('landmark')}
          className={cx(
            'flex items-center justify-center w-10 h-10  rounded-full outline -outline-offset-1 outline-1',
            editMode === 'landmark' ? 'outline-sky-400 bg-sky-100' : 'outline-gray-300'
          )}>
          <LandMarkIcon
            size={18}
            className={cx(editMode === 'landmark' ? 'fill-sky-500' : 'fill-gray-400')}
          />
        </button>
        <button
          onClick={() => setEditMode('sky-exposure')}
          className={cx(
            'flex items-center justify-center w-10 h-10  rounded-full outline -outline-offset-1 outline-1',
            editMode === 'sky-exposure' ? 'outline-sky-400 bg-sky-100' : 'outline-gray-300'
          )}>
          <SkyExposureIcon
            size={18}
            className={cx(editMode === 'sky-exposure' ? 'fill-sky-500' : 'fill-gray-400')}
          />
        </button>
      </div>
      <button
        className="flex items-center justify-center w-10 h-10 bg-red-300 rounded-md shadow-lg"
        onClick={() => setIsMenuOpen(false)}>
        <CloseIcon size={26} />
      </button>
    </div>
  );
}

export default PrimaryHeader;
