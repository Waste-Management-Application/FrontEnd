import { BiMenu } from "react-icons/bi";
import { TbSortAscending } from "react-icons/tb";
import Bar from "./Bar";
import imgnews from "./assets/news.jpeg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";


function News() {
  const [news, setNews] = useState([]);

  // const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=waste&apiKey=2e365172c734402695bee95c8ffc6129`
      );

      setNews(response.data.articles);
    };
    getArticles();
  }, []);

  return (
    <div>
      <div className="relative flex  justify-center items-center h-screen w-full  ">
        <div className=" overflow-auto h-screen w-full ">
          <div className="overflow-scroll">
            <div className="flex  h-20 p-4 w-fill justify-between text-xl border shadow-sm bg-gray-100 text-g3 opacity-1 ">
              <h1 className=" font-semibold justify-start text-2xl">
                BinBuddy
              </h1>
              <BiMenu className="h-10 w-auto" />
            </div>
            <div className="w-full h-40 border my-2 justify-between">
              <img src={imgnews} className="h-full w-auto" />
            </div>
            <div className="flex flex-row h-8 border">
              <h1 className="text-g2 font-semibold text-lg mx-4">Newest</h1>
              <div className="w-[60%] border h-[1px] items-center my-4 border-g3"></div>
              <TbSortAscending className="h-8 w-auto m-auto text-g3 " />
            </div>

            <ul>
              {news &&
                news.map((info, i) => (
                  <div
                    key={i}
                    className="flex h-20 border mx-2 w-fill overflow-hidden"
                  >
                    <div className="h-fill w-[30%] border ">
                      <img src={info.urlToImage} className="fill" />
                    </div>
                    <div className="h-fill w-[70%] border ">
                      <NavLink to={`/News/${info.id}`}>
                        <p>{info.description}</p>
                      </NavLink>
                    </div>
                  </div>
                ))}
            </ul>

            <Bar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
