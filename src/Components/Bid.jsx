import Dice from './Dice'
import arrowBtn from '../Assets/Images/white-arrow.png'
import arrowBtnHover from '../Assets/Images/blue-arrow.png'
import { v4 as uuidv4 } from 'uuid'
import useBidData from '../hooks/useBidData'
import useGameData from '../hooks/useGameData'
import useArrowBtns from '../hooks/useArrowBtns'

export default function Bid(props) {
  const currentPlayer = props.playerData
  const { game } = useGameData()
  const {
    increaseBidCount,
    decreaseBidCount,
    increaseBidValue,
    decreaseBidValue,
  } = useBidData()

  const { areArrowBtnsHovered, toggleHoverTrue, toggleHoverFalse } =
    useArrowBtns()

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
            onMouseOver={() => toggleHoverTrue('countLeft')}
            onMouseOut={() => toggleHoverFalse()}
            onClick={() => decreaseBidCount(currentPlayer)}
            src={areArrowBtnsHovered.countLeft ? arrowBtnHover : arrowBtn}
            className="bid__countLeftArrow"
            alt="Flèche gauche"
          ></img>
        )}
        {isHumanPlaying && (
          <img
            onMouseOver={() => toggleHoverTrue('countRight')}
            onMouseOut={() => toggleHoverFalse()}
            onClick={() => increaseBidCount(currentPlayer)}
            src={areArrowBtnsHovered.countRight ? arrowBtnHover : arrowBtn}
            className="bid__countRightArrow"
            alt="Flèche droite"
          ></img>
        )}
      </div>
      <div className="bid__diceContainer">
        <Dice
          key={uuidv4()}
          value={currentPlayer.bid.value}
          isDisplayed={true}
          isDisabled={false}
        />
        {isHumanPlaying && (
          <img
            onMouseOver={() => toggleHoverTrue('diceLeft')}
            onMouseOut={() => toggleHoverFalse()}
            onClick={() => decreaseBidValue(currentPlayer)}
            src={areArrowBtnsHovered.diceLeft ? arrowBtnHover : arrowBtn}
            className="bid__diceLeftArrow"
            alt="Flèche gauche"
          ></img>
        )}
        {isHumanPlaying && (
          <img
            onMouseOver={() => toggleHoverTrue('diceRight')}
            onMouseOut={() => toggleHoverFalse()}
            onClick={() => increaseBidValue(currentPlayer)}
            src={areArrowBtnsHovered.diceRight ? arrowBtnHover : arrowBtn}
            className="bid__diceRightArrow"
            alt="Flèche droite"
          ></img>
        )}
      </div>
    </div>
  )
}
