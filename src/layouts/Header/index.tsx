import Logo from "./HeaderItem/Logo";
import NavLinks from "./HeaderItem/NavLinks";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  // 헤더가 나타나는지, 사라지는지 추적
  const [showHeader, setShowHeader] = useState(true);

  // 직전 스크롤의 위치 추적
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치 저장
      const currentScrollPos = window.pageYOffset;

      // isScrollingUp: 현재 스크롤 위치가 이전 스크롤보다 위에 있는 상태
      const isScrollingUp = currentScrollPos < prevScrollPos;

      // 스크롤 방향에 따라 헤더 표시하기
      setShowHeader(isScrollingUp || currentScrollPos < 10);

      // prevScrollPos -> 현재 스크롤 위치
      setPrevScrollPos(currentScrollPos);
    };

    // 스크롤 할 때마다 handleScroll 실행
    window.addEventListener("scroll", handleScroll);

    // 이벤트 리스너 해제
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // prevScrollPos 값이 변경될 때마다 useEffect 실행
  }, [prevScrollPos]);

  // 페이지가 로드될 때 한 번 실행하는 코드 추가
  useEffect(() => {
    setShowHeader(true);
  }, []);

  // 새로고침할 때 헤더가 애니메이션 없이 고정됨
  const headerVariants = {
    hidden: { y: -100 },
    visible: { y: 0 },
  };
  const animate = showHeader ? "visible" : "hidden";
  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={animate}
        transition={{ duration: 0.3 }}
        className="fixed top-0 z-40 w-full bg-white shadow-sm"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Logo />
          <div className="flex gap-6 text-xl ">
            <NavLinks />
          </div>
        </div>
      </motion.header>
    </>
  );
}
