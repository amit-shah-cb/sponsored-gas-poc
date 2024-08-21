export const ZeroExAbi =[
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "quoteSigner",
                "type": "address"
            }
        ],
        "name": "QuoteSignerUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "taker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "inputToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "outputToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "inputTokenAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "outputTokenAmount",
                "type": "uint256"
            }
        ],
        "name": "TransformedERC20",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "transformerDeployer",
                "type": "address"
            }
        ],
        "name": "TransformerDeployerUpdated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "FEATURE_NAME",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "FEATURE_VERSION",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address payable",
                        "name": "taker",
                        "type": "address"
                    },
                    {
                        "internalType": "contract IERC20Token",
                        "name": "inputToken",
                        "type": "address"
                    },
                    {
                        "internalType": "contract IERC20Token",
                        "name": "outputToken",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "inputTokenAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minOutputTokenAmount",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint32",
                                "name": "deploymentNonce",
                                "type": "uint32"
                            },
                            {
                                "internalType": "bytes",
                                "name": "data",
                                "type": "bytes"
                            }
                        ],
                        "internalType": "struct ITransformERC20Feature.Transformation[]",
                        "name": "transformations",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "bool",
                        "name": "useSelfBalance",
                        "type": "bool"
                    },
                    {
                        "internalType": "address payable",
                        "name": "recipient",
                        "type": "address"
                    }
                ],
                "internalType": "struct ITransformERC20Feature.TransformERC20Args",
                "name": "args",
                "type": "tuple"
            }
        ],
        "name": "_transformERC20",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "outputTokenAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "createTransformWallet",
        "outputs": [
            {
                "internalType": "contract IFlashWallet",
                "name": "wallet",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getQuoteSigner",
        "outputs": [
            {
                "internalType": "address",
                "name": "signer",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTransformWallet",
        "outputs": [
            {
                "internalType": "contract IFlashWallet",
                "name": "wallet",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTransformerDeployer",
        "outputs": [
            {
                "internalType": "address",
                "name": "deployer",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "transformerDeployer",
                "type": "address"
            }
        ],
        "name": "migrate",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "success",
                "type": "bytes4"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "quoteSigner",
                "type": "address"
            }
        ],
        "name": "setQuoteSigner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "transformerDeployer",
                "type": "address"
            }
        ],
        "name": "setTransformerDeployer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20Token",
                "name": "inputToken",
                "type": "address"
            },
            {
                "internalType": "contract IERC20Token",
                "name": "outputToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "inputTokenAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minOutputTokenAmount",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint32",
                        "name": "deploymentNonce",
                        "type": "uint32"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct ITransformERC20Feature.Transformation[]",
                "name": "transformations",
                "type": "tuple[]"
            }
        ],
        "name": "transformERC20",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "outputTokenAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
] as const