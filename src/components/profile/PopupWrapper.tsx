import React from 'react';

function PopupWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 bg-white p-6 rounded-lg w-1/2 max-w-md min-w-xs shadow-lg">
        {children}
      </div>
    </div>
  );
}

export default PopupWrapper;
