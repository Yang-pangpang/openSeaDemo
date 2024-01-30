import React, { useEffect, useState } from "react";
import "./app.css";
import search from "./static/search.png";
import loginIcon from "./static/wallet.png";
import mineIcon from "./static/mine.png";
import cartIcon from "./static/cart.png";
import haoge from "./static/haoge.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import showStr from "./utils/utils";

// Import Swiper styles
import "swiper/css";

declare global {
  interface Window {
    ethereum?: any;
  }
}
function App() {
  const tabList = [
    { id: 1, name: "All" },
    { id: 2, name: "Art" },
    { id: 3, name: "Gaming" },
    { id: 4, name: "Memberships" },
    { id: 5, name: "PFPs" },
    { id: 6, name: "Photography" },
    { id: 7, name: "Music" },
  ];

  const listData = [
    {
      id: 1,
      url: "https://i.seadn.io/s/raw/files/ac750ed6cbf0087847b8ed677b36b5c0.png?auto=format&dpr=1&h=500&fr=1",
      name: "Dokkaebi",
      floor: "8.40 AVAX",
      total: "286 AVAX",
    },
    {
      id: 2,
      url: "https://i.seadn.io/gae/-iqXcpqe7HAyniScHBpPIXycN1HAflsWQeLZmz5oNUr3cBDyPXWIModuC1vVi_YbjXYG1gBpptHaSP4LmQzJcHPWIAkWWAruAAHJ?auto=format&dpr=1&h=500&fr=1",
      name: "IO: Imaginary Ones",
      floor: "1.24 ETH",
      total: "17K ETH",
    },
    {
      id: 3,
      url: "https://i.seadn.io/gae/Ci5b80drV-1iiraAng88eyUpHPI2EDckDaNjLawOW5HSq0dMMU2qgv-GaycjJO6MiLbDwdGGmcwS1JiuHdlu5lSsmvnGOiceWrCJ?auto=format&dpr=1&h=500&fr=1",
      name: "Nifty Island: Legendary Pistols",
      floor: "0.07 ETH",
      total: "316 ETH",
    },
    {
      id: 4,
      url: "https://i.seadn.io/s/raw/files/c2343055844908c788fb0fac667d9063.jpg?auto=format&dpr=1&h=500&fr=1",
      name: "TinFun",
      floor: "0.60 ETH",
      total: "123 ETH",
    },
    {
      id: 5,
      url: "https://i.seadn.io/gcs/files/774b6b9daa7064a64b00811b191fed00.gif?auto=format&dpr=1&h=500&fr=1",
      name: "The Potatoz",
      floor: "2.16 ETH",
      total: "104 ETH",
    },
    {
      id: 6,
      url: "https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1",
      name: "Early Retired Cats Club",
      floor: "0.27 ETH",
      total: "81 ETH",
    },
  ];
  const [sort, setSort] = useState(1);
  const sortList = [
    { id: 1, name: "Trending" },
    { id: 2, name: "Top" },
  ];
  const timePeriod = [
    { id: 1, name: "1h" },
    { id: 2, name: "6h" },
    { id: 3, name: "24h" },
    { id: 4, name: "7d" },
  ];
  const [isDefault, setIsDefault] = useState(1);
  const tabChange = (val: number) => {
    setIsDefault(val);
    console.log("selected", val);
  };
  const handleSort = (val: number) => {
    setSort(val);
  };

  useEffect(() => {
    // 在组件加载时尝试从 localStorage 中获取账户信息
    const storedAccount = localStorage.getItem("localAccount");
    if (storedAccount) {
      setCurrentAccount(storedAccount);
    }
  }, []);
  // 追踪用户钱包地址
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  const handleLogin = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please make sure you install MetaMask!!");
      return;
    } else {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
        localStorage.setItem("localAccount", accounts[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const switchAccount = async() =>{
    const { ethereum } = window;
    try {
      const switchAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(switchAccounts)
    } catch (error) {
      
    }
  }
  return (
    <div className="mx-auto w-full max-w-[2560px] h-full">
      <header className="w-full flex flex-col header">
        <nav className="w-full flex py-1.5 justify-between fixed top-0 z-10 px-4 sm:px-16 xxl:px-16 bg-[#253347]">
          <div className=" flex items-center text-white cursor-pointer">
            <img
              className="w-10 h-10"
              src="https://opensea.io/static/images/logos/opensea-logo.svg"
              alt="cover"
            />
            <span className="flex relative ml-2.5 mt-0.5 text-2xl font-bold">
              Yonga
            </span>
            <i className="w-1 h-4 px-5 flex items-center">|</i>
            <div className="flex items-center gap-8 font-bold">
              <span>Drops</span>
              <span>States</span>
              <span>Create</span>
            </div>
          </div>
          {/* search input */}
          <div className="search-wrap flex h-12 items-center rounded-xl p-3 text-md hover:scale-105 duration-300">
            <div className="flex items-center">
              <img className="w-6 h-6 mr-2" src={search} alt="cover" />
              <input
                className="w-100 text-white text-[16px] leading-[26px] placeholder:text-white"
                type="search"
                placeholder="Search"
              />
              <span className="text-white w-[26px] h-[26px] flex items-center justify-center  bg-gray-50 rounded-md clear-icon">
                /
              </span>
            </div>
          </div>
          {/* login in  */}
          <div className="flex items-center gap-8 h-10 cursor-pointer font-bold">
            {!currentAccount && (
              <span
                className="px-2 py-2 bg-[#59554e] text-white rounded-md flex items-center justify-center"
                onClick={handleLogin}
              >
                <img className="w-6 h-6 mr-2" src={loginIcon} alt="cover" />
                Login
              </span>
            )}
            {currentAccount && (
              <span
                className="px-2 py-2 bg-blue-400 text-white rounded-md flex items-center justify-center"
                onClick={switchAccount}
              >
                <img
                  className="w-6 h-6 mr-2 rounded-md"
                  src={haoge}
                  alt="cover"
                />
                {showStr(currentAccount)}
              </span>
            )}
            <span className="px-1.5 py-1 bg-[#59554e] text-white rounded-md flex items-center justify-center">
              <img className="w-8 h-8" src={mineIcon} alt="cover" />
            </span>
            <span className=" px-1.5 py-1 bg-[#59554e] text-white rounded-md flex items-center justify-center">
              <img className="w-8 h-8" src={cartIcon} alt="cover" />
            </span>
          </div>
        </nav>
        {/* table change */}
        <div className="flex-1 mt-20 px-4 sm:px-16 xxl:px-16">
          <div className="flex text-white font-bold text-base cursor-pointer">
            {tabList.map((item) => {
              return (
                <div
                  className={`mr-5 px-3 py-1.5 rounded-md hover:bg-[#8f8f8f] ${
                    isDefault === item.id ? "bg-[#8f8f8f]" : ""
                  }`}
                  key={item.id}
                  onClick={() => tabChange(item.id)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        {/* swiper */}
        <div className="mt-8 px-20">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={4}
            autoplay
            mousewheel
            loop={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={() => console.log(1)}
          >
            {listData.map((item) => {
              return (
                <SwiperSlide
                  className="h-[400px] rounded-xl overflow-hidden cursor-pointer"
                  key={item.id}
                >
                  <img
                    className="w-full h-[400px] flex items-center justify-between rounded-xl hover:scale-110 duration-300"
                    alt="cover"
                    src={item.url}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </header>
      {/* list */}

      <div className="w-ful mt-10 px-20">
        <div className="flex items-center justify-between">
          <div className="w-auto flex text-base font-medium rounded-xl bg-gray-100 px-1 py-1 cursor-pointer">
            {sortList.map((item) => {
              return (
                <span
                  className={`flex px-6 py-1.5 ${
                    sort === item.id ? "bg-white rounded-xl" : ""
                  }`}
                  key={item.id}
                  onClick={() => handleSort(item.id)}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
          <div className="flex items-center">
            <div className="w-auto flex text-base font-medium rounded-xl bg-gray-100 px-1 py-1 cursor-pointer">
              {timePeriod.map((item) => {
                return (
                  <span
                    className={`flex px-6 py-1.5 ${
                      sort === item.id ? "bg-white rounded-xl" : ""
                    }`}
                    key={item.id}
                    onClick={() => handleSort(item.id)}
                  >
                    {item.name}
                  </span>
                );
              })}
            </div>
            <div className="w-auto flex text-base font-medium rounded-xl bg-gray-100 cursor-pointer px-7 py-2.5 mx-4">
              All chains
            </div>
            <div className="w-auto flex text-base font-medium rounded-xl bg-gray-100 cursor-pointer px-7 py-2.5">
              View all
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-20 mt-5">
          <div className="flex flex-col">
            <div className="w-full h-10 flex justify-between leading-8 text-sm font-medium text-[#868686] border-b border-slate-200">
              <div className="px-5">
                <span className="mr-10">Rank</span>
                <span>Collection</span>
              </div>
              <div>
                <span className="px-40">Floor Price</span>
                <span className="mr-5">Volume</span>
              </div>
            </div>

            <ul className="w-full flex flex-col mt-5">
              <li className="w-full flex items-center justify-between pl-5 py-2 hover:bg-[#f6f6f6] rounded-lg hover:scale-105 duration-300">
                <div className="flex items-center">
                  <span className="mr-10 font-medium text-base">1</span>
                  <img
                    className="w-[75px] h-[75px] rounded-md object-cover overflow-hidden mx-5"
                    src="https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1"
                    alt="cover"
                  />
                  <span className="font-medium text-base">Pudgy Milady</span>
                </div>
                <div>
                  <span className="px-40 ml-5 font-medium text-base">
                    0.38ETH
                  </span>
                  <span className="mr-5 font-medium text-base">521ETH</span>
                </div>
              </li>
              <li className="w-full flex items-center justify-between pl-5 py-2 hover:bg-[#f6f6f6] rounded-lg hover:scale-105 duration-300">
                <div className="flex items-center">
                  <span className="mr-10 font-medium text-base">1</span>
                  <img
                    className="w-[75px] h-[75px] rounded-md object-cover overflow-hidden mx-5"
                    src="https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1"
                    alt="cover"
                  />
                  <span className="font-medium text-base">Pudgy Milady</span>
                </div>
                <div>
                  <span className="px-40 ml-5 font-medium text-base">
                    0.38ETH
                  </span>
                  <span className="mr-5 font-medium text-base">521ETH</span>
                </div>
              </li>
              <li className="w-full flex items-center justify-between pl-5 py-2 hover:bg-[#f6f6f6] rounded-lg hover:scale-105 duration-300">
                <div className="flex items-center">
                  <span className="mr-10 font-medium text-base">1</span>
                  <img
                    className="w-[75px] h-[75px] rounded-md object-cover overflow-hidden mx-5"
                    src="https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1"
                    alt="cover"
                  />
                  <span className="font-medium text-base">Pudgy Milady</span>
                </div>
                <div>
                  <span className="px-40 ml-5 font-medium text-base">
                    0.38ETH
                  </span>
                  <span className="mr-5 font-medium text-base">521ETH</span>
                </div>
              </li>
              <li className="w-full flex items-center justify-between pl-5 py-2 hover:bg-[#f6f6f6] rounded-lg hover:scale-105 duration-300">
                <div className="flex items-center">
                  <span className="mr-10 font-medium text-base">1</span>
                  <img
                    className="w-[75px] h-[75px] rounded-md object-cover overflow-hidden mx-5"
                    src="https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1"
                    alt="cover"
                  />
                  <span className="font-medium text-base">Pudgy Milady</span>
                </div>
                <div>
                  <span className="px-40 ml-5 font-medium text-base">
                    0.38ETH
                  </span>
                  <span className="mr-5 font-medium text-base">521ETH</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="w-full h-10 flex justify-between leading-8 text-sm font-medium text-[#868686] border-b border-slate-200">
              <div className="px-5">
                <span className="mr-10">Rank</span>
                <span>Collection</span>
              </div>
              <div>
                <span className="px-40">Floor Price</span>
                <span className="mr-5">Volume</span>
              </div>
            </div>

            <ul className="w-full flex flex-col mt-5">
              <li className="w-full flex items-center justify-between pl-5 py-2 hover:bg-[#f6f6f6] rounded-lg hover:scale-105 duration-300">
                <div className="flex items-center">
                  <span className="mr-10 font-medium text-base">1</span>
                  <img
                    className="w-[75px] h-[75px] rounded-md object-cover overflow-hidden mx-5"
                    src="https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1"
                    alt="cover"
                  />
                  <span className="font-medium text-base">Pudgy Milady</span>
                </div>
                <div>
                  <span className="px-40 ml-5 font-medium text-base">
                    0.38ETH
                  </span>
                  <span className="mr-5 font-medium text-base">521ETH</span>
                </div>
              </li>
              <li className="w-full flex items-center justify-between pl-5 py-2 hover:bg-[#f6f6f6] rounded-lg hover:scale-105 duration-300">
                <div className="flex items-center">
                  <span className="mr-10 font-medium text-base">1</span>
                  <img
                    className="w-[75px] h-[75px] rounded-md object-cover overflow-hidden mx-5"
                    src="https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1"
                    alt="cover"
                  />
                  <span className="font-medium text-base">Pudgy Milady</span>
                </div>
                <div>
                  <span className="px-40 ml-5 font-medium text-base">
                    0.38ETH
                  </span>
                  <span className="mr-5 font-medium text-base">521ETH</span>
                </div>
              </li>
              <li className="w-full flex items-center justify-between pl-5 py-2 hover:bg-[#f6f6f6] rounded-lg hover:scale-105 duration-300">
                <div className="flex items-center">
                  <span className="mr-10 font-medium text-base">1</span>
                  <img
                    className="w-[75px] h-[75px] rounded-md object-cover overflow-hidden mx-5"
                    src="https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1"
                    alt="cover"
                  />
                  <span className="font-medium text-base">Pudgy Milady</span>
                </div>
                <div>
                  <span className="px-40 ml-5 font-medium text-base">
                    0.38ETH
                  </span>
                  <span className="mr-5 font-medium text-base">521ETH</span>
                </div>
              </li>
              <li className="w-full flex items-center justify-between pl-5 py-2 hover:bg-[#f6f6f6] rounded-lg hover:scale-105 duration-300">
                <div className="flex items-center">
                  <span className="mr-10 font-medium text-base">1</span>
                  <img
                    className="w-[75px] h-[75px] rounded-md object-cover overflow-hidden mx-5"
                    src="https://i.seadn.io/s/raw/files/c2d2cff1e45cfe134e01306486458a7a.png?auto=format&dpr=1&h=500&fr=1"
                    alt="cover"
                  />
                  <span className="font-medium text-base">Pudgy Milady</span>
                </div>
                <div>
                  <span className="px-40 ml-5 font-medium text-base">
                    0.38ETH
                  </span>
                  <span className="mr-5 font-medium text-base">521ETH</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full h-50 mt-3 bg-white flex flex-col px-10 py-2">
        <h3 className="ml-4 text-2xl font-bold leading-9">
          Notable collections
        </h3>
        <div className="w-full flex items-center justify-evenly mt-10">
          {listData.map((item) => {
            return (
              <div
                className="w-35 h-37 rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 duration-300"
                key={item.id}
              >
                <img className="w-full h-22 cover" src={item.url} alt="cover" />
                <div className="px-2 mt-3">
                  <span className="text-xl font-bold leading-6">
                    {item.name}
                  </span>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-col">
                      <span className="text-sm leading-sm font-bold text-gray-400">
                        Floor
                      </span>
                      <span className="text-md leading-md font-semibold text-primary">
                        {item.floor}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm leading-sm font-bold text-gray-400">
                        Total volume
                      </span>
                      <span className="text-md leading-md font-semibold text-primary">
                        {item.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
