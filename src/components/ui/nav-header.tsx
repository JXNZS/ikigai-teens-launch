"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { labelToKey } from "@/lib/translations";

type NavHeaderProps = {
  items: string[];
  activeItem: string | null;
  onItemClick: (label: string) => void;
};

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

const initialPosition: CursorPosition = {
  left: 0,
  width: 0,
  opacity: 0,
};

function NavHeader({ items, activeItem, onItemClick }: NavHeaderProps) {
  const [position, setPosition] = useState<CursorPosition>(initialPosition);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!activeItem) {
      setPosition((pv) => ({ ...pv, opacity: 0 }));
      return;
    }

    if (!listRef.current) {
      return;
    }

    const activeTab = listRef.current.querySelector<HTMLElement>(`[data-nav-tab="${activeItem}"]`);
    if (!activeTab) {
      return;
    }

    setPosition({
      width: activeTab.offsetWidth,
      opacity: 1,
      left: activeTab.offsetLeft,
    });
  }, [activeItem]);

  return (
    <ul
      ref={listRef}
      className="relative mx-auto flex w-fit rounded-full border border-[rgba(44,66,63,0.35)] p-1"
      style={{ backgroundColor: "#2C423F" }}
      onMouseLeave={() => {
        if (!activeItem) {
          setPosition((pv) => ({ ...pv, opacity: 0 }));
        }
      }}
    >
      {items.map((item) => (
        <Tab key={item} label={item} setPosition={setPosition} onClick={onItemClick} />
      ))}
      <Cursor position={position} />
    </ul>
  );
}

type TabProps = {
  label: string;
  setPosition: Dispatch<SetStateAction<CursorPosition>>;
  onClick: (label: string) => void;
};

const Tab = ({ label, setPosition, onClick }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { t } = useLanguage();
  const displayLabel = labelToKey[label] ? t(labelToKey[label]) : label;

  return (
    <li
      ref={ref}
      data-nav-tab={label}
      onMouseEnter={() => {
        if (!ref.current) return;

        setPosition({
          width: ref.current.offsetWidth,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      onClick={() => onClick(label)}
      className="relative z-10 block cursor-pointer select-none px-3 py-1.5 text-xs font-body uppercase tracking-wide text-white mix-blend-lighten md:px-5 md:py-2 md:text-sm"
    >
      {displayLabel}
    </li>
  );
};

const Cursor = ({ position }: { position: CursorPosition }) => {
  return <motion.li animate={position} className="absolute z-0 h-7 rounded-full md:h-9" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />;
};

export default NavHeader;
