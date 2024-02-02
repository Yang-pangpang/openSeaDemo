import React, { Fragment, useEffect } from "react";
import closeIcon from '../static/close.png';
import {mainnet } from 'wagmi/chains';

interface DialogProps {
  isVisible: boolean;
  close: () => void;
  children?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = (props) => {
  console.log('mainnet',mainnet)
  const { isVisible, close } = props;
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);
  return (
    <Fragment>
      {isVisible && (
        <div
          className="w-full h-full fixed left-0 top-0 bg-black z-20 flex items-center justify-center bg-opacity-50"
          onClick={close}
        >
          <div className="w-1/4 h-3/5 bg-white rounded-xl cursor-pointer shadow-2xl shadow-gray-200 hover:scale-105 duration-300 flex flex-col items-center overflow-hidden" onClick={e=>{e.stopPropagation()}}>
            <div className="px-4 py-4 w-full h-44 bg-cover bg-[url('https://opensea.io/static/images/wallet/background-wallet.png')]">
            <div className="w-full flex items-center justify-end">
            <span className="w-[36px] h-[36px] bg-black bg-opacity-60 rounded-full flex items-center justify-center" onClick={close}><img className="w-[30px] h-[30px]" src={closeIcon} alt="cover"/></span>
            </div>
            </div>
            <span className="font-bold text-3xl">Connect to Yonga</span>
           
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Dialog;
