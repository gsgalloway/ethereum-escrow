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
    struct Agreement {
        address buyer;
        address seller;
        uint32 value;
        bool buyerConfirmedAgreement;
        bool sellerConfirmedAgreement;
    }

    struct ParticipantToAgreementsMapping {
        uint32[] agreementIds;
        // uint32 numAgreements;
    }

    uint32 public numAgreements;
    mapping (uint32 => Agreement) public agreements;
    mapping (address => uint32[]) public agreementIdsByParticipant;
    mapping (address => uint32) public numAgreementsPerParticipant;

    function TrustlessEscrow(){}

    /***************************************************************/
    /************ Requires Transactions (Writes to State) **********/
    /***************************************************************/

    function createAgreement(address buyer, address seller, uint32 value)
    {
        var agreement = Agreement(buyer, seller, value, false, false);
        var agreementId = numAgreements;
        agreements[agreementId] = agreement;
        agreementIdsByParticipant[buyer].push(agreementId);
        numAgreementsPerParticipant[buyer]++;
        agreementIdsByParticipant[seller].push(agreementId);
        numAgreementsPerParticipant[seller]++;
        numAgreements++;
    }

    function buyerConfirmsAgreement(uint32 agreementId) payable
        onlyBuyer(agreementId)
        // TODO: index out of bounds
        require(msg.value == 2*agreements[agreementId].value)
    {
        agreements[agreementId].buyerConfirmedAgreement = true;
    }

    function sellerConfirmsAgreement(uint32 agreementId) payable
        onlySeller(agreementId)
        // TODO: index out of bounds
        require(msg.value == agreements[agreementId].value)
    {
        agreements[agreementId].sellerConfirmedAgreement = true;
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

    function confirmReceived(uint32 agreementId)
        onlyBuyer(agreementId)
        require(agreementIsLocked(agreementId))
    {
        var agreement = agreements[agreementId];
        agreement.buyerConfirmedAgreement = false;
        agreement.sellerConfirmedAgreement = false;
        // TODO: still need these unused variables in the latest solidity?
        // TODO: rewrite this -- buyer and seller need to pull from this contract
        // to prevent stack overflow attacks screwing the seller out of money
        var unused = agreement.buyer.send(agreement.value);
        unused = agreement.seller.send(agreement.value*2);
    }

    /************************************************************************/
    /************ Does Not Require Transactions (Reads from State) **********/
    /************************************************************************/

    function agreementIsLocked(uint32 agreementId) constant returns (bool)
    {
        // TODO: array index out of bounds
        return agreements[agreementId].buyerConfirmedAgreement &&
               agreements[agreementId].sellerConfirmedAgreement;
    }


    /************ Helper Methods *************/

    modifier onlyBuyer(uint32 agreementId)
    {
        if (msg.sender != agreements[agreementId].buyer) throw;
        _;
    }
    modifier onlySeller(uint32 agreementId)
    {
        if (msg.sender != agreements[agreementId].seller) throw;
        _;
    }
    modifier require(bool _condition)
    {
        if (!_condition) throw;
        _;
    }
}