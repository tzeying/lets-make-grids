import MerchCard from "../components/merch-card";
import DataEditor from "../components/data-editor";
import { useState } from "react";

let emptyProductList = [
    {
        "item": "Product name",
        "description": "Descriptions",
        "category": "None",
        "price": 0.00
    },
]

function MerchandiseManager() {
    let [merchData, setMerchData] = useState(emptyProductList);
    let [previewMode, setPreviewMode] = useState(false);

    return (
        <div className="bg-neutral-50 p-10">
            <div className="flex gap-4 pb-4">
                <h3 className="text-xl font-semibold">Merchandise</h3>
                <button
                    className="py-1 px-2 bg-neutral-200 text-sm text-medium rounded text-neutral-700"
                    onClick={() => setPreviewMode(!previewMode)}>
                    { !previewMode ? `Preview` : `Previewing`}
                </button>
            </div>
            <div className="flex flex-wrap gap-4">
                {merchData.map((m, i) =>
                    <MerchCard key={i} merchandise={m} previewMode={previewMode} />
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