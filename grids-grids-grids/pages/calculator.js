import { useEffect, useState } from "react";
import Select from 'react-select'
import { formatCurrency, capitalizeFirstLetter } from '../utils';
import _, { forEach } from 'lodash';


function Calculator({ token, leases }) {


    let [leaseID, setLeaseID] = useState(402)
    let [currentLease, setCurrentLease] = useState(null)
    let [outstanding, setOutstanding] = useState(null)
    let [calculations, setCalculations] = useState(null)

    let defaultValue = { value: leaseID, label: 'A119' };

    let leaseOptions = leases.reduce((acc, cv) => {
        acc.push({ value: cv.id, label: cv.space.name })
        return acc;
    }, [])


    useEffect(() => {
        setCurrentLease(leases.find(l => l.id == leaseID));
        async function fetchData() {
            let getOutstanding = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/outstanding?token=${token}&id=${leaseID}`);
            let data = await getOutstanding.json();
            console.log(data)
            setOutstanding(data)
        }
        if (leaseID == null) return;
        fetchData()
    }, [leaseID])

    useEffect(() => {
        if (outstanding == null) return;
        if (outstanding == 0) return;
        let blocks = _.flattenDeep(outstanding.blocks)
        console.log(blocks)
        let display = { items: [], taxItems: [], subtotal: 0, taxes: 0, total: 0 };
        blocks.forEach(b => {
            if (b.category == 'TAX_STATE' || b.category == 'TAX_LOCAL') {
                display.taxItems.push(b);
                display.taxes += b.amount;
            } else {
                display.items.push(b)
                display.subtotal += b.amount;
            }
        })
        display.total = display.subtotal + display.taxes;
        display.items.forEach((item, i) => {
            let test = parseInt(item.explanation.slice(0, 2))
            if (isNaN(test) == false) {
                display.items[i].groupBy = item.explanation
            } else {
                display.items[i].groupBy = "misc"
            }
        })
        display.items = _.groupBy(display.items, 'groupBy')
        display.misc = display.items.misc;
        delete display.items.misc;
        console.log(display)
        setCalculations(display);
    }, [outstanding])

    // useEffect(() => {
    //     async function fetchData() {
    //         let getLeaseData = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/leases?token=${token}&id=${leaseID}`);
    //         let data = await getLeaseData.json();
    //         setLeaseData(data)
    //     }

    //     if (leaseID == null) return;
    //     fetchData();

    // }, [leaseID])

    return (
        <div className="container mx-auto my-8 gap-8 flex">
            <div className="w-1/4 flex flex-col gap-4 bg-neutral-50 p-3 rounded">
                <div className="flex flex-col">
                    <label className="text-sm text-neutral-500 mb-1">Lease</label>
                    <Select className="w-2/3"
                        options={leaseOptions}
                        placeholder="Select a lease"
                        defaultValue={defaultValue}
                        onChange={(e) => setLeaseID(e.value)}
                        id="long-value-select" instanceId="long-value-select" />
                </div>

                {currentLease != null &&
                    <>
                        <div>
                            <p className="text-sm text-neutral-400">Tenant</p>
                            <p className="text-base text-neutral-700">{currentLease.tenantName}</p>
                        </div>

                        <div>
                            <p className="text-sm text-neutral-400">Pre-tax rate</p>
                            <p className="text-base text-neutral-700">{formatCurrency(currentLease.rentAmt / 100)}</p>
                        </div>

                        <div>
                            <p className="text-sm text-neutral-400">Oustanding balance</p>
                            <p className="text-base text-neutral-700">{formatCurrency(currentLease.balance / 100)}</p>
                        </div>

                        <div>
                            <p className="text-sm text-neutral-400">Prepaid balance</p>
                            <p className="text-base text-neutral-700">{formatCurrency(currentLease.prepaidBalance / 100)}</p>
                        </div>
                    </>
                }
            </div>

            {outstanding != null &&
                <div className="w-[350px] p-3">
                    <div className="flex justify-between">
                        <p className="text-md font-medium text-neutral-600">Outstanding balance</p>
                        <p className="text-md font-medium text-neutral-600">USD {formatCurrency(outstanding.total / 100)}</p>
                    </div>
                    {outstanding.total != 0 && <span className="text-xs text-blue-600 font-normal">Show breakdown</span>}
                    {calculations != null &&
                        <div className="flex flex-col gap-3 mt-2">
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
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export async function getServerSideProps() {

    const getToken = await fetch('https://master.api-cubbystorag-review.cubby.coherencesites.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"username":"site.manager","password":"cubby*!$"}'
    })

    const tokenRes = await getToken.json();
    const token = tokenRes.token.token;

    const getLeases = await fetch(`https://master.api-cubbystorag-review.cubby.coherencesites.com/facilities/171/leases`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const leases = await getLeases.json();

    // const getLeaseData = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/leases?token=${token}&id=${leaseID}`);
    // const SSRLeaseData = await getLeaseData.json();

    return { props: { token, leases } }
}

export default Calculator;