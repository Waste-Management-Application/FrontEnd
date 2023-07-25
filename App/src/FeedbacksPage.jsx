import Dashboard from "./Dashboard";

function FeedbacksPage() {
  const complaints = [
    {
      postId: 1,
      it: 1,
      name: "that labor from and how labors",
      email: "Eliseo@gardner.biz",
      body: "for those who praise, as it were, indeed with great pleasure, those times when they are in need, rather than rejecting them, and for the wise accusers",
    },
    {
      postId: 1,
      it: 2,
      name: "jhfgjhlkh",
      email: "Jayne_Kuhic@sydney.com",
      body: "for he was born, there is nothing in pain, all pleasure is never",
    },
    {
      postId: 1,
      it: 3,
      name: "I hate to get things or feelings",
      email: "Nikita@garfield.biz",
      body: "because he reproaches for trouble as if he were to be reproached, a certain dark-skinned sailor will come to be praised. He is often chosen by certain names because we accuse the elders, for he is with us and we lead, and indeed he will receive the pleasures of the gentler reason",
    },
    {
      postId: 1,
      it: 4,
      name: "others hate",
      email: "Lew@alysha.tv",
      body: "not again and again\nblinded do they leave those who accuse us, whence they hate us pleasure\nbecause pleasure therefore attains pain\nnot those who are softened by things as blinded",
    },
    {
      postId: 2,
      it: 6,
      name: "and flees from electing the meek indeed, who are but nothing.",
      email: "Presley.Mueller@myrl.com",
      body: "hgjlhkk;hjk",
    },
    {
      postId: 2,
      it: 8,
      name: "and all pain",
      email: "Mallory_Kunze@marie.org",
      body: "that he may desire the pleasure of the corrupt\nand not the pleasure of the greater ones\nbut unless he wills, we accuse the greater ones\nof pleasures because something and any of them",
    },
    {
      postId: 2,
      it: 9,
      name: "provide that pleasure",
      email: "Meghan_Littel@rene.us",
      body: "I shall open the distinction of hardships and \beginnings of hardships with wisdom, and that every \net blinded person hates the fact that it is convenient,\nbecause it is less",
    },
    {
      postId: 2,
      it: 10,
      name: "John",
      email: "Carmen_Keeling@caroline.name",
      body: "Whoever reproaches us with just pleasure will have none\nbecause he wants the pains and does not\nbecause he seeks our needs\nnone and we accuse him only of the easy ones",
    },
    {
      postId: 3,
      it: 11,
      name: "he flees from labor because the resilience they leave behind is ours.",
      email: "Veronica_Goodwin@timmothy.net",
      body: "so that our pains are either because it is a flight to find or to choose, I will explain who will be pursued, the dark-headed naut repels that which he was born with, because it is so or so that they are older",
    },
    {
      postId: 3,
      it: 12,
      name: "ways to make them suffer for that pain",
      email: "Oswald.Vandervort@leanne.org",
      body: "ohkllj;l",
    },
  ];

  return (
    <div className="flex flex-row h-screen w-full ">
      <Dashboard />
      <div className="h-screen overflow-auto w-full">
        <div className="flex justify-between p-4  w-full">
          <h1 className="font-semibold text-3xl text-g4">Feedbacks</h1>
        </div>
        <div className=" flex flex-col border-none  justify-center items-center">
          {complaints.map((complaint, i) => {
            return (
              <div
                className=" flex flex-row mx-7 my-4 h-[100px] w-[600px]  overflow-clip"
                key={i}
              >
                <div className="h-full w-[100px] border-l-2 border-g1 rounded-l-lg m-4">
                  <p className="m-9 text-gray-300 text-sm">Today 3:00</p>
                </div>
                <div className="h-full w-full">
                  <div className="h-10 w-full">
                    <h1 className="text-md text-g5 font-bold">user</h1>
                  </div>
                  <div className="h-full w-full ">
                    <h1 className="text-gray-400">{complaint.body}</h1>
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

export default FeedbacksPage;
//
