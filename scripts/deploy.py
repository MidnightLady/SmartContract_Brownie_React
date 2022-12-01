from brownie import SolidityStorage, accounts, network
from brownie.network.account import LocalAccount

def main():
    # requires brownie account to have been created
    if network.show_active() == 'development':
        # add these accounts to metamask by importing private key
        accounts.add(private_key="0x3662a22892fc295c76adb33fc89ee7c8e1cdf769d7e059d28d0bed0d659eeaf9")

        owner = accounts[0]
        owner.transfer(accounts[-1], "100 ether")
        owner.transfer("0x663261C1D2d4443f4d0C9F8A1be7A07f133aaB7A", "100 ether")
        SolidityStorage.deploy({'from': owner})

    elif network.show_active() == 'goerli':
        # add these accounts to metamask by importing private key
        owner = accounts.load("goerli")
        SolidityStorage.deploy({'from': owner})




# get transaction : tx = chain.get_transaction
#