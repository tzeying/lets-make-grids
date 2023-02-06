import { useEffect, useState } from "react";
import Select from 'react-select'
import { formatCurrency, capitalizeFirstLetter } from '../utils';
import _, { forEach } from 'lodash';
import Calculations from "../components/calculations";

const createCalculationsFromBlocks = blocks => {
    let _blocks = _.flattenDeep(blocks)
    let display = { items: [], taxItems: [], subtotal: 0, taxes: 0, total: 0 };
    _blocks.forEach(b => {
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
        let test = parseInt(item.explanation.slice(-2))
        if (isNaN(test) == false) {
            display.items[i].groupBy = item.explanation
        } else {
            display.items[i].groupBy = "misc"
        }
    })
    display.items = _.groupBy(display.items, 'groupBy')
    display.misc = display.items.misc;
    delete display.items.misc;
    
    return display;
}

function Calculator({ token, leases }) {


    let [leaseID, setLeaseID] = useState(402)
    let [currentLease, setCurrentLease] = useState(null)
    let [outstanding, setOutstanding] = useState(null)
    // let [calculations, setCalculations] = useState(null)

    let defaultValue = { value: leaseID, label: 'A119' };

    let leaseOptions = leases.reduce((acc, cv) => {
        acc.push({ value: cv.id, label: cv.space.name })
        return acc;
    }, [])

    console.log('vercel url', process.env.NEXT_PUBLIC_VERCEL_URL)

    useEffect(() => {
        setCurrentLease(leases.find(l => l.id == leaseID));
        async function fetchData() {
            let getOutstanding = await fetch(`http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/outstanding?token=${token}&id=${leaseID}`);
            let data = await getOutstanding.json();
            console.log(data)
            setOutstanding(data)
        }
        if (leaseID == null) return;
        fetchData()
    }, [leaseID])

    // useEffect(() => {
    //     if (outstanding == null) return;
    //     if (outstanding == 0) return;
    //     let display = createCalculationsFromBlocks(outstanding.blocks);
    //     setCalculations(display);
    // }, [outstanding])

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

            <Calculations AccountingBlob={outstanding} /> 
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