import Card from "./Card";

function Cards({cards}){
    return(
        <div className="bg-richblack-800 pt-10">
            <div className=" w-4/5 flex flex-wrap justify-center mx-auto gap-2">
                {
                    cards.map((card) => (
                        <Card key={card.id} card={card}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Cards;