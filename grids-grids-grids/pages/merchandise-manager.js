import MerchCard from "../components/merch-card";
import DataEditor from "../components/data-editor";
import { useState } from "react";

let emptyProductList = [
    {
        "item": "Dish box cell kit ",
        "description": "",
        "category": "Boxes",
        "price": 13.99
    },
]

function MerchandiseManager() {
    let [merchData, setMerchData] = useState(emptyProductList);

    return (
        <div className="bg-neutral-50 p-10">
            <h3 className="text-xl font-semibold pb-4">Merchandise</h3>
            <div className="flex flex-wrap gap-4">
                {merchData.map((m, i) =>
                    <MerchCard key={i} merchandise={m} />
                )}
            </div>
            <DataEditor
                className="absolute top-0 right-0 h-[95%] bg-neutral-800 m-4 p-1 rounded-md shadow hidden"
                setMerchData={setMerchData}>
            </DataEditor>
        </div>
    );
}

export default MerchandiseManager;