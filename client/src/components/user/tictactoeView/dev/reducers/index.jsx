import cells from "./cells.jsx";
import player from './player.jsx';
import { combineReducers } from "redux";

const TicTacToeApp = combineReducers({cells, player});

export default TicTacToeApp;