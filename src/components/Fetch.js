import React from 'react'

import Web3 from 'web3';
import { useState } from 'react'


function Fetch() {
    // const web3 = require('web3');

    const web3 = new Web3("https://rinkeby.infura.io/v3/2e20d9200593418d9c3a18a0b28ab42d");

    const [blockNumber, setBlockNumber] = useState("")
    const [transactions, setTransactions] = useState([])
    // let transact = {};
    let details = [];
    async function getBlockNumber() {


        const blockNumber = await web3.eth.getBlockNumber();
        console.log(blockNumber);
        setBlockNumber(blockNumber);

        let block = await web3.eth.getBlock(blockNumber);
        // return block.transactions;

        for (let hash in block.transactions) {
            var transact = [];
            transact = await web3.eth.getTransaction(block.transactions[hash]);
            details.push(transact);

        }

        console.log(details);
        setTransactions(details);
    }


    // console.log(transactions.forEach());

    // for (var i in block.transactions) {

    //     transact = await web3.eth.getTransaction(block.transactions[i]);

    //  }



    return (
        <section>
            <div className='bg-white flex flex-row lg:flex-row lg:justify-around'>
                <div className='overflow-auto text-left'>
                    {
                        transactions &&
                        transactions.map(tx =>
                        (
                            <>
                                <ul className=' border-b shadow- mb-2 mt-2' key={tx.id}>
                                    <li> ID: {tx.transactionIndex}</li>
                                    <li> To: {tx.to}</li>
                                    <li> from:  {tx.from}</li>
                                    <li> gasPrice :{tx.gasPrice}</li>

                                </ul>



                            </>

                        )

                        )}



                </div>


                <div className='flex flex-col h-screen justify-center items-center '>
                    <div className='mb-2'>
                        <button onClick={getBlockNumber} className=' border-4 border-double border-indigo-600 '>GET BLOCK NUMBER</button>

                        <h1 className="mt-4">{blockNumber}</h1>
                    </div>

                    
                    <div>
                        <button onClick={() => setTransactions(!transactions)} className=' border-4 border-double border-indigo-600 '>Fetch Transactions </button>
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Fetch