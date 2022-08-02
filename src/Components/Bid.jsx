import Dice from './Dice'
import { v4 as uuidv4 } from 'uuid'
import useBidData from '../hooks/useBidData'
import useGameData from '../hooks/useGameData'
import arrowIcon from '../Assets/Images/arrow.svg'

export default function Bid(props) {
  const currentPlayer = props.playerData
  const { game } = useGameData()
  const {
    increaseBidCount,
    decreaseBidCount,
    increaseBidValue,
    decreaseBidValue,
  } = useBidData()

  const isHumanPlaying = currentPlayer.isComputer
    ? false
    : currentPlayer.isActive
    ? true
    : false

  return (
    <div className="bid">
      {isHumanPlaying && game.isPalifico && (
        <div className="bid__palificoSign">
          <span className="bid__palificoSign__letter">P</span>
          <span className="bid__palificoSign__letter">a</span>
          <span className="bid__palificoSign__letter">l</span>
          <span className="bid__palificoSign__letter">i</span>
          <span className="bid__palificoSign__letter">f</span>
          <span className="bid__palificoSign__letter">i</span>
          <span className="bid__palificoSign__letter">c</span>
          <span className="bid__palificoSign__letter">o</span>
          <span className="bid__palificoSign__letter"> </span>
          <span className="bid__palificoSign__letter">!</span>
        </div>
      )}
      <div className="bid__countContainer">
        <div className="bid__count">
          {currentPlayer.bid.count ? currentPlayer.bid.count : ''}
        </div>
        {isHumanPlaying && (
          <img
            src={arrowIcon}
            alt='flèche'
            className="bid__countLeftArrow"
            onClick={() => decreaseBidCount(currentPlayer)}
          ></img>
        )}
        {isHumanPlaying && (
          <img
          src={arrowIcon}
          alt='flèche'
            className="bid__countRightArrow"
            onClick={() => increaseBidCount(currentPlayer)}
          ></img>
        )}
      </div>
      <div className="bid__diceContainer">
        <Dice
          key={uuidv4()}
          value={currentPlayer.bid.value}
          isDisplayed={true}
          isDisabled={false}
          isBidDice={true}
        />
        {isHumanPlaying && (
          <img
          src={arrowIcon}
          alt='flèche'
            className="bid__diceLeftArrow"
            onClick={() => decreaseBidValue(currentPlayer)}
          ></img>
        )}
        {isHumanPlaying && (
          <img
          src={arrowIcon}
          alt='flèche'
            className="bid__diceRightArrow"
            onClick={() => increaseBidValue(currentPlayer)}
          ></img>
        )}
      </div>
    </div>
  )
}
