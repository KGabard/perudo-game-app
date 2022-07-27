import arrowIcon from '../Assets/Images/arrow.svg'

export default function PlayersNumber({
  playersNumber,
  addPlayer,
  removePlayer,
}) {
  return (
    <div className="playersNumber">
      <p className="playersNumber__label">Nombre de joueurs ?</p>
      <div className="playersNumber__numberContainer">
        <div className="playersNumber__number">{playersNumber}</div>
        <img
          onClick={() => addPlayer()}
          src={arrowIcon}
          className="playersNumber__upArrow"
          alt="Flèche haut"
        ></img>
        <img
          onClick={() => removePlayer()}
          src={arrowIcon}
          className="playersNumber__downArrow"
          alt="Flèche bas"
        ></img>
      </div>
    </div>
  )
}

// import arrowIcon from '../Assets/Images/arrow.svg'

// export default function PlayersNumber({
//   playersNumber,
//   increasePlayersNumber,
//   decreasePlayersNumber,
// }) {
//   return (
//     <div className="playersNumber">
//       <p className="playersNumber__label">Nombre de joueurs ?</p>
//       <div className="playersNumber__numberContainer">
//         <input
//           type="number"
//           value={playersNumber}
//           onChange={() => {}}
//           name="playersNumber"
//           className="playersNumber__number"
//         />
//         <img
//           onClick={() => increasePlayersNumber()}
//           src={arrowIcon}
//           className="playersNumber__upArrow"
//           alt="Flèche haut"
//         ></img>
//         <img
//           onClick={() => decreasePlayersNumber()}
//           src={arrowIcon}
//           className="playersNumber__downArrow"
//           alt="Flèche bas"
//         ></img>
//       </div>
//     </div>
//   )
// }
