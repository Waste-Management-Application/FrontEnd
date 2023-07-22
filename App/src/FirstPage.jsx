import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FirstPage() {
  const history = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      history("/signin");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [history]);
  return (
    <div className="flex justify-center items-center h-screen w-full bg-g3">
      <div className="h-[200px] w-[200px] bg-white rounded-lg animate-spin-slow">
        <img
          src="./src/assets/splash2.png"
          alt="Splash"
          className="h-[200px] w-[500px] bg-white rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
}

export default FirstPage;
