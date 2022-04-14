import React, { useState } from 'react'
// import Connection from './Connection';
import Web3 from 'web3';
import block from './images/block.jpg';


function Connect() {

const [accountAddress, setAccountAddress] = useState("");
const [balance, setBalance] = useState("");

const web3 = new Web3(window.ethereum);
const con = async () => {
  if (window.ethereum) {
    await  window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(result => {
            changeCon(result[0]);
            console.log(result); 
          
          })
          
          
  }

  else{
    alert("Error");
  }

}
const changeCon = (newAccount) => {
    setAccountAddress(newAccount);
 getBalance(newAccount);
  }

  const getBalance= (newAccount)=>{
    web3.eth.getBalance(newAccount, function(err, result) {
      if (err) {
        console.log(err)
      } else {
        setBalance(web3.utils.fromWei(result, "ether") + " ")
      }
    })
  }


 

  return (
    <section className='pt-8'>
      <div className='bg-white flex flex-row lg:flex-row lg:justify-around'>
        <div className=' w-2/5 h-auto'>
          <img src={block} className="" />

        </div>
        <div className='flex flex-col justify-center items-center rounded w-2/5 shadow-2xl '>


          <div className='  '>
            <div>
            <button onClick={con} className='border-double border-4 border-indigo-600 text-indigo-700 w-40'  >Connect</button>
            </div>
            <div>
            <h3 className=" ">{accountAddress}</h3>
            </div>
            <div>
            <h3 className=" ">Available Balance : {balance}</h3>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

export default Connect