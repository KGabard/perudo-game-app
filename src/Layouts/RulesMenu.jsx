import React from 'react'
import { useDispatch } from 'react-redux'
import usePlayersData from '../hooks/usePlayersData'
import { updateHasToPlay } from '../redux/features/playersSlice'
import { hideMenu } from '../redux/features/gameSlice'

export default function RulesMenu() {
  const { activePlayers } = usePlayersData()
  const dispatch = useDispatch()

  const closeMenu = () => {
    activePlayers.forEach((item) => {
      item.isActive &&
        dispatch(updateHasToPlay({ player: item, hasToPlay: true }))
    })
    dispatch(hideMenu('rules'))
  }

  return (
    <div className="rulesMenu">
      <div onClick={closeMenu} className="rulesMenu__overlay"></div>
      <div className="rulesMenu__window">
        <h1 className="rulesMenu__header">Règles</h1>
        <h2 className="rulesMenu__title">I – Déroulement de la partie</h2>
        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            En début de partie tous les joueurs reçoivent cinq dès aléatoire.
            Seuls eux doivent connaître la valeur de leurs dés.
          </p>
          <p className="rulesMenu__paragraph">
            Le premier joueur doit ensuite faire une enchère. Il doit annoncer
            une valeur dedé et un nombre de dés, principalement en fonction de
            son tirage. Théoriquement, il doit se rapprocher au mieux de la
            réalité, mais ilpeut aussi bluffer.
          </p>
          <p className="rulesMenu__paragraph">
            C’est ensuite au joueur suivant de se prononcer. Il a trois choix :
          </p>
        </section>
        <ul className="rulesMenu__list">
          <li>
            Surenchérir : Il peut estimer que l’affirmation du premier joueur
            est plausible et il doit alors annoncer une surenchère,
          </li>
          <li>
            Dudo : Il peut estimer que l’affirmation du premier joueur est
            fausse et il doit annoncer « dudo » (je doute),
          </li>
          <li>
            Calza : Il peut estimer que l’affirmation du premier joueur est
            parfaitement juste et il doit alors annoncer « calza » (calé).
          </li>
        </ul>
        <h3 className="rulesMenu__subtitle">{'A) Surenchère'}</h3>
        <p className="rulesMenu__body">
          Pour surenchérir, le joueur doit choisir une seule des deux options
          suivantes :
        </p>
        <ul className="rulesMenu__list">
          <li>Soit augmenter la valeur des dés,</li>
          <li>Soit augmenter le nombre de dés.</li>
        </ul>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Une fois qu’il a fait ce choix, il doit annoncer sa nouvelle
            proposition et c’est au joueur situé à sa gauche de parler. Ce
            dernier peut dire « dudo » ou surenchérir et ainsi de suite.
          </p>
          <p className="rulesMenu__paragraph">
            Exemple : Le joueur précédent a annoncé « il y a au moins 5 dés de
            valeur 4 autour de cette table ». On peut annoncer « il y a eu moins
            7 dés de valeur 4 autour de cette table » (dans ce cas, on a
            augmenté le nombre de dés). Ou, « il y a au moins 5 dés de valeur 5
            autour de cette table » (dans ce cas, c’est la valeur des dés qui a
            été augmentée).
          </p>
        </section>

        <h3 className="rulesMenu__subtitle">{'B) Dudo (je doute)'}</h3>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Tous les joueurs révèlent leurs dés. On voit alors si la proposition
            du joueur précédent est exacte ou fausse.
          </p>
          <p className="rulesMenu__paragraph">
            Si la proposition du joueur précédent est exacte (c’est-à-dire qu’il
            y a un nombre de dés de la valeur choisie supérieur ou égal à la
            proposition du joueur précédent), le joueur qui vient d’annoncer «
            dudo » a perdu la manche : il perd un de ses dés.
          </p>
          <p className="rulesMenu__paragraph">
            Si la proposition du joueur précédent est fausse (c’est-à-dire qu’il
            y a un nombre de dés de la valeur choisie inférieur à la proposition
            du joueur précédent), c’est ce dernier qui a perdu la manche et il
            perd un de ses dés.
          </p>
          <p className="rulesMenu__paragraph">
            Un joueur qui perd son dernier dé est éliminé de la partie.
          </p>
        </section>

        <h3 className="rulesMenu__subtitle">{'C) Calza (calé)'}</h3>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Tous les joueurs révèlent leurs dès. On voit alors si la proposition
            du joueur précédent est parfaitement juste ou non.
          </p>
          <p className="rulesMenu__paragraph">
            Si la proposition du joueur précédent parfaitement juste
            (c’est-à-dire qu’il y a un nombre de dés de la valeur choisie
            parfaitement égal à la proposition du joueur précédent), le joueur
            qui vient d’annoncer « calza » a gagner la manche : il gagne un dé
            dans la limite des 5 dés de départ. Le joueur précédent conserve son
            nombre de dés.
          </p>
          <p className="rulesMenu__paragraph">
            Dans le cas où la proposition du joueur précédent n’est pas
            parfaitement juste alors le joueur qui vient d’annoncer « calza » a
            perdu la manche : il perd un de ses dés.
          </p>
          <p className="rulesMenu__paragraph">
            Un joueur qui perd son dernier dé est éliminé de la partie.
          </p>
        </section>

        <h2 className="rulesMenu__title">II – Manche suivante</h2>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Lorsqu’une manche se termine suite à un « dudo » ou « calza » et
            qu’un joueur a perdu (ou gagné) un dé, on recommence une nouvelle
            manche mélangeant à nouveau les dés aléatoirement. Le joueur qui
            vient de perdre (ou gagner) un dé est le nouveau premier joueur.
            S’il vient d’être éliminé de la partie, c’est le joueur suivant qui
            prend ce rôle.
          </p>
        </section>

        <h2 className="rulesMenu__title">III – Cas particuliers</h2>

        <h3 className="rulesMenu__subtitle">{'A) Les dés « Paco »'}</h3>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Les dés de valeur 1 sont spéciaux, ce sont des jokers. Tout d’abord,
            ils servent de joker lorsque les dés sont révélés suite à un « dudo
            ». Ils ont toujours la même valeur que celle de la dernière
            proposition exprimée.
          </p>
          <p className="rulesMenu__paragraph">
            Exemple : on révèle les dés suite à un « dudo » annoncé par un
            joueur. La proposition précédente est « il y a au moins 9 dés de
            valeur 3 autour de cette table ». Pour savoir si cette affirmation
            est exacte ou fausse, on ajoute les paco aux dés qui indiquent 3.
          </p>
        </section>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            On peut proposer des paco. Normalement, on ne peut qu’augmenter la
            valeur des dés. Mais les paco sont spéciaux et on peut parfaitement
            annoncer une proposition qui concerne les paco : Toutefois, il faut
            au moins annoncer un nombre de paco égal à la moitié de la
            proposition précédente. On arrondit toujours à l’entier supérieur.
          </p>
          <p className="rulesMenu__paragraph">
            Exemple : Le joueur précédent a annoncé « il y a eu moins 7 dés de
            valeur 4 autour de cette table ». Le joueur suivant peut dire « il y
            a au moins 4 dés paco autour de cette table ».
          </p>
        </section>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Notez que c’est le seul moment du jeu où on peut réduire la valeur
            du dé proposé.
          </p>
        </section>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Une fois qu’un joueur a annoncé un certain nombre de paco, le joueur
            suivant peut soit augmenter le nombre de paco proposés, soit changer
            la valeur des dés. Mais dans ce cas précis, il doit au moins
            proposer un nombre de dés égal à la proposition précédente plus un.
          </p>
        </section>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Exemple : Si un joueur a annoncé 4 paco, le joueur suivant, s’il
            souhaite augmenter la valeur du dé, doit au moins annoncer 9 dés (le
            double de la proposition précédente plus 1).
          </p>
        </section>

        <h3 className="rulesMenu__subtitle">{'B) Etre « Palifico »'}</h3>

        <section className="rulesMenu__body">
          <p className="rulesMenu__paragraph">
            Quand un joueur n’a plus qu’un dé dans son gobelet, il est «
            palifico » pendant une manche. Tant qu’un joueur est « palifico »
            les paco ne sont pas considérés comme des jokers et aucun joueur ne
            peut modifier la valeur du dé proposé par le premier joueur.
          </p>
        </section>

        <div onClick={closeMenu} className="rulesMenu__okBtn">
          ok
        </div>
      </div>
    </div>
  )
}
