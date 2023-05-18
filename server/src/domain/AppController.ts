import { CreateInvoiceResult } from "./CreateInvoiceResult";
import { Invoice } from "./Invoice";
import { Link } from "./Link";
import { LinkFactory } from "./LinkFactory";
import { IInvoiceDataMapper } from "./IInvoiceDataMapper";
import { IMessageSigner } from "./IMessageSigner";

export class AppController {
    public chain: Link[];
    public listener: (info: Link[]) => void;

    public get chainTip(): Link {
        return this.chain[this.chain.length - 1];
    }

    constructor(
        readonly invoiceDataMapper: IInvoiceDataMapper,
        readonly signer: IMessageSigner,
        readonly linkFactory: LinkFactory,
    ) {
        this.chain = [];
    }

    /**
     * Starts the application by creating the initial link and
     * synchronizing against the invoice repository
     * @param seed
     * @param startSats
     */
    public async start(seed: string, startSats: number) {
        throw new Error("Exercise! Replace me to pass tests!");
    }

    /**
     * Processes an invoice that the application is notified about by checking if it settles the
     * current chain tip. If it does then move the chain forward.
     * @param invoice
     */
    public async handleInvoice(invoice: Invoice) {
        if (invoice.settles(this.chainTip)) {
            throw new Error("Exercise! Replace me to pass tests!");

            // capture and settle the current chain tip
            let settled;

            // create a new unsettled Link using the LinkFactory
            let nextLink;

            // add the new link to the chain

            // send to
            if (this.listener) {
                this.listener([settled, nextLink]);
            }
        }
    }

    /**
     * Creates an invoice
     * @param remoteSignature
     * @returns
     */
    public async createInvoice(
        remoteSignature: string,
        sats: number,
    ): Promise<CreateInvoiceResult> {
        // verify the invoice provided by the user
        const verification = await this.signer.verify(this.chainTip.linkId, remoteSignature);

        // return failure if signature fails
        if (!verification.valid) {
            return { success: false, error: "Invalid signature" };
        }

        // Use `Invoice.createPreimage` to create the preimage. Hint the
        // the `localSignature` is available on the `chaintip` and the
        // `remoteSignature` and `sats` are arguments to this method.
        throw new Error("Exercise! Replace me to pass tests!");
        let preimage: Buffer;

        // Use `Invoice.createMemo` to create the memo. Hint the `linkId`
        // is available on the `chaintip` and the buyer is the `pubkey`
        // obtained in the signature verification.
        throw new Error("Exercise! Replace me to pass tests!");
        let memo: string;

        // try to create the invoice
        try {
            const paymentRequest = await this.invoiceDataMapper.add(sats, memo, preimage);
            return {
                success: true,
                paymentRequest,
            };
        } catch (ex) {
            return {
                success: false,
                error: ex.message,
            };
        }
    }
}
