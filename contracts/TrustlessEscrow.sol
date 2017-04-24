pragma solidity ^0.4.0;

contract SelfDestructable {
    address creator;

    function SelfDestructable() {
        creator = msg.sender;
    }

    function destroy() {
        if (msg.sender == creator) {
            selfdestruct(creator);
        }
    }
}

contract TrustlessEscrow is SelfDestructable {
    uint public value;
    address public seller;
    address public buyer;
    bool public buyerConfirmedAgreement;
    bool public sellerConfirmedAgreement;

    function TrustlessEscrow(){}

    function createAgreement(address _buyer, address _seller, uint _value) {
        seller = _seller;
        buyer = _buyer;
        value = _value;
        buyerConfirmedAgreement = false;
        sellerConfirmedAgreement = false;
    }

    function buyerConfirmsAgreement() payable
        onlyBuyer
        require(msg.value == 2*value)
    {
        buyerConfirmedAgreement = true;
    }

    function sellerConfirmsAgreement() payable
        onlySeller
        require(msg.value == value)
    {
        sellerConfirmedAgreement = true;
    }

    /*function abortAgreement() {
        if (msg.sender == seller) {
            if (buyerConfirmedAgreement) {
                buyerConfirmedAgreement = false;
                if (!buyer.send(value*2)){

                }
            }
            if (sellerConfirmedAgreement) {
                seller.send(value);
                sellerConfirmedAgreement = false;
            }
        } else if (msg.sender == buyer) {
            if (sellerConfirmedAgreement && buyerConfirmedAgreement) {
                throw;
            }
            else if (buyerConfirmedAgreement) {
                buyer.send(value*2);
            }
            else if (sellerConfirmedAgreement) {
                seller.send(value);
            }
        }
    }*/

    function confirmReceived()
        onlyBuyer
        require(buyerConfirmedAgreement && sellerConfirmedAgreement)
    {
        buyerConfirmedAgreement = false;
        sellerConfirmedAgreement = false;
        var unused = buyer.send(value);
        unused = seller.send(value*2);
    }



    modifier onlyBuyer()
    {
        if (msg.sender != buyer) throw;
        _;
    }
    modifier onlySeller()
    {
        if (msg.sender != seller) throw;
        _;
    }
    modifier require(bool _condition)
    {
        if (!_condition) throw;
        _;
    }
}