import MerchImage from "./merch-image";

let formatCurrency = value => value.toLocaleString('us-US', { style: 'currency', currency: 'USD' });


function MerchCard({ merchandise }) {

    let details = Object.keys(merchandise).filter(k => k != 'item' && k != 'description');

    return (
        <div className="w-60 bg-white rounded border-neutral-100 border">
            <div className="p-2 flex gap-4">
                <MerchImage image={merchandise.image}/>
                <div className="flex flex-col justify-center">
                    <p className="text-neutral-700">{merchandise.item}</p>
                    <p className="text-sm text-neutral-500">{merchandise.description}</p>
                </div>
            </div>
            <div className="my-1 border-b border-neutral-200 border-dashed"></div>

            <div className="p-2">
                {
                    details.map((key, i) =>
                        <div key={i} className="flex justify-between p-1">
                            <p className="text-neutral-400 text-sm first-letter:uppercase">{key}</p>
                            <p className="text-neutral-700 text-sm">{
                                (key == "price") ? formatCurrency(merchandise[key]) : merchandise[key]
                            }</p>
                        </div>
                    )
                }

            </div>
            <div className="p-2">
                <button className="text-center bg-neutral-100 w-full py-1 px-2 rounded-sm text-sm leading-relaxed">
                    Add to bag
                </button>
            </div>
        </div>
    );
}

export default MerchCard;