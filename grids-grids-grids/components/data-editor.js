import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import sampleData from '../data/sample-merch-data.json';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import { useState, useEffect } from 'react';

function DataEditor({ className, setMerchData }) {
    // const codeString = `sampleData`;
    let [data, setData] = useState(null);

    useEffect(() => {
        setData(sampleData);
        setMerchData(sampleData);
    }, []);

    return (
        <div className={className}>
            <SyntaxHighlighter className="w-100 h-full text-xs" wrapLongLines="true" language="json" style={monokai}>
                {
                    prettier.format(JSON.stringify(data), {
                        parser: "json-stringify", plugins: [parserBabel]
                    })
                }
            </SyntaxHighlighter>
            {/* <textarea
                className="p-2 text-xs font-mono text-white bg-neutral-700 rounded"
                placeholder="Add some data"
                value={JSON.stringify(sampleData)}
                name="data" id="" cols="30" rows="10">
            </textarea> */}
        </div>
    );
}

export default DataEditor;