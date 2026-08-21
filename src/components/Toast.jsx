import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Toast.css';

const Toast = () => {
  const { toastMessage } = useAppContext();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          className="veyra-toast"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <CheckCircle2 size={20} className="toast-icon" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
