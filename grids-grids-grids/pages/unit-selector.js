import PricingGroups from '../data/pricing-groups.json';
import FeatureList from '../components/feature-list';
import UnitList from '../components/unit-list'
import GridImage from '../components/grid-image';
import GridSVG from '../components/grid-svg';
import PlottedGrid from '../components/plotted-grid';
let formatCurrency = value => value.toLocaleString('us-US', { style: 'currency', currency: 'USD' });

function UnitSelector() {

    console.log(PricingGroups[0].size.split('x'))

    return (
        <div className="w-full bg-[#FAFAFA]">
            <div className='gap-3 flex flex-col p-3 w-[600px]'>
                {
                    PricingGroups.map(PG =>
                        PG.availableSpaceCount > 0 &&
                        <div key={PG.id} className='bg-white shadow-sm border rounded flex h-40'>
                            <div className='w-1/2 flex flex-col justify-between'>
                                <div className="flex h-full relative">
                                    {/* <GridImage /> */}
                                    <div className="flex w-1/3 h-full overflow-hidden items-center">
                                        <PlottedGrid
                                            Unit={5}
                                            WidthFt={PG.size.split('x')[0]}
                                            HeightFt={PG.size.split('x')[1]}
                                            Scale={0.7}
                                        />
                                    </div>
                                    <div className='px-3 pt-2 w-full'>
                                        <p className='text-neutral-700' key={PG.id}>{PG.size} {PG.name}</p>
                                        <FeatureList list={PG.featureIds}></FeatureList>
                                    </div>
                                </div>
                                <div className="flex items-center pt-1 pb-2 px-2 justify-between border-t border-neutral-300 border-dashed">
                                    <p className='text-sm text-neutral-500'>{PG.availableSpaceCount} left</p>
                                    <p className='font-medium text-neutral-700'>{formatCurrency(PG.price / 100)}</p>
                                </div>
                            </div>
                            <div className="bg-neutral-50 w-1/2 border-l border-neutral-200 p-2 flex flex-col justify-between rounded-r">
                                <div>
                                    <p className='text-sm text-neutral-400 pb-2'>Units</p>
                                    <UnitList list={PG.spaceIds} />
                                </div>
                                <div className='flex gap-3 text-neutral-500'>
                                    <p className='text-sm'>3 discounts</p>
                                    <p className='text-sm'>0 reservations</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
}

export default UnitSelector;