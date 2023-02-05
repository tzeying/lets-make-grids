import Features from '../data/features.json';
import _ from 'lodash';

function FeatureList({ list }) {
    let noShowList = [922, 928, 929, 931, 937];
    let features = list.filter(l => noShowList.find(x => x == l) == undefined).sort();
    features.forEach((item, i) => features[i] = Features.find(feature => feature.id == item));
    let categories = _.groupBy(features, "category");

    let displayList = Object.keys(categories)
        .reduce((acc, cv) => {
            let display = []
            categories[cv].forEach(category => { display.push(category.name) });
            acc[cv] = display.join(', ');
            return acc;
        }, {});

    // console.log(displayList)

    return (
        <>
            <ul className='list-disc pl-3 py-1'>
                {displayList.Parking != undefined && <li className='text-xs text-neutral-500 pb-1'>{displayList.Parking}</li>}
                {displayList['Vehicle type'] != undefined && <li className='text-xs text-neutral-500 pb-1'>{displayList['Vehicle type']}</li>}
                {displayList.Parking == undefined && <li className='text-xs text-neutral-500 pb-1'>{displayList.Environment}</li>}
            </ul>
        </>
    );
}

export default FeatureList;