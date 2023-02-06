import { createCalculationsFromBlocks, formatCurrency, capitalizeFirstLetter } from "../utils"
import { useEffect, useState } from "react";

const Calculations = ({ AccountingBlob }) => {

    let [calculations, setCalculations] = useState(null);
    let [showBreakdown, setShowBreakdown] = useState(true);

    useEffect(() => {
        if (AccountingBlob == null) return;
        if (AccountingBlob.total == 0) {
            setShowBreakdown(false);
            return;
        } else {
            setShowBreakdown(true);
        }
        let display = createCalculationsFromBlocks(AccountingBlob.blocks);
        setCalculations(display);
    }, [AccountingBlob])

    return (
        <>
            {AccountingBlob != null &&
                <div className="w-[350px] p-3">

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <p className="text-md font-medium text-neutral-600">Outstanding balance</p>
                            {((AccountingBlob.total == 0) || AccountingBlob != 0 && showBreakdown == false) ? 
                                <p className="text-md font-medium text-neutral-600">USD {formatCurrency(AccountingBlob.total / 100)}</p> : <></>
                            }
                            {(AccountingBlob.total != 0 & showBreakdown == true) ?
                                <span className="text-xs text-blue-600 font-normal cursor-pointer" onClick={() => setShowBreakdown(!showBreakdown)}>Hide breakdown</span> : <></>
                            }
                        </div>
                        {(AccountingBlob.total != 0 & showBreakdown == false) ? 
                            <span className="text-xs text-blue-600 font-normal cursor-pointer" onClick={() => setShowBreakdown(!showBreakdown)}>Show breakdown</span> : 
                            <></>
                        }
                    </div>

                    {(showBreakdown == true & calculations != null) ?
                        <div className="flex flex-col gap-3 mt-3">
                            {Object.keys(calculations.items).map((k, key) =>
                                <div className="flex flex-col gap-1" key={key}>
                                    <div className="separator">
                                        <span className="px-3 text-xs text-neutral-400 font-normal">{k}</span>
                                    </div>
                                    {
                                        calculations.items[k].map((item, key) =>
                                            <div className="flex justify-between" key={key}>
                                                <span className="text-sm">{capitalizeFirstLetter(item.category)}</span>
                                                <span className="text-sm">{formatCurrency(item.amount / 100)}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            )}
                            {calculations.misc != undefined &&
                                <div className="border-t flex flex-col gap-2 pt-2">
                                    {calculations.misc.map((item, key) =>
                                        <div className="flex flex-col" key={key}>
                                            {/* <div className="separator"></div> */}
                                            <div className="flex justify-between">
                                                <span className="text-sm">{capitalizeFirstLetter(item.explanation)}</span>
                                                <span className="text-sm">{formatCurrency(item.amount / 100)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                            <div className="border-t flex justify-end">
                                <div className="w-[240px] flex flex-col gap-2 py-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-neutral-400">Subtotal</span>
                                        <span className="text-sm text-neutral-400">{formatCurrency(calculations.subtotal / 100)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-neutral-400">Taxes</span>
                                        <span className="text-sm text-neutral-400">{formatCurrency(calculations.taxes / 100)}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-1">
                                        <span className="text-md font-medium text-neutral-700">Total</span>
                                        <span className="text-md font-medium text-neutral-700">USD {formatCurrency(calculations.total / 100)}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        : <></>
                    }

                </div>
            }
        </>
    )
}

export default Calculations;