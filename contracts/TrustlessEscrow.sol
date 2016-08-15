contract Mortal {
    address creator;

    function Mortal() {
        creator = msg.sender;
    }

    function destroy() {
        if (msg.sender == creator) {
            selfdestruct(creator);
        }
    }
}

contract TrustlessEscrow is Mortal {
    uint public value;
    address public seller;
    address public buyer;
    bool public buyerConfirmedContract;
    bool public sellerConfirmedContract;

    function TrustlessEscrow(){}

    function createContract(address _buyer, address _seller, uint _value) {
        seller = _seller;
        buyer = _buyer;
        value = _value;
        buyerConfirmedContract = false;
        sellerConfirmedContract = false;
    }

    function buyerConfirmsContract()
        onlyBuyer
        require(msg.value == 2*value)
    {
        buyerConfirmedContract = true;
    }

    function sellerConfirmsContract()
        onlySeller
        require(msg.value == value)
    {
        sellerConfirmedContract = true;
    }

    /*function abortContract() {
        if (msg.sender == seller) {
            if (buyerConfirmedContract) {
                buyerConfirmedContract = false;
                if (!buyer.send(value*2)){

                }
            }
            if (sellerConfirmedContract) {
                seller.send(value);
                sellerConfirmedContract = false;
            }
        } else if (msg.sender == buyer) {
            if (sellerConfirmedContract && buyerConfirmedContract) {
                throw;
            }
            else if (buyerConfirmedContract) {
                buyer.send(value*2);
            }
            else if (sellerConfirmedContract) {
                seller.send(value);
            }
        }
    }*/

    function confirmReceived()
        onlyBuyer
        require(buyerConfirmedContract && sellerConfirmedContract)
    {
        buyerConfirmedContract = false;
        sellerConfirmedContract = false;
        var unused = buyer.send(value);
        unused = seller.send(value*2);
    }



    modifier onlyBuyer()
    {
        if (msg.sender != buyer) throw;
        _
    }
    modifier onlySeller()
    {
        if (msg.sender != seller) throw;
        _
    }
    modifier require(bool _condition)
    {
        if (!_condition) throw;
        _
    }
}