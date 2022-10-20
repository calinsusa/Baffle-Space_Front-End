import { ButtonGroup, Button, Icon } from "@mui/material";

const Buttons = ({ gameContext, userSetGameContext }) => {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {gameContext.map((game) => (
        <Button
          size="large"
          onClick={() => userSetGameContext(game.id)}
          key={game.id}
        >
          {game.contextName}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Buttons;
