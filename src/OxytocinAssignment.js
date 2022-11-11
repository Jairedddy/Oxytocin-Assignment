import React, {useState} from 'react'
import {ethers} from 'ethers'
import OxytocinAssignment_abi from './OxytocinAssignment_abi.json'
import './App.css'

const OxytocinAssignment = () => {
	
	let contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [tokenURIval, setTokenURIVal] = useState(null);

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
                console.log(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		window.location.reload();
	}
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, OxytocinAssignment_abi, tempSigner);
		setContract(tempContract);	
	}

	const setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
		contract.set(event.target.setText.value);
	}

	const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}

	const ownerMintHandler = (event) => {
		event.preventDefault();
		contract.ownerMint(event.target.ownerMintText.value);
	}
	const whiteListUnoMintHandler = (event) => {
		event.preventDefault();
		contract.whiteListMint(event.target.ownerMintText.value);
	}
	const whiteListDosMintHandler = (event) => {
		event.preventDefault();
		contract.whiteListDosMint(event.target.ownerMintText.value);
	}
	const publicMintHandler = (event) => {
		event.preventDefault();
		contract.publicMInt(event.target.publicMIntText.value);
	}
	const withdrawFundsHandler = (event) => {
		event.preventDefault();
		contract.withdrawFunds();
	}
	const setBaseURIHandler = (event) => {
		event.preventDefault();
		contract.setbaseURI(event.target.setBaseURIText.value);
	}
	const changeOwnerMintHandler = (event) => {
		event.preventDefault();
		contract.changeownerMint(event.target.changeOwnerMintText.value);
	}
	const addToWhiteListUnoHandler = (event) => {
		event.preventDefault();
		contract.addToWhiteUnoList(event.target.addToWhiteListUnoText.value);
	}
	const addToWhiteListDosHandler = (event) => {
		event.preventDefault();
		contract.addToWhiteDosList(event.target.addToWhiteListDosText.value);
	}
	const blackListUnoHandler = (event) => {
		event.preventDefault();
		contract.blackListUno(event.target.blackListUnoText.value);
	}
	const blackListDosHandler = (event) => {
		event.preventDefault();
		contract.blackListDos(event.target.blackListDosText.value);
	}
	const setWhiteListUnoStartTimeHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListUnoStartTime(event.target.setWhiteListUnoStartTimeText.value);
	}
	const setWhiteListDosStartTimeHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListDosStartTime(event.target.setWhiteListDosStartTimeText.value);
	}
	const setWhiteListUnoEndTimeHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListUnoEndTime(event.target.setWhiteListUnoEndTimeText.value);
	}
	const setWhiteListDosEndTimeHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListDosEndTime(event.target.setWhiteListDosEndTimeText.value);
	}
	const setWhiteListUnoCapHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListUnoCap(event.target.setWhiteListUnoCapText.value);
	}
	const setWhiteListUnoIndividualCapHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListUnoIndividualCap(event.target.setWhiteListUnoIndividualCapText.value);
	}
	const setWhiteListDosCapHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListDosCap(event.target.setWhiteListDosCapText.value);
	}
	const setWhiteListDosIndividualCapHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListDosIndividualCap(event.target.setWhiteListDosIndividualCapText.value);
	}
	const setWhiteListUnoMintPriceHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListUnoMintPrice(event.target.setWhiteListUnoMintPriceText.value);
	}
	const setWhiteListDosMintPriceHandler = (event) => {
		event.preventDefault();
		contract.setWhiteListDosMintPrice(event.target.setWhiteListDosMintPriceText.value);
	}
	const setPublicMintPriceHandler = (event) => {
		event.preventDefault();
		contract.setPublicMintPrice(event.target.setPublicMintPriceText.value);
	}
	const tokenURIVal = async () => {
		let tokenURIVAL = await contract.tokenURI();
		setTokenURIVal(tokenURIVAL);
	}
	
	return (
		<div className='MainDiv'>
			<div className='Image'><img src= "C:\Users\jaish\OneDrive\Desktop\ACADEMICS\WEBDEV PRACTICE\SimpleStore\simplestore\src\oxytocin_logo.jpg" alt=''></img></div>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div>
				<div className='SubDiv'><h3 className='Address'>Address: {defaultAccount}</h3></div>
			<form className='MainForm'>
				<table className='MainTable'>
					<tr>
					<td><input id="ownerMIntText" type="text"/></td>
					<td><button onClick={ownerMintHandler}> ownerMint Function </button></td>
					</tr>
					<tr>
					<td><input id="whiteListUnoMintText" type="text"/></td>
					<td><button onClick={whiteListUnoMintHandler}> whiteListUnoMint Function </button></td>
					</tr>
					<tr>
					<td><input id="whiteListDosMintText" type="text"/></td>
					<td><button onClick={whiteListDosMintHandler}> whiteListDosMint Function </button></td>					
					</tr>
					<tr>
					<td><input id="publicMintText" type="text"/></td>
					<td><button onClick={publicMintHandler}> publicMint Function </button></td>		
					</tr>
					<tr>
					<td><input id="" type="text"/></td>
					<td><button onClick={withdrawFundsHandler}> withdrawFunds Function </button></td>		
					</tr>
					<tr>
					<td><input id="setBaseURIText" type="text"/></td>
					<td><button onClick={setBaseURIHandler}> setBaseURI Function </button></td>		
					</tr>
					<tr>
					<td><input id="" type="text"/></td>
					<td><button onClick={tokenURIVal}> tokenURI Function :: tokenURI value: {tokenURIval}</button></td>
					</tr>
					<tr>
					<td><input id="changeOwnerMintText" type="text"/></td>
					<td><button onClick={changeOwnerMintHandler}> changeOwnerMint Function </button></td>		
					</tr>
					<tr>
					<td><input id="addToWhiteListUnoText" type="text"/></td>
					<td><button onClick={addToWhiteListUnoHandler}> addToWhiteUnoList Function </button></td>		
					</tr>
					<tr>
					<td><input id="addToWhiteListDosText" type="text"/></td>
					<td><button onClick={addToWhiteListDosHandler}> addToWhiteDosList Function </button></td>		
					</tr>
					<tr>
					<td><input id="blackListUnotext" type="text"/></td>
					<td><button onClick={blackListUnoHandler}> blackListUno Function </button></td>		
					</tr>
					<tr>
					<td><input id="blackListDosText" type="text"/></td>
					<td><button onClick={blackListDosHandler}> blackListDos Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListUnoStartTimeText" type="text"/></td>
					<td><button onClick={setWhiteListUnoStartTimeHandler}> setWhiteListUnoStartTime Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListUnoEndTimeText" type="text"/></td>
					<td><button onClick={setWhiteListUnoEndTimeHandler}> setWhiteListUnoEndTime Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListDosStartTimeText" type="text"/></td>
					<td><button onClick={setWhiteListDosStartTimeHandler}> setWhiteListDosStartTime Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListDosEndTimeText" type="text"/></td>
					<td><button onClick={setWhiteListDosEndTimeHandler}> setWhiteListDosEndTime Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListUnoCapText" type="text"/></td>
					<td><button onClick={setWhiteListUnoCapHandler}> setWhiteListUnoCap Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListUnoIndividualCapText" type="text"/></td>
					<td><button onClick={setWhiteListUnoIndividualCapHandler}> setWhiteListUnoIndividualCap Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListUnoMintPriceText" type="text"/></td>
					<td><button onClick={setWhiteListUnoMintPriceHandler}> setWhiteListUnoMintPrice Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListDosCapText" type="text"/></td>
					<td><button onClick={setWhiteListDosCapHandler}> setWhiteListDosCap Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListDosIndividualCapText" type="text"/></td>
					<td><button onClick={setWhiteListDosIndividualCapHandler}> setWhiteListDosIndividualCap Function </button></td>		
					</tr>
					<tr>
					<td><input id="setWhiteListDosMintPriceText" type="text"/></td>
					<td><button onClick={setWhiteListDosMintPriceHandler}> setWhiteListDosMintPrice Function </button></td>		
					</tr>
					<tr>
					<td><input id="setPublicMintPriceText" type="text"/></td>
					<td><button onClick={setPublicMintPriceHandler}> setPublicMintPrice Function </button></td>		
					</tr>
				</table>
			</form>
			</div>

			{errorMessage}
		</div>
	);
}

export default OxytocinAssignment;