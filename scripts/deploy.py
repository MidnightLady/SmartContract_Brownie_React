from brownie import SolidityStorage, C, SimpleStorage, accounts, network


def main():
    # requires brownie account to have been created
    if network.show_active() == 'development':
        # add these accounts to metamask by importing private key
        accounts.add(private_key="0x3662a22892fc295c76adb33fc89ee7c8e1cdf769d7e059d28d0bed0d659eeaf9")

        owner = accounts[1]
        owner.transfer(accounts[-1], "10 ether")
        owner.transfer("0x663261C1D2d4443f4d0C9F8A1be7A07f133aaB7A", "100 ether")
        # C.deploy({'from': accounts[0]})
        SolidityStorage.deploy({'from': accounts[0]})
        # SimpleStorage.deploy({'from': accounts[0]})

    if network.show_active() == 'ganache-ui':
        accounts.add(private_key="0x3662a22892fc295c76adb33fc89ee7c8e1cdf769d7e059d28d0bed0d659eeaf9")

        owner = accounts[1]
        owner.transfer(accounts[-1], "10 ether")
        SolidityStorage.deploy({'from': accounts[0]})
        # C.deploy({'from': accounts[0]})
        # SolidityStorage.deploy({'from': accounts[0]})
        # SimpleStorage.deploy({'from': accounts[0]})

    elif network.show_active() == 'goerli':
        # add these accounts to metamask by importing private key
        owner = accounts.load("goerli")
        SolidityStorage.deploy({'from': owner})

# get transaction : tx = chain.get_transaction
#
