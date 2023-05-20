import { Link } from "./Link";
import { IMessageSigner } from "./IMessageSigner";

export class LinkFactory {
    constructor(readonly signer: IMessageSigner) {}

    /**
     * Creates the first Link from some arbitrary 32-byte (64 hex) seed.
     * @param seed
     * @param startSats
     * @returns
     */
    public async createFromSeed(seed: string, startSats: number): Promise<Link> {
        const seedSignature = await this.signer.sign(seed);
        return new Link(seed, seedSignature, startSats);
    }

    /**
     * Creates a new link from a settled link. This method will construct
     * a new link by
     *
     * 1. Signing the preimage of the settled invoice of the settled link
     * 2. Setting the minSats to +1 over the settled invoice value
     * 3. Constructing the Link object
     * @param settled
     * @returns
     */
    public async createFromSettled(settled: Link): Promise<Link> {
        if (!settled.isSettled){
            throw new Error("Invoice has not settled");
        }

        const nextLinkIdSignature = await this.signer.sign(settled.nextLinkId);
        return new Link(settled.nextLinkId, nextLinkIdSignature, Number(settled.invoice.valueSat) + 1);
    }
}
