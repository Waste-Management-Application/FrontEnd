import SideBar from "./SideBar";
import Bar from "./Bar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function NewsDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything/${id}?apiKey=2e365172c734402695bee95c8ffc6129`
        );

        setArticle(response.data);
      } catch (error) {
        console.log("Error:", error);
        // Handle the error or display an error message
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div>
      <div className="flex  justify-center items-center h-screen w-full ">
        <div className=" overflow-hidden   h-screen w-full ">
          <div className="flex  h-20 p-4 justify-between text-xl shadow-sm bg-gray-100 text-g3 opacity-1 ">
            <h1 className=" font-semibold justify-start text-2xl">BinBuddy</h1>
            <SideBar />
          </div>
          {article ? (
            <div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              {/* Render other article details as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Bar />
      </div>
    </div>
  );
}

export default NewsDetails;
