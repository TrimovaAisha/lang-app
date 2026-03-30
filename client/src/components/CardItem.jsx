function CardItem({ card, index, updateCard, removeCard }) {
  return (
    <div className="card-editor">
      <input
        placeholder="Термин"
        value={card.term}
        onChange={(e) =>
          updateCard(index, 'term', e.target.value)
        }
      />

      <input
        placeholder="Определение"
        value={card.definition}
        onChange={(e) =>
          updateCard(index, 'definition', e.target.value)
        }
      />

      <i
        className="fa-solid fa-trash card-delete"
        onClick={() => removeCard(index)}
      ></i>
    </div>
  )
}

export default CardItem