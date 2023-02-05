import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import sampleData from '../data/sample-merch-data.json';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import { useState, useEffect } from 'react';

function DataEditorV2({ className, Data = null }) {
    // const codeString = `sampleData`;
    let [contents, setContents] = useState(null);
    let [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (Data == null) {
            setContents(sampleData);
        } else {
            setContents(Data);
        }
    }, [Data]);

    return (
        <>
            {
                isOpen ?
                    <div className="w-80 h-[90%] bg-neutral-800 absolute right-2 top-2 rounded pb-1 ">
                        <button className="text-white text-xs text-end w-full pr-2" onClick={e => setIsOpen(!isOpen)}>Close</button>
                        <SyntaxHighlighter className="w-100 h-full text-xs" wrapLongLines="true" language="json" style={monokai}>
                            {
                                prettier.format(JSON.stringify(contents), {
                                    parser: "json-stringify", plugins: [parserBabel]
                                })
                            }
                        </SyntaxHighlighter>
                    </div>
                    :
                    <div className={className}>
                        <button
                            className="hover:bg-neutral-700/20 text-neutral-400 hover:text-neutral-600 text-xs py-1 px-2 m-2 rounded"
                            onClick={e => setIsOpen(!isOpen)}>
                            Edit data
                        </button>
                    </div>
            }
        </>
        // <div className={className}>
        //     <SyntaxHighlighter className="w-100 h-full text-xs" wrapLongLines="true" language="json" style={monokai}>
        //         {
        //             prettier.format(JSON.stringify(contents), {
        //                 parser: "json-stringify", plugins: [parserBabel]
        //             })
        //         }
        //     </SyntaxHighlighter>
        //     {/* <textarea
        //         className="p-2 text-xs font-mono text-white bg-neutral-700 rounded"
        //         placeholder="Add some data"
        //         value={JSON.stringify(sampleData)}
        //         name="data" id="" cols="30" rows="10">
        //     </textarea> */}
        // </div>
    );
}

export default DataEditorV2;