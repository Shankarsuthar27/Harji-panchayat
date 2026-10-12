import React, { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  solidIcon: string;
  regularIcon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', solidIcon: 'fa-solid fa-house', regularIcon: 'fa-solid fa-house' },
  { id: 'topics', label: 'Topics', solidIcon: 'fa-solid fa-clone', regularIcon: 'fa-regular fa-clone' },
  { id: 'messages', label: 'Messages', solidIcon: 'fa-solid fa-envelope', regularIcon: 'fa-regular fa-envelope' },
  { id: 'notifications', label: 'Notifications', solidIcon: 'fa-solid fa-bell', regularIcon: 'fa-regular fa-bell' },
  { id: 'bookmarks', label: 'Bookmarks', solidIcon: 'fa-solid fa-bookmark', regularIcon: 'fa-regular fa-bookmark' },
  { id: 'profile', label: 'Profile', solidIcon: 'fa-solid fa-user', regularIcon: 'fa-regular fa-user' },
];

export default function MobileSidebarDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const currentNav = NAV_ITEMS.find((item) => item.id === activeItem) || NAV_ITEMS[0];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#8c8c8c] p-0 sm:p-6 font-sans select-none overflow-hidden">
      {/* Mobile Frame Simulation */}
      <div
        className={`relative w-full h-[100dvh] sm:h-[812px] sm:max-w-[375px] bg-[#f7f7f7] sm:rounded-[40px] sm:border-[8px] sm:border-[#1a1a1a] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all`}
      >
        {/* ========================================= */}
        {/* SIDEBAR NAVIGATION                       */}
        {/* ========================================= */}
        <nav
          className="absolute top-0 left-0 w-[70%] h-full pt-[60px] pr-[20px] pb-[20px] pl-[30px] flex flex-col z-0"
          aria-label="Sidebar Navigation"
        >
          {/* Profile Section */}
          <div className="flex flex-col mb-[30px]">
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Arafat"
              alt="Avatar"
              className="w-[60px] h-[60px] rounded-full bg-[#e0e0e0] mb-[15px] object-cover shadow-sm"
            />
            <h2 className="text-[18px] text-black font-semibold mb-[4px] leading-tight tracking-tight">
              Arafat Sany
            </h2>
            <p className="text-[13px] text-[#888] font-normal">UX/UI Designer</p>
          </div>

          {/* Navigation Links */}
          <ul className="list-none flex flex-col gap-[5px] p-0 m-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.id;
              const iconClass = isActive ? item.solidIcon : item.regularIcon;

              return (
                <li
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`py-[14px] px-[20px] rounded-[30px] cursor-pointer flex items-center gap-[15px] text-[15px] font-medium transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#e5e5e5] text-[#111]'
                      : 'text-[#333] hover:bg-[#e5e5e5]'
                  }`}
                >
                  <i
                    className={`${iconClass} text-[18px] w-[20px] text-center text-[#333] transition-all duration-200 ${
                      isActive ? 'font-black scale-105' : 'font-normal'
                    }`}
                  />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ========================================= */}
        {/* MAIN CONTENT AREA (3D Layered Push)      */}
        {/* ========================================= */}
        <main
          className={`absolute top-0 left-0 w-full h-full bg-white z-10 flex flex-col transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] origin-left ${
            isOpen
              ? 'translate-x-[65%] scale-[0.9] rounded-[35px] shadow-[-15px_0_30px_rgba(0,0,0,0.12)] cursor-pointer'
              : 'translate-x-0 scale-100 rounded-none shadow-[-10px_0_20px_rgba(0,0,0,0.05)]'
          }`}
          onClick={() => {
            if (isOpen) setIsOpen(false);
          }}
        >
          {/* Header with Top-Right Menu Trigger */}
          <header className="flex justify-end items-center px-[20px] pt-[20px] pb-[10px] mt-[20px]">
            <button
              type="button"
              id="menuToggle"
              aria-label="Toggle Navigation Menu"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="bg-transparent border-0 text-[24px] cursor-pointer text-black outline-none p-[10px] rounded-full hover:bg-neutral-100 active:scale-95 transition-all flex items-center justify-center"
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>
          </header>

          {/* Screen Content View */}
          <div className="px-[24px] py-[20px] flex-1 flex flex-col">
            <h1 className="text-[24px] font-bold text-black mb-[8px] tracking-tight">
              {currentNav.label}
            </h1>
            <p className="text-[14px] text-[#666] leading-relaxed mb-6">
              Tap the top-right hamburger icon to open the 3D off-canvas navigation. Tapping anywhere on the main screen closes it.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Navigation Status
              </span>
              <div className="flex items-center gap-2 text-sm text-neutral-800">
                <i className={`${currentNav.solidIcon} text-neutral-900`}></i>
                <span className="font-semibold">{currentNav.label} View Active</span>
              </div>
            </div>
          </div>

          {/* Screen Overlay (invisible tap area to close) */}
          {isOpen && (
            <div
              className="absolute inset-0 z-20 cursor-pointer"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
