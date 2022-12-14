import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import useStore from '../../store';
import { HiOutlineMenu as OpenIcon } from 'react-icons/hi';
import PrimaryHeader from './components/PrimaryHeader';
import BuildingPanel from '../BuildingPanel';
import LandmarkPanel from '../LandmarkPanel';
import LightPanel from '../LightPanel';
import ShadowPanel from '../ShadowPanel';
import SkyExposurePanel from '../SkyExposurePanel';

const menuVariants = {
  open: {
    x: 0
  },
  closed: {
    x: 'calc(100% + 0.5rem)'
  }
};

function EditorPanel(): JSX.Element {
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const setIsMenuOpen = useStore((state) => state.setIsMenuOpen);
  const editMode = useStore((state) => state.editMode);

  return (
    <motion.div
      variants={menuVariants}
      animate={isMenuOpen ? 'open' : 'closed'}
      transition={{
        duration: 0.3,
        type: 'tween'
      }}
      initial="closed"
      className="absolute flex flex-col w-1/4 min-w-[360px] max-w-md bg-white rounded-md shadow-md min-w-sm top-2 bottom-2 right-2 backdrop-blur-sm bg-opacity-90">
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="shadow-md bg-blue-300 w-10 h-10 rounded-md absolute top-[0.5rem] left-0 translate-x-[calc(-100%-1rem)] flex items-center justify-center"
            onClick={() => setIsMenuOpen(true)}>
            <OpenIcon size={26} />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Primary Panel content */}
      <div className="w-full p-2">
        <PrimaryHeader />
      </div>

      <div className="h-[1px] w-auto mx-2 bg-gray-300" />

      <div className="flex flex-col flex-1 overflow-auto">
        {editMode === 'buildings' && <BuildingPanel />}
        {editMode === 'landmark' && <LandmarkPanel />}
        {editMode === 'light' && <LightPanel />}
        {editMode === 'shadow' && <ShadowPanel />}
        {editMode === 'sky-exposure' && <SkyExposurePanel />}
      </div>
    </motion.div>
  );
}

export default EditorPanel;
