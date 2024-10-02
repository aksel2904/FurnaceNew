import "../App.css"

// Компонентв для рендеринга карт, для аукциона/для руки игрока

const renderProductionRow = (side) => {
    if (side.type === "exchange") {
        return (
            <>
                {side.details.from.map((resource, idx) => (
                    <div key={idx} className={`resource ${resource}`}></div>
                ))}
                <div className="conversion">
                    <span className="usage">x{side.maxUses}</span>
                    <span className="arrow">→</span>
                </div>
                {side.details.to.map((resource, idx) => {
                    if (resource === "coin" && typeof side.details.to[idx + 1] === 'number') {
                        return (
                            <>
                                <div className="resource coin"></div>
                                <span className="usage">x{side.details.to[idx + 1]}</span>
                            </>
                        );
                    } else if (typeof resource === 'number') {
                        // Пропускаем рендер числа, так как оно уже обработано в предыдущем условии
                        return null;
                    } else {
                        return (
                            <div key={idx} className={`resource ${resource}`}></div>
                        );
                    }
                })}
            </>
        );
    } else {
        return (
            <>
                {side.details.what.map((resource, idx) => (
                    <div key={idx} className={`resource ${resource}`}></div>
                ))}
            </>
        );
    }
}

const Card = ({card, state}) => {
    return (
        <div className="card">
            <div className="compensation">
                {card.compensation.type === "production" ? (
                    card.compensation.details.what.map((resource, idx) => (
                        <div key={idx} className={`resource ${resource}`}></div>
                    ))
                ) : (
                    <>
                        {card.compensation.details.from.map((resource, idx) => (
                            <div key={idx} className={`resource ${resource}`}></div>
                        ))}
                        <span className="arrow">→</span>
                        {card.compensation.details.to.map((resource, idx) => (
                            <div key={idx} className={`resource ${resource}`}></div>
                        ))}
                    </>
                )}
            </div>
            <div className="image-placeholder">
                <p>Здесь может быть картинка производственного здания</p>
            </div>
            <div className="production">
                <div className={"production-row"}>
                    {renderProductionRow(card.firstSide)}
                </div>
                <div className={`production-row ${state ? '' : 'transparent'}`}>
                    {renderProductionRow(card.secondSide)}
                </div>
            </div>
        </div>
    );
}

const CardsGrid = ({cards, states}) => {
    return (
        <div className="cards-container">
            {cards.map((card, idx) => (
                <Card key={idx} card={card} state={states[idx]}/>
            ))}
        </div>
    );
};

export { CardsGrid };