// @flow
declare var artifacts: Artifacts;

let TrustlessEscrow = artifacts.require("TrustlessEscrow");

contract('TrustlessEscrow', function(accounts: string[]): void {
    it("should do something", function() {
        let myvar: string = "foo";
    });
});
