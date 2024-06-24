// components/ui/Loader.tsx

import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

const Loader: FC<LoaderProps> = ({ size = 50, color = '#ffffff', className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loader;
