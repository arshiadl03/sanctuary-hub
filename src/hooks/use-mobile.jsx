import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // حذف شد <boolean | undefined> تایپ
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // اضافه شد برای پشتیبانی بهتر در مرورگرهای قدیمی‌تر addListener
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}