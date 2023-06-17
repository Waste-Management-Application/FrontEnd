import { BiMenu } from "react-icons/bi";
import { TbSortAscending } from "react-icons/tb";
import Bar from "./Bar";
import imgnews from "./assets/news.jpeg";

function News() {
  const news = [
    {
      title: "News1",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
    {
      title: "News2",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
    {
      title: "News3",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
    {
      title: "News4",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
    {
      title: "News5",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam!",
    },
  ];

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
              {news.map((info, i) => (
                <div key={i} className="flex h-20 border  w-fill m-4 shadow-md">
                  <div className="h-fill w-[30%] border ">
                    <img src={imgnews} className="fill" />
                  </div>
                  <div className="h-fill w-[70%] border ">
                    <p>{info.text}</p>
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
