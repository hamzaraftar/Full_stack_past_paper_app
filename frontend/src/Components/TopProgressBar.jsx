import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";

import "nprogress/nprogress.css";
import "./TopProgressBar.css";

NProgress.configure({
  showSpinner: false,
});

function TopProgressBar() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

export default TopProgressBar;