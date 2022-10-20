import { Slider } from "@mui/material";
import { useState, useEffect, useCallback, useRef } from "react";
import Buttons from "./Buttons";

const Sim = () => {
  const mark = [
    {
      value: 0,
      label: "0 tickets",
    },

    {
      value: 200,
      label: "200",
    },

    {
      value: 400,
      label: "400",
    },

    {
      value: 600,
      label: "600",
    },

    {
      value: 800,
      label: "800",
    },

    {
      value: 1000,
      label: "1000",
    },
  ];

  //StateVar
  const [numberOfTiketsSetByUser, setNumberOfTiketsSetByUser] = useState(0);
  const [numberOfPlayersInGame, setNumberOfPlayersInGame] = useState(0);
  const [sliderState, setSliderState] = useState(true);
  const [userIncome, setUserIncome] = useState(0);
  const [numberOfSimplePlayersInGame, setNumberOfSimplePlayersInGame] =
    useState(0);
  const [sumAmountForBaffleSpace, setSumAmountForBaffleSpace] = useState(0);
  const [newGameContext, setNewGameContext] = useState({});
  const [userEarningPercent, setUserEarningPercent] = useState();
  const [ticketPriceByGameType, setTicketPriceByGameType] = useState(0);
  const [amountDistributed, setAmountDistributed] = useState(0);
  //Var
  const gameContext = [
    {
      contextName: "Electronics",
      timeInterval: "7 days",
      maxTicketAmount: 200,
      minTiketAmount: 1,
      maxNumberOfPlayers: 500,
      minNumbersOfPlayers: 10,
      ticketPrice: 1,
      id: 0,
    },
    {
      contextName: "Cars",
      timeInterval: "30 days",
      maxTicketAmount: 1000,
      minTiketAmount: 1,
      maxNumberOfPlayers: 500,
      minNumbersOfPlayers: 10,
      ticketPrice: 2,
      id: 1,
    },
    {
      contextName: "Houses",
      timeInterval: "60 days",
      maxTicketAmount: 1000,
      minTiketAmount: 1,
      maxNumberOfPlayers: 1000,
      minNumbersOfPlayers: 10,
      ticketPrice: 3,
      id: 2,
    },
  ];

  let maxUserTiketAnount = 1000;
  let totalNumberOfTickets;
  let sumAmountForPlayers;
  let ticketsByPlayer = useRef([]);
  let newTicketsByPlayer = [];
  let percentByPlayer = [];
  let totalEarnByEachPlayer = [];
  //Func
  const createGameContext = (id) => {
    ticketsByPlayer.current.length = 0;
    gameContext.map((game) => {
      if (game.id === id) {
        setNewGameContext({
          ...newGameContext,
          contextName: game.contextName,
          timeInterval: game.timeInterval,
          maxTicketAmount: game.maxTicketAmount,
          minTiketAmount: game.minTiketAmount,
          maxNumberOfPlayers: game.maxNumberOfPlayers,
          minNumbersOfPlayers: game.minNumbersOfPlayers,
          ticketPrice: game.ticketPrice,
        });
        setTicketPriceByGameType(gameContext[id].ticketPrice);

        let playersInGame =
          Math.floor(
            Math.random() *
              (game.maxNumberOfPlayers - game.minNumbersOfPlayers + 1)
          ) + 10;
        setNumberOfPlayersInGame(playersInGame);
        for (let i = 0; i < playersInGame; i++) {
          let totalTiketsByPlayer =
            Math.floor(
              Math.random() * (game.maxTicketAmount - game.minTiketAmount + 1)
            ) + 1;
          ticketsByPlayer.current.push(totalTiketsByPlayer);
        }

        setSliderState(false);

        // console.log(playersInGame);
        // console.log(ticketsByPlayer);
      }
    });
  };

  const addUserTicketsToTicketsByPlayerArray = useCallback(() => {
    // console.log(numberOfTiketsSetByUser);

    newTicketsByPlayer = [...ticketsByPlayer.current, numberOfTiketsSetByUser];
    // console.log(newTicketsByPlayer);
    totalNumberOfTickets = newTicketsByPlayer.reduce(
      (prevValue, currentValue) => {
        return prevValue + currentValue;
      },
      0
    );
    setNumberOfSimplePlayersInGame(totalNumberOfTickets);
    // console.log("numarul total de bilete vandute este " + totalNumberOfTickets);

    let totalTicketsPrice = totalNumberOfTickets * ticketPriceByGameType;
    // console.log("pretul total al biletelor este " + totalTicketsPrice);
    sumAmountForPlayers = Math.floor((60 / 100) * totalTicketsPrice);
    setAmountDistributed(sumAmountForPlayers);
    setSumAmountForBaffleSpace(Math.floor((20 / 100) * totalTicketsPrice));
    // console.log(
    //   "suma care se imparte jucatorilor este de  " + sumAmountForPlayers
    // );
    percentCalculationForEachPlayer();
    playersIncome();
    getUserIncome();
    getUserPercent();
  }, [numberOfTiketsSetByUser, numberOfPlayersInGame]);

  const percentCalculationForEachPlayer = () => {
    for (let i = 0; i < newTicketsByPlayer.length; i++) {
      let percent = (
        (newTicketsByPlayer[i] / totalNumberOfTickets) *
        100
      ).toFixed(2);
      percentByPlayer.push(percent);
    }
    // console.log(percentByPlayer);
  };
  const playersIncome = () => {
    for (let i = 0; i < percentByPlayer.length; i++) {
      totalEarnByEachPlayer.push(
        ((percentByPlayer[i] * sumAmountForPlayers) / 100).toFixed(2)
      );
    }

    // console.log(totalEarnByEachPlayer);
  };

  const getUserIncome = () => {
    let income = Math.floor(totalEarnByEachPlayer.slice(-1));
    setUserIncome(income);
    // console.log(income);
  };

  const getUserPercent = () => {
    let percent = percentByPlayer.slice(-1);
    // console.log(percentByPlayer);
    //baga in array de 2 ori NaN dar se sterg la initializare ????
    if (percentByPlayer[0] === "NaN") {
      setUserEarningPercent(0);
    } else {
      setUserEarningPercent(percent);
    }
  };

  useEffect(() => {
    addUserTicketsToTicketsByPlayerArray();
  }, [addUserTicketsToTicketsByPlayerArray]);
  ////////////////////////////////////////////
  //JSX
  ////////////////////////////////////////////
  return (
    <div className="main-container">
      <div className="container-slider">
        <div>
          <p className="user-income-counter">
            {!userIncome ? 0 : userIncome}
            <span
              style={{
                fontSize: 40,
                color: "grey",
              }}
            >
              $
            </span>
          </p>
        </div>
        <div className="slider">
          <Slider
            disabled={sliderState}
            // step={10}
            color="primary"
            defaultValue={0}
            max={maxUserTiketAnount}
            marks={mark}
            valueLabelDisplay="auto"
            onChange={(e, val) => {
              setNumberOfTiketsSetByUser(val);
            }}
          />
        </div>
        <div className="container-buttons">
          <Buttons
            gameContext={gameContext}
            userSetGameContext={createGameContext}
          />
        </div>
        <div></div>
      </div>
      <div className="container-data">
        <h1>
          Simulate the earnings <br />
          for NFTs owners
        </h1>
        <div>
          <div>
            <h3>Simulated environment</h3>
            <p>
              Gategory :
              <span className="dinamic-data-style">
                {newGameContext.contextName}
              </span>
            </p>

            <p>
              Ticket price :{" "}
              <span className="dinamic-data-style">
                {ticketPriceByGameType} $
              </span>
            </p>

            <p>
              Duration :
              <span className="dinamic-data-style">
                {newGameContext.timeInterval}
              </span>
            </p>
            <p>
              <span>NFT owners :</span>
              <span className="dinamic-data-style">
                {numberOfPlayersInGame}
              </span>
            </p>
            <p>
              Amount distributed :
              <span className="dinamic-data-style">{amountDistributed} $</span>
            </p>
            <p>
              Number of tickets :
              <span className="dinamic-data-style">
                {numberOfSimplePlayersInGame}
              </span>
            </p>
            <p>
              Earning percent :
              <span className="dinamic-data-style">{userEarningPercent}%</span>
            </p>
            <p
              style={{
                marginTop: 10,
                color: "grey",
                fontSize: 12,
              }}
            >
              * the amounts in dollars are converted from MATIC,
              <br /> which is the official currency of the game platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sim;
