import { useEffect, useState } from 'react';

import { statesArray } from '../data/states'

import { Line } from '@ant-design/charts';
import { Select, Checkbox } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const graphConfig = {
    xField: 'Year',
    yField: 'Population',
    height: window.innerHeight * .80,
    point: {
        size: 5,
        shape: 'diamond',
    },
    label: {
        style: {
            fill: '#aaa',
        },
    }
}

export const Datausa = () => {

    const [data, setData] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [limitToRange, setLimitToRange] = useState(false);

    useEffect(() => {
        async function getDatausaData() {
            if (selectedState) {
                const datausaRes = await fetch(`/datausa/${selectedState}`)
                const jsonData = await datausaRes.json()
                setData(jsonData)
            }
        }
        getDatausaData()
    }, [selectedState])

    return (
        <div className="datausa-component">

            <div className="search-column">
                <h1>Choose or search for a US state</h1>

                <Select
                    showSearch
                    style={{ width: '66%', marginBottom: '.5em' }}
                    onChange={setSelectedState}
                    placeholder="Select a state"
                >
                    {/*  populate select options using state array from data/states.js  */}
                    {statesArray.map((state, i) => <Option key={i} value={state}>{state}</Option>)}
                </Select>

                <Checkbox onChange={(event) => setLimitToRange(event.target.checked)} styles={{ color: 'white' }}>
                    Limit to Data Range
                </Checkbox>

            </div>
            {!Array.isArray(data) ? null :
                <div className='graph-column'>
                    <h1>Population of {selectedState} Over 6 Years</h1>

                    <Line {...graphConfig}
                        {
                        ...{
                            data,
                            meta: limitToRange ?
                                {
                                    Population: {
                                        min: 500000,
                                        max: 40000000
                                    }
                                } :
                                {
                                    Population: {
                                        nice: true,
                                        min: data?.[0]?.Population * .90,
                                        max: data?.[0]?.Population * 1.10,
                                    }
                                }
                        }
                        } />
                </div >
            }
        </div>
    )
}